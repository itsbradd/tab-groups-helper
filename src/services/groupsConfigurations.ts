import { watchStorage } from '../utils/chrome/storage';
import { GroupConfig } from '../types';
import { setGroupsConfigs } from './state/groupsConfigurationsState';
import { getGroups } from './state/groupsState';
import { groupFindPredicate, updateGroup } from '../utils/chrome/groups';

export function watchGroupsConfig(
	callback: (newValue: unknown, oldValue: unknown) => void
) {
	return watchStorage<GroupConfig[]>(
		'groups-configs',
		async (newValue, oldValue) => {
			await setGroupsConfigs(newValue, false);
			const groups = getGroups();

			for (const group of groups) {
				const configMatcher = groupFindPredicate(group);
				const oldMatchedConfig = (oldValue ?? []).find((groupConfig) =>
					configMatcher(groupConfig)
				);
				if (!oldMatchedConfig) continue;
				const config = newValue.find(
					(groupConfig) => groupConfig.id === oldMatchedConfig.id
				);
				if (config) updateGroup(group.id, config);
			}
			callback(newValue, oldValue);
		}
	);
}
