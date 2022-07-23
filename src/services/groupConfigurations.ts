import {
	getStorageData,
	setStorageData,
	watchStorage,
} from '../utils/chrome/storage';
import { GroupConfig } from '../types';

let groupConfigurationsStorage: GroupConfig[] = [];

export async function initGroupsConfigValue() {
	groupConfigurationsStorage = (await getStorageData('groups-config')) as any;
	return groupConfigurationsStorage;
}

export function startWatchingGroupsConfig(
	callback: (newValue: unknown, oldValue: unknown) => void
) {
	return watchStorage('groups-config', callback);
}

export async function getGroupsConfig() {
	if (Object.keys(groupConfigurationsStorage).length === 0) {
		await initGroupsConfigValue();
	}
	return groupConfigurationsStorage;
}

export async function addGroupsConfig(group: GroupConfig) {
	await setStorageData('groups-config', [...groupConfigurationsStorage, group]);
	groupConfigurationsStorage = [...groupConfigurationsStorage, group];
}

export async function editGroupConfig(group: GroupConfig) {
	const updatedConfigs = groupConfigurationsStorage.map((config) => {
		if (config.id === group.id) {
			return group;
		}
		return config;
	});
	await setStorageData('groups-config', updatedConfigs);
	groupConfigurationsStorage = updatedConfigs;
}

export async function deleteGroupConfig(id: number) {
	const remainingConfigs = groupConfigurationsStorage.filter((config) => {
		return config.id !== id;
	});
	await setStorageData('groups-config', remainingConfigs);
	groupConfigurationsStorage = remainingConfigs;
}

export function getGroupConfigById(id: number) {
	return groupConfigurationsStorage.find(
		(groupConfig) => groupConfig.id === id
	);
}
