import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import env from '@/env';

// NOTE: in future u must move this to helper, bcs it's not action
export const connect = async () => {
	const client = new TelegramClient(
		new StringSession(env.DEFAULT_SESSION),
		parseInt(env.API_ID),
		env.API_HASH,
		{ connectionRetries: 5 }
	);

	await client.connect();

	return client;
};
