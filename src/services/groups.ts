import TabGroup = chrome.tabGroups.TabGroup;

export function watchRemovedGroup(callback: (group: TabGroup) => void) {
	chrome.tabGroups.onRemoved.addListener(callback);
}

export function watchCreatedGroup(callback: (group: TabGroup) => void) {
	chrome.tabGroups.onCreated.addListener(callback);
}

export function watchUpdatedGroup(callback: (group: TabGroup) => void) {
	chrome.tabGroups.onUpdated.addListener(callback);
}
