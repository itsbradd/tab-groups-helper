export async function assignTabToGroup(
	groupId: number | undefined,
	tab: chrome.tabs.Tab
) {
	return await chrome.tabs.group({
		tabIds: tab.id,
		groupId,
	});
}

export async function getAllTabs(queryInfo?: chrome.tabs.QueryInfo) {
	return await chrome.tabs.query(queryInfo ?? {});
}
