import './ColorPicker.scss';
import colors from '../../utils/colors';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as colorPalette from '@mui/material/colors';
import { ChangeEvent, FC } from 'react';

interface Props {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ColorPicker: FC<Props> = (props) => {
	return (
		<RadioGroup {...props} className='color-picker'>
			{colors.map((color) => (
				<FormControlLabel
					key={color}
					value={color}
					control={
						<Radio
							size='small'
							sx={{
								color: colorPalette[color][800],
								'&.Mui-checked': {
									color: colorPalette[color][600],
								},
							}}
						/>
					}
					label={color}
				/>
			))}
		</RadioGroup>
	);
};
