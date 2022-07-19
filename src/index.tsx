import { App } from './App';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

const root = createRoot(document.getElementById('app')!);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
