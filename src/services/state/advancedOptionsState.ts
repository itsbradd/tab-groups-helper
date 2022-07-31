import {AdvancedOptions} from "../../types";
import {getStorageData, setStorageData} from "../../utils/chrome/storage";

let advancedOptions: AdvancedOptions = {
	autoGroup: false,
	strict: false
};

export async function loadAdvancedOptions() {
	advancedOptions = ((await getStorageData('advanced-options')) as any) || {
		strict: false,
		autoGroup: false
	};
}

export async function setAdvancedOptions(options: AdvancedOptions, sync = true) {
	 advancedOptions = options;
	if (!sync) return;
	await setStorageData('advanced-options', options);
}

export function getAdvancedOptions() {
	return advancedOptions;
}

export function getOptionByKey(key: keyof AdvancedOptions) {
	return advancedOptions[key];
}
