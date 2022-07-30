import { Popup } from './components/Popup';
import './App.scss';
import { useEffect, useState } from 'react';
import { loadGroupConfigs } from './services/state/groupsConfigurationsState';
import { Box, CircularProgress } from '@mui/material';

export function App() {
	return (
		<div>
			<Popup />
		</div>
	);
}
