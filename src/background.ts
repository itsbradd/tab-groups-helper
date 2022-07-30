import { arrangeTabToGroup, watchUpdatedTab } from './services/tabs';
import { getAllTabs } from './utils/chrome/tabs';
import { watchRemovedGroup, watchUpdatedGroup } from './services/groups';
import {
	editGroupConfig,
	getGroupConfigByGroup,
	loadGroupConfigs,
} from './services/state/groupsConfigurationsState';
import { watchGroupsConfig } from './services/groupsConfigurations';
import {
	deleteGroup,
	editGroup,
	getGroupById,
	loadAllGroups,
} from './services/state/groupsState';

async function bootstrap() {
	await Promise.all([loadGroupConfigs(), loadAllGroups()]);

	async function syncTabsToGroups() {
		const tabs = await getAllTabs();
		for (const tab of tabs) {
			await arrangeTabToGroup(tab);
		}
	}

	await syncTabsToGroups();
	watchGroupsConfig(async (newValue, oldValue) => {
		await syncTabsToGroups();
	});
	watchUpdatedTab(async (tab) => {
		await arrangeTabToGroup(tab);
	});
	watchUpdatedGroup(async ({ id, color, title }) => {
		const group = getGroupById(id);
		if (!group) return;
		const config = getGroupConfigByGroup(group);

		if (config) {
			if (title === config.name && color === config.color) return;
			editGroup(group.id, {
				name: title ?? '',
				color,
			});
			editGroupConfig(
				{
					...config,
					name: title ?? '',
					color: color,
				},
				true
			);
		}
	});
	watchRemovedGroup(async (group) => {
		deleteGroup(group.id);
	});
}

bootstrap();
