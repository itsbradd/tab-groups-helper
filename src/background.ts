chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	console.log(tabId, changeInfo, tab)
})
