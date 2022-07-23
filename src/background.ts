import {
	initGroupsConfigValue,
	startWatchingGroupsConfig,
} from './services/groupConfigurations';

async function bootstrap() {
	const data = await initGroupsConfigValue();
	startWatchingGroupsConfig((newValue, oldValue) => {
		console.log(newValue, oldValue);
	});
}

bootstrap();
