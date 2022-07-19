import './ColorPicker.scss';
import colors from '../../utils/colors';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as colorPalette from '@mui/material/colors';

export const ColorPicker = () => {
	return (
		<RadioGroup className='color-picker'>
			{colors.map((color) => (
				<FormControlLabel
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
