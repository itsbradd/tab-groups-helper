import { FC, ReactNode, useContext } from 'react';
import { Button } from '@mui/material';
import { EditContext } from '../Popup';
import './SettingLayout.scss';

interface Props {
	className?: string;
	children?: ReactNode;
	onClickSave?: () => void;
	showCancel?: boolean;
}

export const SettingLayout: FC<Props> = ({
	showCancel,
	className,
	children,
	onClickSave,
}) => {
	const editContext = useContext(EditContext);

	function handleCancel() {
		editContext.setIsEditing(false);
	}

	return (
		<div className={'setting-layout' + (className ? ` ${className}` : '')}>
			{children}
			<div className='bottom-actions'>
				<div className='bottom-actions__left'></div>
				<div className='bottom-actions__right'>
					{showCancel ?? (
						<Button variant='outlined' size='small' onClick={handleCancel}>
							Cancel
						</Button>
					)}
					<Button
						className='bottom-actions__save'
						size='small'
						onClick={onClickSave}
						variant='contained'
					>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

SettingLayout.defaultProps = {
	showCancel: true,
};
