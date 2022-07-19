import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import './Group.scss';
import * as colorPalette from '@mui/material/colors';

export const Group = () => {
	return (
		<div className='group'>
			<div
				className='group__name'
				style={{
					backgroundColor: colorPalette['grey'][500],
				}}
			>
				Testing
			</div>
			<IconButton size='medium'>
				<EditIcon fontSize='small' />
			</IconButton>
			<IconButton size='medium' color='error'>
				<DeleteIcon fontSize='small' />
			</IconButton>
		</div>
	);
};
