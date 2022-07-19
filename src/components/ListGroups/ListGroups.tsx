import { Group } from '../Group';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './ListGroups.scss';
import {useContext} from "react";
import {EditContext} from "../Popup";

export const ListGroups = () => {
	const editContext = useContext(EditContext)

	return (
		<div className='list-groups'>
			<Group />
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
