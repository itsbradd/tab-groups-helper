import {
	FormControl,
	IconButton,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import matchingTargets from '../../utils/matchingTargets';
import matchingTypes from '../../utils/matchingTypes';
import './MatchingRule.scss';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { MatchingRule as MatchingRuleType } from '../../types';
import { ChangeEvent, FC } from 'react';

interface Props {
	onClickAdd?: () => void;
	onClickDelete?: (id: number) => void;
	matchingRule: MatchingRuleType & { error: string };
	value: {
		value: string;
		target: string;
		type: string;
	};
	onChange: (name: string, value: string) => void;
}

export const MatchingRule: FC<Props> = ({
	onClickAdd,
	onClickDelete,
	matchingRule,
	value,
	onChange,
}) => {
	function handleChange(
		event:
			| SelectChangeEvent
			| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		onChange(event.target.name, event.target.value);
	}

	function handleClickDelete() {
		if (onClickDelete) onClickDelete(matchingRule.id);
	}

	return (
		<div className='matching-rule'>
			<FormControl sx={{ m: 1, width: 120, textTransform: 'capitalize' }}>
				<Select
					name='target'
					value={value.target}
					onChange={handleChange}
					size='small'
				>
					{matchingTargets.map((t) => (
						<MenuItem key={t} sx={{ textTransform: 'capitalize' }} value={t}>
							{t}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, width: 100, textTransform: 'capitalize' }}>
				<Select
					name='type'
					value={value.type}
					onChange={handleChange}
					size='small'
				>
					{matchingTypes.map((t) => (
						<MenuItem key={t} sx={{ textTransform: 'capitalize' }} value={t}>
							{t}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				name='value'
				size='small'
				id='standard-error-helper-text'
				label='Value'
				value={value.value}
				onChange={handleChange}
				error={!!matchingRule.error}
				helperText={matchingRule.error}
			/>
			<div className='matching-rule__actions'>
				<IconButton onClick={onClickAdd} size='medium' color='primary'>
					<AddIcon fontSize='small' />
				</IconButton>
				<IconButton onClick={handleClickDelete} size='medium' color='error'>
					<DeleteIcon fontSize='small' />
				</IconButton>
			</div>
		</div>
	);
};
