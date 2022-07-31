import {watchStorage} from "../utils/chrome/storage";
import {AdvancedOptions} from "../types";
import {setAdvancedOptions} from "./state/advancedOptionsState";

export function watchAdvancedOptions(
	callback: (newValue: unknown, oldValue: unknown) => void
) {
	return watchStorage<AdvancedOptions>('advanced-options', async (newValue, oldValue) => {
		await setAdvancedOptions(newValue, false);
		callback(newValue, oldValue);
	})
}
