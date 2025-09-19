// Types inferred from Sentry Issue Alert webhook docs
// https://docs.sentry.io/organization/integrations/integration-platform/webhooks/issue-alerts/

export interface SentryWebhookActor {
	id: string;
	name: string;
	type: string; // "application"
}

export interface SentryInstallation {
	uuid: string;
}

export interface SentryIssueAlertSetting {
	name: string;
	value: string;
}

export interface SentryIssueAlertMeta {
	title: string;
	settings: SentryIssueAlertSetting[];
}

export interface SentryUser {
	ip_address?: string;
	[id: string]: unknown;
}

export interface SentryEventRequest {
	cookies: unknown;
	data: unknown;
	env: unknown;
	fragment: unknown;
	headers: [string, string][];
	inferred_content_type: unknown;
	method: string | null;
	query_string: unknown[];
	url: string;
}

export interface SentryEventSdkPackage {
	name: string;
	version: string;
}

export interface SentryEventSdk {
	name: string;
	version: string;
	packages?: SentryEventSdkPackage[];
	integrations?: string[];
}

export interface SentryEventMetadata {
	filename?: string;
	type?: string;
	value?: string;
	[id: string]: unknown;
}

// Issue payload observed in production webhooks (Issue Alerts)
export interface SentryIssueProject {
	id: string;
	name: string;
	slug: string;
	platform?: string;
}

export interface SentryIssueMetadata {
	value?: string;
	type?: string;
	filename?: string;
	function?: string;
	in_app_frame_mix?: string;
	sdk?: { name: string; name_normalized?: string };
	initial_priority?: number;
	[key: string]: unknown;
}

export interface SentryIssue {
	id: string; // e.g. "64857638"
	shortId?: string; // e.g. "APP-1C"
	title: string;
	culprit?: string;
	permalink?: string;
	url?: string; // API URL
	web_url?: string; // Web URL
	project: SentryIssueProject;
	level?: string; // "error", "warning", etc.
	status?: string;
	substatus?: string;
	type?: string; // "error"
	platform?: string;
	isPublic?: boolean;
	isBookmarked?: boolean;
	isSubscribed?: boolean;
	hasSeen?: boolean;
	isUnhandled?: boolean;
	annotations?: unknown[];
	metadata?: SentryIssueMetadata;
	issueType?: string;
	issueCategory?: string;
	priority?: string;
	count?: string | number;
	firstSeen?: string; // ISO string
	lastSeen?: string; // ISO string
	numComments?: number;
	userCount?: number;
}

export interface SentryIssueAlertWebhookData {
	// In practice for our installation, Sentry sends an issue object, not an event
	issue: SentryIssue;
	// Some installations may include these fields; keep optional for flexibility
	event?: unknown;
	triggered_rule?: string;
	issue_alert?: SentryIssueAlertMeta; // Present for alert rule action UI components
}

export interface SentryIssueAlertWebhook {
	action: "created";
	actor: SentryWebhookActor;
	data: SentryIssueAlertWebhookData;
	installation: SentryInstallation;
}
