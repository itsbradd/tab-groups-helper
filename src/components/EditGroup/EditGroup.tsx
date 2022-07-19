import { Button, TextField } from '@mui/material';
import { ColorPicker } from '../ColorPicker';
import './EditGroup.scss';
import { useContext } from 'react';
import { EditContext } from '../Popup';

export const EditGroup = () => {
	const editContext = useContext(EditContext);
	return (
		<div className='edit-group'>
			<TextField size='small' variant='filled' fullWidth label='Group name' />
			<ColorPicker />
			<div className='bottom-actions'>
				<div className='bottom-actions__left'></div>
				<div className='bottom-actions__right'>
					<Button
						variant='outlined'
						size='small'
						onClick={() => editContext.setIsEditing(false)}
					>
						Cancel
					</Button>
					<Button
						className='bottom-actions__save'
						size='small'
						variant='contained'
					>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};
