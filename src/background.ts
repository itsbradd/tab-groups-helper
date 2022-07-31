import {
	arrangeTabToGroup,
	watchTabAttached,
	watchTabMoved,
	watchUpdatedTab,
} from './services/tabs';
import { getAllTabs } from './utils/chrome/tabs';
import {
	watchCreatedGroup,
	watchRemovedGroup,
	watchUpdatedGroup,
} from './services/groups';
import {
	editGroupConfig,
	getGroupConfigByGroup,
	loadGroupConfigs,
} from './services/state/groupsConfigurationsState';
import { watchGroupsConfig } from './services/groupsConfigurations';
import {
	addGroup,
	deleteGroup,
	editGroup,
	getGroupById,
	loadAllGroups,
} from './services/state/groupsState';
import groupCreation from './utils/groupCreation';
import {loadAdvancedOptions} from "./services/state/advancedOptionsState";
import {watchAdvancedOptions} from "./services/advancedOptions";

async function bootstrap() {
	await Promise.all([loadGroupConfigs(), loadAllGroups(), loadAdvancedOptions()]);

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
	watchAdvancedOptions(async () => {
		await syncTabsToGroups();
	});
	watchUpdatedTab(async (tab) => {
		await arrangeTabToGroup(tab);
	});
	watchUpdatedGroup(async ({ id, color, title }) => {
		const group = getGroupById(id);
		if (!group) return;
		const config = getGroupConfigByGroup(group);

		editGroup(group.id, {
			name: title ?? '',
			color,
		});
		if (config) {
			if (title === config.name && color === config.color) return;
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

	watchCreatedGroup((group) => {
		addGroup(group);
	});

	watchTabMoved(async (tab) => {
		groupCreation.queue(async () => {
			await arrangeTabToGroup(tab);
		})
	});

	watchTabAttached(async (tab) => {
		groupCreation.queue(async () => {
			await arrangeTabToGroup(tab);
		});
	});
}

bootstrap();
