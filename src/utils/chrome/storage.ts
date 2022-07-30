import AreaName = chrome.storage.AreaName;
import StorageChange = chrome.storage.StorageChange;

export function getStorageData<T>(
	key: string | string[] | { [p: string]: any } | null,
	area = 'sync'
) {
	return new Promise<T>((resolve, reject) => {
		(chrome.storage as any)[area].get(key, (item: { [p: string]: any }) => {
			// Pass any observed errors down the promise chain.
			if (chrome.runtime.lastError) {
				return reject(chrome.runtime.lastError);
			}
			if (typeof key === 'string') {
				resolve(item[key]);
			}
			resolve(item as any);
		});
	});
}

export function setStorageData<T>(key: string, value: T, area = 'sync') {
	return new Promise<void>((resolve, reject) => {
		(chrome.storage as any)[area].set({ [key]: value }, () => resolve());
	});
}

export function watchStorage<T>(
	key: string,
	callback: (newValue: T, oldValue: T) => void,
	area = 'sync'
) {
	const handler: (
		changes: { [p: string]: StorageChange },
		areaName: AreaName
	) => void = (changes, areaName) => {
		if (!(key in changes) || areaName !== area) return;
		const { newValue, oldValue } = changes[key];
		if (JSON.stringify(newValue) === JSON.stringify(oldValue)) return;
		callback(newValue, oldValue);
	};
	chrome.storage.onChanged.addListener(handler);

	return {
		unsubscribe() {
			chrome.storage.onChanged.removeListener(handler);
		},
	};
}
