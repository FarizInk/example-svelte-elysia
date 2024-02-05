import { Elysia } from "elysia";
import type { RequestHandler } from "./$types";
import { swagger } from "@elysiajs/swagger";
import { cron } from "@elysiajs/cron";
import { deleteExpiredTicket } from "@/actions/ticket";
import { jwt } from "@elysiajs/jwt";
import { AuthenticationError } from "@/exceptions/AuthenticationError";
import { AuthorizationError } from "@/exceptions/AuthorizationError";
import { InvariantError } from "@/exceptions/InvariantError";
import {
  deleteFile,
  getTicket,
  storeFile,
  updateFile,
} from "@/controllers/BasicController";

const app = new Elysia({ prefix: '/api' })
  .use(
    cron({
      name: "heartbeat",
      pattern: "*/10 * * * * *",
      async run() {
        await deleteExpiredTicket();
        console.log((new Date()).toLocaleTimeString());
      },
    }),
  )
  .use(swagger())
  .error("AUTHENTICATION_ERROR", AuthenticationError)
  .error("AUTHORIZATION_ERROR", AuthorizationError)
  .error("INVARIANT_ERROR", InvariantError)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "AUTHENTICATION_ERROR":
        set.status = 401;
        return {
          status: "error",
          message: error.toString().replace("Error: ", ""),
        };
      case "AUTHORIZATION_ERROR":
        set.status = 403;
        return {
          status: "error",
          message: error.toString().replace("Error: ", ""),
        };
      case "INVARIANT_ERROR":
        set.status = 400;
        return {
          status: "error",
          message: error.toString().replace("Error: ", ""),
        };
      case "NOT_FOUND":
        set.status = 404;
        return {
          status: "error",
          message: error.toString().replace("Error: ", ""),
        };
      case "INTERNAL_SERVER_ERROR":
        set.status = 500;
        return {
          status: "error",
          message: "Something went wrong!",
        };
    }
  })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET,
    }),
  )
  .get("/ticket", getTicket)
  .post("/store", storeFile)
  .post("/update/:identifier", updateFile)
  .delete("/delete/:identifier", deleteFile)
  .compile();

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);
