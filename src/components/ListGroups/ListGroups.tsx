import { Group } from '../Group';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './ListGroups.scss';
import { useContext, useEffect, useState } from 'react';
import { EditContext } from '../Popup';
import { GroupConfig } from '../../types';
import {} from '../../services/groupsConfigurations';
import {
	deleteGroupConfig,
	getGroupsConfigurations,
} from '../../services/state/groupsConfigurationsState';

export const ListGroups = () => {
	const editContext = useContext(EditContext);
	const [groups, setGroups] = useState<GroupConfig[]>([]);

	async function getGroupsConfigData() {
		setGroups(getGroupsConfigurations());
	}

	useEffect(() => {
		getGroupsConfigData();
	}, []);

	return (
		<div className='list-groups'>
			{groups.map((group) => (
				<Group
					key={group.id}
					id={group.id}
					name={group.name}
					color={group.color}
					onDelete={async (id) => {
						await deleteGroupConfig(id);
						getGroupsConfigData();
					}}
				/>
			))}
			<IconButton
				onClick={() => editContext.setIsEditing(true)}
				className='button-add'
				color='primary'
			>
				<AddIcon />
			</IconButton>
		</div>
	);
};
