import Addon from './addon';

import definition from './datadog-definition';
import Mustache from 'mustache';
import { type IAddonConfig, serializeDates } from '../types';
import {
    type FeatureEventFormatter,
    FeatureEventFormatterMd,
    LinkStyle,
} from './feature-event-formatter-md';
import type { IEvent } from '../types/events';
import type { IntegrationEventState } from '../features/integration-events/integration-events-store';

interface IDatadogParameters {
    url: string;
    apiKey: string;
    sourceTypeName?: string;
    customHeaders?: string;
    bodyTemplate?: string;
    jsonTemplate?: string;
}

interface DDRequestBody {
    text: string;
    title: string;
    tags?: string[];
    source_type_name?: string;
}

export default class DatadogAddon extends Addon {
    private msgFormatter: FeatureEventFormatter;

    constructor(config: IAddonConfig) {
        super(definition, config);
        this.msgFormatter = new FeatureEventFormatterMd(
            config.unleashUrl,
            LinkStyle.MD,
        );
    }

    async handleEvent(
        event: IEvent,
        parameters: IDatadogParameters,
        integrationId: number,
    ): Promise<void> {
        let state: IntegrationEventState = 'success';
        const stateDetails: string[] = [];

        const {
            url = 'https://api.datadoghq.com/api/v1/events',
            apiKey,
            sourceTypeName,
            customHeaders,
            bodyTemplate,
        } = parameters;

        const context = {
            event,
            eventMarkdown: this.msgFormatter.format(event).text,
            tagsJson: event.tags?.map((tag) => `${tag.type}:${tag.value}`),
        };

        let body: DDRequestBody;
        if (typeof bodyTemplate === 'string' && bodyTemplate.length > 1) {
            if (parameters.jsonTemplate) {
                body = Mustache.render(bodyTemplate, context);
            } else {
                body = {
                    text: Mustache.render(bodyTemplate, context),
                    title: 'Unleash notification update',
                    tags: context.tagsJson,
                };
            }
        } else {
            body = {
                text: `%%% \n ${context.eventMarkdown} \n %%% `,
                title: 'Unleash notification update',
                tags: context.tagsJson,
            };
        }

        if (sourceTypeName) {
            body.source_type_name = sourceTypeName;
        }
        let extraHeaders = {};
        if (typeof customHeaders === 'string' && customHeaders.length > 1) {
            try {
                extraHeaders = JSON.parse(customHeaders);
            } catch (e) {
                state = 'successWithErrors';
                const badHeadersMessage =
                    'Could not parse the JSON in the customHeaders parameter.';
                stateDetails.push(badHeadersMessage);
                this.logger.warn(badHeadersMessage);
            }
        }
        const requestOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'DD-API-KEY': apiKey,
                ...extraHeaders,
            },
            body: JSON.stringify(body),
        };
        const res = await this.fetchRetry(url, requestOpts);

        this.logger.info(`Handled event "${event.type}".`);

        if (res.ok) {
            const successMessage = `Datadog Events API request was successful with status code: ${res.status}.`;
            stateDetails.push(successMessage);
            this.logger.info(successMessage);
        } else {
            state = 'failed';
            const failedMessage = `Datadog Events API request failed with status code: ${res.status}.`;
            stateDetails.push(failedMessage);
            this.logger.warn(failedMessage);
        }

        this.registerEvent({
            integrationId,
            state,
            stateDetails: stateDetails.join('\n'),
            event: serializeDates(event),
            details: {
                url,
                body,
            },
        });
    }
}
