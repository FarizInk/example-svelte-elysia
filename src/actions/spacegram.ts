import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

export const connect = async () => {
  const client = new TelegramClient(
    new StringSession(process.env.DEFAULT_SESSION),
    parseInt(process.env.API_ID),
    process.env.API_HASH,
    { connectionRetries: 5 },
  );

  await client.connect();

  return client;
};
