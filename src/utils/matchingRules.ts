import { MatchingRule } from '../types';

export function formatMatchingRule(rule: MatchingRule): MatchingRule {
	return {
		value: rule.value,
		type: rule.type,
		target: rule.target,
		id: rule.id,
	};
}
