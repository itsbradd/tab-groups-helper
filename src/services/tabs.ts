import { MatchingTargets, MatchingTypes } from '../types';
import { assignTabToGroup, getTab, ungroupTab } from '../utils/chrome/tabs';
import { getGroupTitleByHostname, updateGroup } from '../utils/chrome/groups';
import {
	addGroup,
	getGroupIdByTitle,
	getGroupIdFromGroupConfig,
} from './state/groupsState';
import { getGroupsConfigurations } from './state/groupsConfigurationsState';
import colors from '../utils/colors';
import {
	getAdvancedOptions,
	getOptionByKey,
} from './state/advancedOptionsState';
import TabChangeInfo = chrome.tabs.TabChangeInfo;

async function repeatAssignTabUntilSuccess(
	groupId: number | undefined,
	tab: chrome.tabs.Tab
): Promise<number> {
	try {
		return await assignTabToGroup(groupId, tab);
	} catch (e) {
		return await repeatAssignTabUntilSuccess(groupId, tab);
	}
}

async function repeatUnGroupTabUntilSuccess(
	tab: chrome.tabs.Tab
): Promise<void> {
	try {
		return await ungroupTab(tab);
	} catch (e) {
		return await repeatUnGroupTabUntilSuccess(tab);
	}
}

export async function arrangeTabToGroup(tab: chrome.tabs.Tab) {
	const groupConfig = getGroupConfigForTab(tab);
	const advancedOptions = getAdvancedOptions();
	const isAutoEnabled = advancedOptions.autoGroup;
	const isStrictEnabled = advancedOptions.strict;
	if (!groupConfig) {
		if (isAutoEnabled) return await arrangeTabToGroupByUrl(tab);
		if (isStrictEnabled) await repeatUnGroupTabUntilSuccess(tab);
		return;
	}

	let groupId = getGroupIdFromGroupConfig(groupConfig, tab.windowId);
	const isGroupCreated = !!groupId;
	if (tab.groupId === groupId) return;
	groupId = (await repeatAssignTabUntilSuccess(groupId, tab)) as number;

	if (!isGroupCreated) {
		addGroup(await updateGroup(groupId, groupConfig));
	}
}

async function arrangeTabToGroupByUrl(tab: chrome.tabs.Tab) {
	if (!tab.url) return;
	const url = new URL(tab.url);
	if (!url.protocol.includes('http')) {
		const isStrict = getOptionByKey('strict');
		if (isStrict) {
			return await repeatUnGroupTabUntilSuccess(tab);
		}
	}

	const groupTitle = getGroupTitleByHostname(url.hostname);
	let groupId = getGroupIdByTitle(groupTitle, tab.windowId);
	const isGroupCreated = !!groupId;
	if (tab.groupId === groupId) return;
	groupId = (await repeatAssignTabUntilSuccess(groupId, tab)) as number;

	if (!isGroupCreated) {
		const color = Math.round(Math.random() * colors.length);
		addGroup(
			await updateGroup(groupId, {
				color: colors[color],
				name: groupTitle,
				rules: [],
				id: new Date().getTime(),
			})
		);
	}
}

export function getGroupConfigForTab(tab: chrome.tabs.Tab) {
	try {
		const groupsConfigs = getGroupsConfigurations();
		console.log(tab);
		const url = new URL(tab.url ?? '');
		for (const config of groupsConfigs) {
			for (const rule of config.rules) {
				const matchingTarget =
					rule.target === MatchingTargets.Hostname ? url.hostname : url.href;
				switch (rule.type) {
					case MatchingTypes.Includes: {
						if (matchingTarget.includes(rule.value)) return config;
						break;
					}
					case MatchingTypes.BeginsWith: {
						if (matchingTarget.startsWith(rule.value)) return config;
						break;
					}
					case MatchingTypes.EndsWith: {
						if (matchingTarget.endsWith(rule.value)) return config;
						break;
					}
					case MatchingTypes.Equals: {
						if (matchingTarget === rule.value) return config;
						break;
					}
					case MatchingTypes.Regex: {
						const regex = new RegExp(rule.value, 'ig');
						if (regex.test(matchingTarget)) return config;
						break;
					}
				}
			}
		}
	} catch (e) {
		return;
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

export function watchTabMoved(callback: (tab: chrome.tabs.Tab) => void) {
	chrome.tabs.onMoved.addListener((tabId, detachInfo) => {
		getTab(tabId).then((tab) => {
			callback(tab);
		});
	});
}

export function watchTabAttached(callback: (tab: chrome.tabs.Tab) => void) {
	chrome.tabs.onActivated.addListener(({ tabId }) => {
		getTab(tabId).then((tab) => {
			callback(tab);
		});
	});
}
