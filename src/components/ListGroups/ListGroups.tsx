import { Group } from '../Group';
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import './ListGroups.scss';

export const ListGroups = () => {
	return (
		<div className='list-groups'>
			<Group />
			<IconButton className='button-add' color='primary'>
				<AddIcon />
			</IconButton>
		</div>
	);
};
