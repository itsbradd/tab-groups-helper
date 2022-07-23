import './Popup.scss';
import { TabMenu } from '../TabMenu';
import { createContext, SyntheticEvent, useState } from 'react';
import { TabPanel } from '../TabPanel';
import { ListGroups } from '../ListGroups';
import { EditGroup } from '../EditGroup';

export const EditContext = createContext({
	id: undefined as number | undefined,
	isEditing: false,
	setIsEditing: (editState: boolean, id?: number) => {},
});

export const Popup = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [isEditing, setIsEditing] = useState(false);
	const [editingGroupId, setEditingGroupId] = useState<number | undefined>(
		undefined
	);
	function handleChangeTab(event: SyntheticEvent, tabIndex: number) {
		setTabIndex(tabIndex);
	}

	return (
		<EditContext.Provider
			value={{
				id: editingGroupId,
				isEditing,
				setIsEditing: (editState, groupId) => {
					setEditingGroupId(groupId);
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
								<ListGroups />
							</TabPanel>
						</div>
					</>
				)}
			</div>
		</EditContext.Provider>
	);
};
