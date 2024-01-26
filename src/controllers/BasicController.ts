import { createTicket as create } from "@/actions/ticket";

export const getTicket = async () => {
  return {
    ticket: await create(),
  };
};

export const storeFile = async () => {
  return null;
};

export const updateFile = async () => {
  return null;
};

export const deleteFile = async () => {
  return null;
};