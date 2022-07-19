import './Popup.scss';
import { TabMenu } from '../TabMenu';
import { SyntheticEvent, useState } from 'react';
import { TabPanel } from '../TabPanel';
import { ListGroups } from '../ListGroups';

export const Popup = () => {
	const [tabIndex, setTabIndex] = useState(0);
	function handleChangeTab(event: SyntheticEvent, tabIndex: number) {
		setTabIndex(tabIndex);
	}
	return (
		<div className='popup'>
			<TabMenu value={tabIndex} handleChange={handleChangeTab} />
			<div className='popup__inner'>
				<TabPanel currentTabIndex={tabIndex} tabIndex={0}>
					<ListGroups />
				</TabPanel>
			</div>
		</div>
	);
};
