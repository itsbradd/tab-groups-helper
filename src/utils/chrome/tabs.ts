export async function assignTabToGroup(
	groupId: number | undefined,
	tab: chrome.tabs.Tab,
	windowId?: number
) {
	const options: chrome.tabs.GroupOptions = {
		tabIds: tab.id,
	};

	if (groupId !== undefined) {
		options.groupId = groupId;
	} else {
		options.createProperties = {
			windowId
		}
	}

	return await chrome.tabs.group({
		...options
	});
}

export async function getAllTabs(queryInfo?: chrome.tabs.QueryInfo) {
	return await chrome.tabs.query(queryInfo ?? {});
}

export async function getTab(tabId: number) {
	return await chrome.tabs.get(tabId);
}

export async function ungroupTab(tab: chrome.tabs.Tab) {
	return await chrome.tabs.ungroup(tab.id ?? 0);
}
