import { cron } from '@elysiajs/cron';
import Elysia from 'elysia';
import { deleteExpiredTicket } from '@/actions/ticket';

export default () => {
    if (process.env.NODE_ENV === 'development') {
        console.info('\x1b[36m%s\x1b[0m', '\n 🔹Disable cron during developement.')
        return new Elysia();
    }
    
    return new Elysia()
        .use(cron({
            name: 'heartbeat',
            pattern: '*/10 * * * * *',
            async run() {
                await deleteExpiredTicket();
                console.log(new Date().toLocaleTimeString());
            }
        }))
}