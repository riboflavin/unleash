/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { ApplicationOverviewIssuesSchemaType } from './applicationOverviewIssuesSchemaType';

/**
 * This list of issues that might be wrong with the application
 */
export interface ApplicationOverviewIssuesSchema {
    /** The list of issues that might be wrong with the application */
    items: string[];
    /** The name of this action. */
    type: ApplicationOverviewIssuesSchemaType;
}
