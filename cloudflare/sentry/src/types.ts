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

export interface SentryEvent {
	_ref?: number;
	_ref_version?: number;
	contexts?: Record<string, unknown>;
	culprit?: string | null;
	datetime?: string; // ISO
	dist?: string | null;
	event_id: string;
	exception?: unknown;
	fingerprint?: string[];
	grouping_config?: Record<string, unknown>;
	hashes?: string[];
	issue_url?: string; // not in docs, keep optional
	issue_id?: string; // not in docs, keep optional
	issue?: unknown;
	issue_id_alias?: unknown;
	issue_id_display?: unknown;
	issue_title?: unknown;
	issue_type?: unknown;
	issue_metadata?: unknown;
	issue_short_id?: unknown;
	issue_permalink?: unknown;
	issue_status?: unknown;
	issue_project_slug?: unknown;
	issue_platform?: unknown;
	issue_first_seen?: unknown;
	issue_last_seen?: unknown;
	issue_count?: unknown;
	issue_level?: unknown;

	issue_url_alias?: unknown;

	issue_is_unhandled?: unknown;

	issue_assigned_to?: unknown;

	issue_seen_by?: unknown;

	issue_annotations?: unknown;

	issue_share_id?: unknown;

	issue_owners?: unknown;

	issue_suspect_commits?: unknown;

	issue_num_comments?: unknown;

	issue_num_users?: unknown;

	issue_user_count?: unknown;

	issue_first_release?: unknown;

	issue_first_release_version?: unknown;

	issue_last_release?: unknown;

	issue_last_release_version?: unknown;

	issue_last_commit?: unknown;

	issue_latest_event?: unknown;

	issue_is_public?: unknown;

	issue_has_seen?: unknown;

	issue_has_user_report?: unknown;

	issue_is_unresolved?: unknown;

	issue_is_ignored?: unknown;

	issue_is_filtered?: unknown;

	issue_is_regression?: unknown;

	issue_is_reviewed?: unknown;

	issue_priority?: unknown;

	issue_type_display?: unknown;

	issue_platforms?: unknown;

	issue_owner?: unknown;

	issue_latest_release?: unknown;

	issue_short_id_display?: unknown;

	issue_permalink_alias?: unknown;

	issue_issue_id?: unknown;

	issue_project?: unknown;

	issue_occurrence_id?: unknown;

	issue_event_id?: unknown;

	issue_archive?: unknown;

	issue_priority_reason?: unknown;

	issue_suspect_spans?: unknown;

	issue_breakdowns?: unknown;

	issue_perf_info?: unknown;

	issue_request?: unknown;

	issue_frames?: unknown;

	issue_profiling_trace?: unknown;

	issue_profile_id?: unknown;

	issue_profile?: unknown;

	issue_device_classification?: unknown;

	issue_key_id?: unknown;

	issue_location?: unknown;

	issue_message?: string;
	level?: string; // "error", "warning", etc.
	location?: string | null;
	logger?: string;
	message?: string;
	metadata?: SentryEventMetadata;
	platform?: string;
	project?: number;
	received?: number;
	release?: string | null;
	request?: SentryEventRequest;
	sdk?: SentryEventSdk;
	tags?: [string, string][];
	time_spent?: number | null;
	timestamp?: number;
	title?: string;
	type?: string; // "error"
	url?: string; // API URL for event
	user?: SentryUser;
	version?: string | number;
	web_url?: string; // web url for event
}

export interface SentryIssueAlertWebhookData {
	event: SentryEvent;
	triggered_rule: string;
	issue_alert?: SentryIssueAlertMeta; // Present for alert rule action UI components
}

export interface SentryIssueAlertWebhook {
	action: 'triggered';
	actor: SentryWebhookActor;
	data: SentryIssueAlertWebhookData;
	installation: SentryInstallation;
}


