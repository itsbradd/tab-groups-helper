import { Button, TextField } from '@mui/material';
import { ColorPicker } from '../ColorPicker';
import './EditGroup.scss';
import { useContext, useState } from 'react';
import { EditContext } from '../Popup';
import { MatchingRule as MatchingRuleComp } from '../MatchingRule';
import {
	GroupConfig,
	MatchingRule,
	MatchingTargets,
	MatchingTypes,
} from '../../types';
import { useInput } from '../../hooks';
import colors from '../../utils/colors';
import {} from '../../services/groupsConfigurations';
import { formatMatchingRule } from '../../utils/matchingRules';
import {
	addGroupsConfig,
	editGroupConfig,
	getGroupConfigById,
} from '../../services/state/groupsConfigurationsState';

export const EditGroup = () => {
	const editContext = useContext(EditContext);
	let editingGroup: GroupConfig | undefined;
	if (editContext.id) {
		editingGroup = getGroupConfigById(editContext.id);
	}

	const groupName = useInput(
		editingGroup ? editingGroup.name : '',
		(newGroupName) => {
			if (!newGroupName) setErrorGroup('Please input group name!');
			else setErrorGroup('');
		}
	);
	const [errorGroup, setErrorGroup] = useState('');
	const color = useInput(editingGroup ? editingGroup.color : colors[0]);

	const [matchingRules, setMatchingRules] = useState<
		(MatchingRule & { error: string })[]
	>(
		editingGroup
			? editingGroup.rules.map((rule) => ({ ...rule, error: '' }))
			: [
					{
						id: Date.now(),
						target: MatchingTargets.Hostname,
						type: MatchingTypes.Includes,
						value: '',
						error: '',
					},
			  ]
	);

	function handleAdd() {
		setMatchingRules((pre) => {
			return [
				...pre,
				{
					id: Date.now(),
					target: MatchingTargets.Hostname,
					type: MatchingTypes.Includes,
					value: '',
					error: '',
				},
			];
		});
	}

	function handleDelete(id: number) {
		setMatchingRules((pre) => {
			return pre.filter((rule) => rule.id !== id);
		});
	}

	function handleRuleChange(index: number, name: string, value: string) {
		setMatchingRules((pre) => {
			const rules = [...pre];
			// @ts-ignore
			rules[index][name] = value;

			const textValue = rules[index].value;
			if (textValue) rules[index].error = '';
			else rules[index].error = 'Please input value!';

			return rules;
		});
	}

	function handleCancel() {
		editContext.setIsEditing(false);
	}

	async function handleSave() {
		if (!groupName.value) setErrorGroup('Please input group name!');
		let error = false;
		setMatchingRules((pre) => {
			const groups = pre.map((rule) => {
				if (!rule.value) {
					error = true;
					return {
						...rule,
						error: 'Please input value!',
					};
				}
				return rule;
			});

			if (!error) {
				if (editingGroup) {
					editGroupConfig({
						name: groupName.value,
						color: color.value as chrome.tabGroups.ColorEnum,
						rules: matchingRules.map((rule) => formatMatchingRule(rule)),
						id: editingGroup.id,
					}).then(() => {
						handleCancel();
					});
				} else {
					addGroupsConfig({
						name: groupName.value,
						color: color.value as chrome.tabGroups.ColorEnum,
						rules: matchingRules.map((rule) => formatMatchingRule(rule)),
						id: new Date().getTime(),
					}).then(() => {
						handleCancel();
					});
				}
			}
			return groups;
		});
	}

	return (
		<div className='edit-group'>
			<TextField
				{...groupName}
				error={!!errorGroup}
				helperText={errorGroup}
				size='small'
				variant='filled'
				fullWidth
				label='Group name'
			/>
			<ColorPicker {...color} />
			<div className='matching-rules'>
				<h2 className='matching-rules__title'>Matching rules</h2>
				{matchingRules.map((rule, index) => (
					<MatchingRuleComp
						matchingRule={rule}
						key={rule.id}
						onClickDelete={handleDelete}
						onClickAdd={handleAdd}
						value={{
							...rule,
						}}
						onChange={(name, value) => {
							handleRuleChange(index, name, value);
						}}
					/>
				))}
			</div>
			<div className='bottom-actions'>
				<div className='bottom-actions__left'></div>
				<div className='bottom-actions__right'>
					<Button variant='outlined' size='small' onClick={handleCancel}>
						Cancel
					</Button>
					<Button
						className='bottom-actions__save'
						onClick={handleSave}
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
