import { createTicket as create } from '@/actions/ticket';
import { prisma, prismaExclude } from '@/helpers';
import { type Context } from 'elysia';

export const getTicket = async ({ query }: Context) => {
	const application = await prisma.application.findFirst({
		where: {
			publicKey: query.key ?? 'default'
		}
	});

	if (application) {
		return {
			ticket: await create(application.id),
			application: prismaExclude(application, ['secretKey', 'publicKey', 'teleGroupId'])
		};
	} else {
		throw new Error('Application not Found');
	}
};

interface RequestFileHandler extends Context {
	body: {
		content: string,
		permission: 'public' | 'private',
		id: string,
	}, 
}

export const storeFile = async ({ body, headers }: RequestFileHandler) => {
	const isJson = headers['content-type'] === 'application/json';

	const permission: string = body.permission ?? 'public';
	const id: string = body.permission ?? 'file';
	const path: string = 'tmp/';
	if (isJson || typeof body.content === 'string') {
		let content: string | null = null;
		let extension = 'json'
		try {
			content = JSON.stringify(JSON.parse(body.content))
		} catch (error) {
			content = body.content
			extension = 'txt'
		}
		await Bun.write(`${path}${id}.${extension}`, content);
	} else {
		const path = 'tmp/file.mp4';
		await Bun.write(path, body.content);
	}

	return {
		file: {
			permission,
			created_at: null,
			updated_at: null,
		}
	};
};

export const updateFile = async () => {
	return null;
};

export const deleteFile = async () => {
	return null;
};
