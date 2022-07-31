import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {SettingLayout} from "../SettingLayout";
import {useContext, useEffect, useState} from "react";
import {getAdvancedOptions, setAdvancedOptions} from "../../services/state/advancedOptionsState";
import {TabContext} from "../Popup";

export const AdvancedOptions = () => {
	const tabContext = useContext(TabContext);
	const [strictMode, setStrictMode] = useState(false);
	const [autoGroup, setAutoGroup] = useState(false);

	useEffect(() => {
		const options = getAdvancedOptions()
		setStrictMode(options.strict);
		setAutoGroup(options.autoGroup);
	}, [])

	const handleSave = async () => {
		await setAdvancedOptions({
			autoGroup,
			strict: strictMode
		})

		tabContext.setTabIndex(0);
	}

	return <SettingLayout showCancel={false} onClickSave={handleSave}>
		<FormGroup>
			<FormControlLabel control={<Checkbox checked={strictMode} onChange={(e) => setStrictMode(e.target.checked)} />} label='Strict mode' />
			<FormControlLabel control={<Checkbox checked={autoGroup} onChange={(e) => setAutoGroup(e.target.checked)} />} label='Auto group tabs' />
		</FormGroup>
	</SettingLayout>
}
