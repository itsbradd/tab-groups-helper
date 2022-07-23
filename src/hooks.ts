import { ChangeEvent, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

export const useInput = (
	initValue: string,
	effect?: (value: string) => void
) => {
	const [value, setValue] = useState(initValue);
	function handleChange(
		event:
			| SelectChangeEvent
			| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setValue(event.target.value);
		if (effect) effect(event.target.value);
	}

	return {
		value,
		onChange: handleChange,
	};
};
