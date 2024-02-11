import Elysia from "elysia";
import { deleteFile, getTicket, storeFile, updateFile } from '@/handlers/BasicHandler';

export default new Elysia({ prefix: 'api' })
    .get('/ticket', getTicket)
    .post('/store', storeFile)
    .post('/update/:identifier', updateFile)
    .delete('/delete/:identifier', deleteFile)
    .group('/api', (route) =>
        route
    )