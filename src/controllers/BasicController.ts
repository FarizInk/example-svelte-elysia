import { createTicket as create } from "@/actions/ticket";
import { prisma, prismaExclude } from "@/helpers";

export const getTicket = async ({ query }) => {
  const application = await prisma.application.findFirst({
    where: {
      publicKey: query.key ?? 'default',
    }
  })

  if (application) {
    return {
      ticket: await create(application.id),
      application: prismaExclude(application, ['secretKey', 'publicKey', 'teleGroupId']),
    };
  } else {
    throw new Error('Application not Found')
  }
};

export const storeFile = async ({ body }) => {
  // const isJson = headers['content-type'] === 'application/json'
  console.log(body)

  const path = "tmp/file.txt";
  await Bun.write(path, "Lorem ipsum");

  return {
    file: null,
  };
};

export const updateFile = async ({params, body}) => {

  console.log(params, body)
  return null;
};

export const deleteFile = async () => {
  return null;
};