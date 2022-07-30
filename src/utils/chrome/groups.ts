import { GroupConfig } from '../../types';
import { editGroup } from '../../services/state/groupsState';

export async function updateGroup(groupId: number, config: GroupConfig) {
	editGroup(groupId, config);
	return await chrome.tabGroups.update(groupId, {
		color: config.color,
		title: config.name,
	});
}

export async function getAllGroups() {
	return await chrome.tabGroups.query({});
}

export function groupFindPredicate(
	group: Pick<chrome.tabGroups.TabGroup, 'title' | 'color'>
) {
	return (groupConfig: Pick<GroupConfig, 'name' | 'color'>) => {
		return (
			group.color === groupConfig.color && group.title === groupConfig.name
		);
	};
}
