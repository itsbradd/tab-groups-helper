import './Popup.scss';
import { TabMenu } from '../TabMenu';
import {
	createContext,
	SyntheticEvent,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { TabPanel } from '../TabPanel';
import { ListGroups } from '../ListGroups';
import { EditGroup } from '../EditGroup';
import { Box, CircularProgress } from '@mui/material';
import { loadGroupConfigs } from '../../services/state/groupsConfigurationsState';
import { AdvancedOptions } from '../AdvancedOptions';
import { loadAdvancedOptions } from '../../services/state/advancedOptionsState';

export const EditContext = createContext({
	id: undefined as number | undefined,
	isEditing: false,
	setIsEditing: (editState: boolean, id?: number) => {},
});

export const TabContext = createContext({
	tabIndex: 0,
	setTabIndex: (tabIndex: number) => {},
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

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Promise.all([loadGroupConfigs(), loadAdvancedOptions()]).then(() => {
			setLoading(false);
		});
	});

	const tabContent = useMemo(
		() =>
			isEditing ? (
				<EditGroup />
			) : (
				<>
					<TabMenu value={tabIndex} handleChange={handleChangeTab} />
					<div className='popup__inner'>
						<TabPanel currentTabIndex={tabIndex} tabIndex={0}>
							<ListGroups />
						</TabPanel>
						<TabPanel currentTabIndex={tabIndex} tabIndex={1}>
							<AdvancedOptions />
						</TabPanel>
					</div>
				</>
			),
		[isEditing, tabIndex]
	);

	const loadingContent = (
		<Box sx={{ display: 'flex' }}>
			<CircularProgress />
		</Box>
	);

	return (
		<TabContext.Provider
			value={{
				tabIndex,
				setTabIndex,
			}}
		>
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
				<div className='popup'>{loading ? loadingContent : tabContent}</div>
			</EditContext.Provider>
		</TabContext.Provider>
	);
};
