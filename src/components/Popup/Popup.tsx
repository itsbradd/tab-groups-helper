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

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		loadGroupConfigs().then(() => {
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
	);
};
