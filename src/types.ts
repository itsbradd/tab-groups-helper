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
	Includes = 'include',
	BeginsWith = 'begins with',
	EndsWith = 'ends with',
	Equals = 'equals',
	Regex = 'regex',
}
