import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import './Group.scss';
import * as colorPalette from '@mui/material/colors';
import { FC, useContext } from 'react';
import { EditContext } from '../Popup';

interface Props {
	name: string;
	color: chrome.tabGroups.ColorEnum;
	id: number;
	onDelete: (id: number) => void;
}

export const Group: FC<Props> = ({ name, color, id, onDelete }) => {
	const editGroup = useContext(EditContext);

	return (
		<div className='group'>
			<div
				className='group__name'
				style={{
					backgroundColor: colorPalette[color][500],
				}}
			>
				{name}
			</div>
			<IconButton
				onClick={() => editGroup.setIsEditing(true, id)}
				size='medium'
			>
				<EditIcon fontSize='small' />
			</IconButton>
			<IconButton onClick={() => onDelete(id)} size='medium' color='error'>
				<DeleteIcon fontSize='small' />
			</IconButton>
		</div>
	);
};
