import {FormControl, MenuItem, Select, TextField} from '@mui/material';
import matchingTargets from '../../utils/matchingTargets';
import matchingTypes from "../../utils/matchingTypes";

export const MatchingRule = () => {
	return (
		<div className='matching-rule'>
			<FormControl sx={{m: 1, width: 120, textTransform: 'capitalize'}}>
				<Select defaultValue={matchingTargets[0]} size='small'>
					{matchingTargets.map((target) => (
						<MenuItem value={target}>
							{target}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{m: 1, width: 120, textTransform: 'capitalize'}}>
				<Select defaultValue={matchingTypes[0]} size='small'>
					{matchingTypes.map((type) => (
						<MenuItem  value={type}>
							{type}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				size='small'
				id="standard-error-helper-text"
				label="Value"
				variant="standard"
			/>
		</div>
	);
};
