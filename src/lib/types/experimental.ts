import { PayloadType, type Variant } from 'unleash-client';
import { parseEnvVarBoolean } from '../util';
import { getDefaultVariant } from 'unleash-client/lib/variant';

export type IFlagKey =
    | 'accessLogs'
    | 'anonymiseEventLog'
    | 'encryptEmails'
    | 'enableLicense'
    | 'enableLicenseChecker'
    | 'embedProxy'
    | 'embedProxyFrontend'
    | 'responseTimeWithAppNameKillSwitch'
    | 'maintenanceMode'
    | 'messageBanner'
    | 'featuresExportImport'
    | 'caseInsensitiveInOperators'
    | 'strictSchemaValidation'
    | 'personalAccessTokensKillSwitch'
    | 'migrationLock'
    | 'demo'
    | 'googleAuthEnabled'
    | 'disableBulkToggle'
    | 'disableNotifications'
    | 'advancedPlayground'
    | 'filterInvalidClientMetrics'
    | 'disableMetrics'
    | 'stripHeadersOnAPI'
    | 'signals'
    | 'automatedActions'
    | 'celebrateUnleash'
    | 'featureSearchFeedback'
    | 'featureSearchFeedbackPosting'
    | 'edgeBulkMetrics'
    | 'extendedUsageMetrics'
    | 'adminTokenKillSwitch'
    | 'killInsightsUI'
    | 'feedbackComments'
    | 'showInactiveUsers'
    | 'killScheduledChangeRequestCache'
    | 'collectTrafficDataUsage'
    | 'displayTrafficDataUsage'
    | 'estimateTrafficDataCost'
    | 'useMemoizedActiveTokens'
    | 'queryMissingTokens'
    | 'checkEdgeValidTokensFromCache'
    | 'userAccessUIEnabled'
    | 'disableUpdateMaxRevisionId'
    | 'disablePublishUnannouncedEvents'
    | 'outdatedSdksBanner'
    | 'responseTimeMetricsFix'
    | 'displayEdgeBanner'
    | 'disableShowContextFieldSelectionValues'
    | 'projectOverviewRefactorFeedback'
    | 'featureLifecycle'
    | 'featureLifecycleMetrics'
    | 'parseProjectFromSession'
    | 'manyStrategiesPagination'
    | 'enableLegacyVariants'
    | 'navigationSidebar'
    | 'commandBarUI'
    | 'flagCreator'
    | 'anonymizeProjectOwners'
    | 'resourceLimits'
    | 'extendedMetrics'
    | 'removeUnsafeInlineStyleSrc'
    | 'insightsV2'
    | 'integrationEvents'
    | 'featureCollaborators'
    | 'improveCreateFlagFlow'
    | 'originMiddleware'
    | 'newEventSearch'
    | 'changeRequestPlayground'
    | 'archiveProjects';

export type IFlags = Partial<{ [key in IFlagKey]: boolean | Variant }>;

const flags: IFlags = {
    anonymiseEventLog: false,
    enableLicense: false,
    enableLicenseChecker: false,
    embedProxy: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_EMBED_PROXY,
        true,
    ),
    embedProxyFrontend: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_EMBED_PROXY_FRONTEND,
        true,
    ),
    responseTimeWithAppNameKillSwitch: parseEnvVarBoolean(
        process.env.UNLEASH_RESPONSE_TIME_WITH_APP_NAME_KILL_SWITCH,
        false,
    ),
    maintenanceMode: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_MAINTENANCE_MODE,
        false,
    ),
    messageBanner: {
        name: 'message-banner',
        enabled: parseEnvVarBoolean(
            process.env.UNLEASH_EXPERIMENTAL_MESSAGE_BANNER,
            false,
        ),
        payload: {
            type: PayloadType.JSON,
            value:
                process.env.UNLEASH_EXPERIMENTAL_MESSAGE_BANNER_PAYLOAD ?? '',
        },
    },
    featuresExportImport: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_FEATURES_EXPORT_IMPORT,
        true,
    ),
    caseInsensitiveInOperators: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_CASE_INSENSITIVE_IN_OPERATORS,
        false,
    ),
    strictSchemaValidation: parseEnvVarBoolean(
        process.env.UNLEASH_STRICT_SCHEMA_VALIDTION,
        false,
    ),
    personalAccessTokensKillSwitch: parseEnvVarBoolean(
        process.env.UNLEASH_PAT_KILL_SWITCH,
        false,
    ),
    migrationLock: parseEnvVarBoolean(process.env.MIGRATION_LOCK, true),
    demo: parseEnvVarBoolean(process.env.UNLEASH_DEMO, false),
    googleAuthEnabled: parseEnvVarBoolean(
        process.env.GOOGLE_AUTH_ENABLED,
        false,
    ),
    disableBulkToggle: parseEnvVarBoolean(
        process.env.DISABLE_BULK_TOGGLE,
        false,
    ),
    disableNotifications: parseEnvVarBoolean(
        process.env.DISABLE_NOTIFICATIONS,
        false,
    ),
    filterInvalidClientMetrics: parseEnvVarBoolean(
        process.env.FILTER_INVALID_CLIENT_METRICS,
        false,
    ),
    disableMetrics: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_DISABLE_METRICS,
        false,
    ),
    signals: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_SIGNALS,
        false,
    ),
    automatedActions: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_AUTOMATED_ACTIONS,
        false,
    ),
    celebrateUnleash: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_CELEBRATE_UNLEASH,
        false,
    ),
    featureSearchFeedback: {
        name: 'withText',
        enabled: parseEnvVarBoolean(
            process.env.UNLEASH_EXPERIMENTAL_FEATURE_SEARCH_FEEDBACK,
            false,
        ),
        payload: {
            type: PayloadType.JSON,
            value:
                process.env
                    .UNLEASH_EXPERIMENTAL_FEATURE_SEARCH_FEEDBACK_PAYLOAD ?? '',
        },
    },
    featureSearchFeedbackPosting: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_FEATURE_SEARCH_FEEDBACK_POSTING,
        false,
    ),
    encryptEmails: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_ENCRYPT_EMAILS,
        false,
    ),
    edgeBulkMetrics: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_EDGE_BULK_METRICS,
        false,
    ),
    extendedUsageMetrics: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_EXTENDED_USAGE_METRICS,
        false,
    ),
    adminTokenKillSwitch: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_ADMIN_TOKEN_KILL_SWITCH,
        false,
    ),
    killInsightsUI: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_KILL_INSIGHTS_UI,
        false,
    ),
    outdatedSdksBanner: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_OUTDATED_SDKS_BANNER,
        false,
    ),
    feedbackComments: {
        name: 'feedbackComments',
        enabled: parseEnvVarBoolean(
            process.env.UNLEASH_EXPERIMENTAL_FEEDBACK_COMMENTS,
            false,
        ),
        payload: {
            type: PayloadType.JSON,
            value:
                process.env.UNLEASH_EXPERIMENTAL_FEEDBACK_COMMENTS_PAYLOAD ??
                '',
        },
    },
    showInactiveUsers: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_SHOW_INACTIVE_USERS,
        false,
    ),
    useMemoizedActiveTokens: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_MEMOIZED_ACTIVE_TOKENS,
        false,
    ),
    killScheduledChangeRequestCache: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_KILL_SCHEDULED_CHANGE_REQUEST_CACHE,
        false,
    ),
    collectTrafficDataUsage: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_COLLECT_TRAFFIC_DATA_USAGE,
        false,
    ),
    displayTrafficDataUsage: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_DISPLAY_TRAFFIC_DATA_USAGE,
        false,
    ),
    estimateTrafficDataCost: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_ESTIMATE_TRAFFIC_DATA_COST,
        false,
    ),
    userAccessUIEnabled: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_USER_ACCESS_UI_ENABLED,
        false,
    ),
    disableUpdateMaxRevisionId: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_DISABLE_SCHEDULED_CACHES,
        false,
    ),
    disablePublishUnannouncedEvents: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_DISABLE_SCHEDULED_CACHES,
        false,
    ),
    queryMissingTokens: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_QUERY_MISSING_TOKENS,
        false,
    ),
    displayEdgeBanner: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_DISPLAY_EDGE_BANNER,
        false,
    ),
    responseTimeMetricsFix: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_RESPONSE_TIME_METRICS_FIX,
        false,
    ),
    disableShowContextFieldSelectionValues: parseEnvVarBoolean(
        process.env
            .UNLEASH_EXPERIMENTAL_DISABLE_SHOW_CONTEXT_FIELD_SELECTION_VALUES,
        false,
    ),
    projectOverviewRefactorFeedback: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_PROJECT_OVERVIEW_REFACTOR_FEEDBACK,
        false,
    ),
    featureLifecycle: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_FEATURE_LIFECYCLE,
        false,
    ),
    parseProjectFromSession: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_PARSE_PROJECT_FROM_SESSION,
        false,
    ),
    manyStrategiesPagination: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_MANY_STRATEGIES_PAGINATION,
        false,
    ),
    enableLegacyVariants: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_ENABLE_LEGACY_VARIANTS,
        false,
    ),
    navigationSidebar: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_SIDEBAR_NAVIGATION,
        true,
    ),
    commandBarUI: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_COMMAND_BAR_UI,
        false,
    ),
    flagCreator: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_FLAG_CREATOR,
        false,
    ),
    anonymizeProjectOwners: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_ANONYMIZE_PROJECT_OWNERS,
        false,
    ),
    resourceLimits: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_RESOURCE_LIMITS,
        false,
    ),
    extendedMetrics: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_EXTENDED_METRICS,
        false,
    ),
    removeUnsafeInlineStyleSrc: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_REMOVE_UNSAFE_INLINE_STYLE_SRC,
        false,
    ),
    insightsV2: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_INSIGHTS_V2,
        false,
    ),
    integrationEvents: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_INTEGRATION_EVENTS,
        false,
    ),
    featureCollaborators: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_FEATURE_COLLABORATORS,
        false,
    ),
    improveCreateFlagFlow: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_IMPROVE_CREATE_FLAG_FLOW,
        false,
    ),
    originMiddleware: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_ORIGIN_MIDDLEWARE,
        false,
    ),
    newEventSearch: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_NEW_EVENT_SEARCH,
        false,
    ),
    changeRequestPlayground: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_CHANGE_REQUEST_PLAYGROUND,
        false,
    ),
    archiveProjects: parseEnvVarBoolean(
        process.env.UNLEASH_EXPERIMENTAL_ARCHIVE_PROJECTS,
        false,
    ),
};

export const defaultExperimentalOptions: IExperimentalOptions = {
    flags,
    externalResolver: {
        isEnabled: (): boolean => false,
        getVariant: () => getDefaultVariant(),
    },
};

export interface IExperimentalOptions {
    flags: IFlags;
    externalResolver: IExternalFlagResolver;
}

export interface IFlagContext {
    [key: string]: string;
}

export interface IFlagResolver {
    getAll: (context?: IFlagContext) => IFlags;
    isEnabled: (expName: IFlagKey, context?: IFlagContext) => boolean;
    getVariant: (expName: IFlagKey, context?: IFlagContext) => Variant;
}

export interface IExternalFlagResolver {
    isEnabled: (flagName: IFlagKey, context?: IFlagContext) => boolean;
    getVariant: (flagName: IFlagKey, context?: IFlagContext) => Variant;
}
