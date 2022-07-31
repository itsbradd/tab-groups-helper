import { Box, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent } from 'react';

interface Props {
	handleChange: (event: SyntheticEvent, newValue: number) => void;
	value: number;
}

export const TabMenu: FC<Props> = ({ value, handleChange }) => {
	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label='basic tabs example'
			>
				<Tab label='Groups' />
				<Tab label='Advanced options' />
			</Tabs>
		</Box>
	);
};
