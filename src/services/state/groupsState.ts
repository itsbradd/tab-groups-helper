import { getAllGroups, groupFindPredicate } from '../../utils/chrome/groups';
import { GroupConfig } from '../../types';

let groups: chrome.tabGroups.TabGroup[] = [];

export async function loadAllGroups() {
	groups = await getAllGroups();
}

export async function loadGroupById(groupId: number) {}

export function getGroups() {
	return groups;
}

export function getGroupById(groupId: number) {
	return groups.find((group) => {
		return group.id === groupId;
	});
}

export function getGroupIdFromGroupConfig(
	groupConfig: GroupConfig,
	windowId?: number
) {
	const group = groups.find((g) => {
		return (
			groupFindPredicate(g)(groupConfig) &&
			(windowId ? g.windowId === windowId : true)
		);
	});

	return group?.id;
}

export function getGroupIdByTitle(title: string) {
	const group = groups.find((g) => {
		return g.title === title;
	});
	return group?.id;
}

export function addGroup(group: chrome.tabGroups.TabGroup) {
	groups.push(group);
}

export function editGroup(
	groupId: number,
	config: Pick<GroupConfig, 'name' | 'color'>
) {
	groups = groups.map((group) => {
		if (group.id !== groupId) return group;
		return {
			...group,
			title: config.name,
			color: config.color,
		};
	});
}

export function deleteGroup(groupId: number) {
	groups = groups.filter((group) => {
		return group.id !== groupId;
	});
}
