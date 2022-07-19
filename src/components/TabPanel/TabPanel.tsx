import { FC, ReactNode } from 'react';

interface Props {
	currentTabIndex: number;
	tabIndex: number;
	children?: ReactNode;
}
export const TabPanel: FC<Props> = ({
	currentTabIndex,
	tabIndex,
	children,
}) => {
	return <>{currentTabIndex === tabIndex && children}</>;
};
