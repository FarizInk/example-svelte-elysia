import { Elysia } from 'elysia';
import type { RequestHandler } from './$types';
import { swagger } from '@elysiajs/swagger';
import { jwt } from '@elysiajs/jwt';
import env from '@/env';
import crons from '@/crons'
import errors from '@/elysia/errors'
import basicApiRoute from '@/elysia/routes/BasicApi'
import fileRoute from '@/elysia/routes/File'

const app = new Elysia()
	.use(crons) // Cronjob functions here
	.use(swagger())
	.use(errors) // Error handlers here
	.use(
		jwt({
			name: 'jwt',
			secret: env.JWT_SECRET
		})
	)
	// Start Routing
	.use(basicApiRoute)
	.use(fileRoute)
	.compile();

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);
