import Elysia from "elysia";


export default new Elysia()
    // Get File
    .get('/f/:appIdentifier/:fileIdentifier', () => 'asd')
    // Get JSON (only json file)
    .get('/json/:appIdentifier/:fileIdentifier', () => 'asd')
    // Querying db (only sqlite file) experimental feature of bun
    .post('/db/:appIdentifier/:fileIdentifier', () => 'asd')
    // Get info file
    .get('/info/:appIdentifier/:fileIdentifier', () => 'asd')