import './Popup.scss';
import { TabMenu } from '../TabMenu';
import { createContext, SyntheticEvent, useState } from 'react';
import { TabPanel } from '../TabPanel';
import { ListGroups } from '../ListGroups';
import { EditGroup } from '../EditGroup';

export const EditContext = createContext({
	isEditing: false,
	setIsEditing: (editState: boolean) => {},
});

export const Popup = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [isEditing, setIsEditing] = useState(false);
	function handleChangeTab(event: SyntheticEvent, tabIndex: number) {
		setTabIndex(tabIndex);
	}

	function handleClickAdd() {
		setIsEditing(true);
	}

	return (
		<EditContext.Provider
			value={{
				isEditing,
				setIsEditing: (editState) => {
					setIsEditing(editState);
				},
			}}
		>
			<div className='popup'>
				{isEditing ? (
					<EditGroup />
				) : (
					<>
						<TabMenu value={tabIndex} handleChange={handleChangeTab} />
						<div className='popup__inner'>
							<TabPanel currentTabIndex={tabIndex} tabIndex={0}>
								<ListGroups handleClickAdd={handleClickAdd} />
							</TabPanel>
						</div>
					</>
				)}
			</div>
		</EditContext.Provider>
	);
};
