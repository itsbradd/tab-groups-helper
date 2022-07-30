import { GroupConfig } from '../../types';
import { getStorageData, setStorageData } from '../../utils/chrome/storage';
import { groupFindPredicate } from '../../utils/chrome/groups';
import { debounce as debounceFn } from 'debounce';

let groupsConfigurations: GroupConfig[] = [];

export async function loadGroupConfigs() {
	groupsConfigurations =
		((await getStorageData('groups-configs')) as any) || [];
}

export function getGroupsConfigurations() {
	return groupsConfigurations;
}

export async function setGroupsConfigs(configs: GroupConfig[], sync = true) {
	groupsConfigurations = configs;
	if (!sync) return;
	await setStorageData('groups-configs', configs);
}

export async function addGroupsConfig(group: GroupConfig) {
	const data = [...groupsConfigurations, group];
	groupsConfigurations = data;
	await setStorageData('groups-configs', data);
}

export const debounceEditGroupConfig = debounceFn(
	async (data: GroupConfig[]) => {
		await setStorageData('groups-configs', data);
	},
	500
);

export async function editGroupConfig(group: GroupConfig, debounce = false) {
	const updatedConfigs = groupsConfigurations.map((config) => {
		if (config.id === group.id) {
			return group;
		}
		return config;
	});
	groupsConfigurations = updatedConfigs;
	if (debounce) {
		await debounceEditGroupConfig(updatedConfigs);
	} else {
		await setStorageData('groups-configs', updatedConfigs);
	}
}

export async function deleteGroupConfig(id: number) {
	const remainingConfigs = groupsConfigurations.filter((config) => {
		return config.id !== id;
	});
	groupsConfigurations = remainingConfigs;
	await setStorageData('groups-configs', remainingConfigs);
}

export function getGroupConfigById(id: number) {
	return groupsConfigurations.find((groupConfig) => groupConfig.id === id);
}

export function getGroupConfigByGroup(group: chrome.tabGroups.TabGroup) {
	const configPredicate = groupFindPredicate(group);
	return groupsConfigurations.find((config) => {
		return configPredicate(config);
	});
}
