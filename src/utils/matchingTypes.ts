export enum MatchingTypes {
	Includes = 'include',
	BeginsWith = 'begins with',
	EndsWith = 'ends with',
	Equals = 'equals',
	Regex = 'regex'
}

export default Object.values(MatchingTypes);

