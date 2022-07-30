import { MatchingTypes } from '../types';
import { assignTabToGroup } from '../utils/chrome/tabs';
import { updateGroup } from '../utils/chrome/groups';
import TabChangeInfo = chrome.tabs.TabChangeInfo;
import { addGroup, getGroupIdFromGroupConfig } from './state/groupsState';
import { getGroupsConfigurations } from './state/groupsConfigurationsState';

export async function arrangeTabToGroup(tab: chrome.tabs.Tab) {
	const groupConfig = getGroupConfigForTab(tab);
	if (!groupConfig) return;

	let groupId = getGroupIdFromGroupConfig(groupConfig, tab.windowId);
	const isGroupCreated = !!groupId;
	if (tab.groupId === groupId) return;
	groupId = await assignTabToGroup(groupId, tab);

	if (!isGroupCreated) {
		addGroup(await updateGroup(groupId, groupConfig));
	}
}

export function getGroupConfigForTab(tab: chrome.tabs.Tab) {
	const groupsConfigs = getGroupsConfigurations();
	for (const config of groupsConfigs) {
		for (const rule of config.rules) {
			switch (rule.type) {
				case MatchingTypes.Includes: {
					if (tab.url?.includes(rule.value)) {
						return config;
					}
				}
			}
		}
	}
}

export function watchUpdatedTab(callback: (tab: chrome.tabs.Tab) => void) {
	function handler(
		tabId: number,
		changeInfo: TabChangeInfo,
		tab: chrome.tabs.Tab
	) {
		if (changeInfo.url) {
			callback(tab);
		}
	}
	chrome.tabs.onUpdated.addListener(handler);

	return {
		unsubscribe() {
			chrome.tabs.onUpdated.removeListener(handler);
		},
	};
}
