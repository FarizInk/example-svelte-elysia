const {
	JWT_SECRET,
	DATABASE_URL,
	API_ID,
	API_HASH,
	EMAIL,
	NAME,
	PASSWORD,
	DEFAULT_SESSION,
	DEFAULT_GROUP_ID,
	DEFAULT_SECRET_KEY,
	TMP_PATH,
	TMP_MODE,
	DOCKER_PORT,
	ORIGIN,
	PROTOCOL_HEADER,
	HOST_HEADER
} = process.env;

if (!JWT_SECRET) throw new Error('JWT_SECRET is not set');
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!API_ID) throw new Error('API_ID is not set');
if (!API_HASH) throw new Error('API_HASH is not set');
if (!EMAIL) throw new Error('EMAIL is not set');
if (!NAME) throw new Error('NAME is not set');
if (!PASSWORD) throw new Error('PASSWORD is not set');
if (!DEFAULT_SESSION) throw new Error('DEFAULT_SESSION is not set');
if (!DEFAULT_GROUP_ID) throw new Error('DEFAULT_GROUP_ID is not set');
if (!DEFAULT_SECRET_KEY) throw new Error('DEFAULT_SECRET_KEY is not set');
if (!TMP_PATH) throw new Error('TMP_PATH is not set');
if (!TMP_MODE) throw new Error('TMP_MODE is not set');
if (!DOCKER_PORT) throw new Error('DOCKER_PORT is not set');
if (!ORIGIN) throw new Error('ORIGIN is not set');
if (!PROTOCOL_HEADER) throw new Error('PROTOCOL_HEADER is not set');
if (!HOST_HEADER) throw new Error('HOST_HEADER is not set');

type Env = {
	JWT_SECRET: string;
	DATABASE_URL: string;
	API_ID: string;
	API_HASH: string;
	EMAIL: string;
	NAME: string;
	PASSWORD: string;
	DEFAULT_SESSION: string;
	DEFAULT_GROUP_ID: string | number;
	DEFAULT_SECRET_KEY: string;
	TMP_PATH: string;
	TMP_MODE: boolean | string;
	DOCKER_PORT: number | string;
	ORIGIN: string;
	PROTOCOL_HEADER: string;
	HOST_HEADER: string;
};

const env: Env = {
	JWT_SECRET,
	DATABASE_URL,
	API_ID,
	API_HASH,
	EMAIL,
	NAME,
	PASSWORD,
	DEFAULT_SESSION,
	DEFAULT_GROUP_ID,
	DEFAULT_SECRET_KEY,
	TMP_PATH,
	TMP_MODE,
	DOCKER_PORT,
	ORIGIN,
	PROTOCOL_HEADER,
	HOST_HEADER
};

export default env;
