export interface MatchingRule {
	id: number;
	target: MatchingTargets;
	type: MatchingTypes;
	value: string;
}

export enum MatchingTargets {
	Hostname = 'hostname',
	Url = 'url',
}

export enum MatchingTypes {
	Includes = 'includes',
	BeginsWith = 'begins with',
	EndsWith = 'ends with',
	Equals = 'equals',
	Regex = 'regex',
}

export interface GroupConfig {
	id: number;
	name: string;
	color: chrome.tabGroups.ColorEnum;
	rules: MatchingRule[];
}

export interface AdvancedOptions {
	strict: boolean;
	autoGroup: boolean;
}
