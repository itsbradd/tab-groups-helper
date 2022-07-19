import { Group } from '../Group';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './ListGroups.scss';
import { FC } from 'react';

interface Props {
	handleClickAdd?: () => void;
}

export const ListGroups: FC<Props> = ({ handleClickAdd }) => {
	return (
		<div className='list-groups'>
			<Group />
			<IconButton
				onClick={handleClickAdd}
				className='button-add'
				color='primary'
			>
				<AddIcon />
			</IconButton>
		</div>
	);
};
