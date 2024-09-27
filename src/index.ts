import { Elysia } from "elysia";
import { db } from "./db";
import { auth } from "./controllers/auth";

const app = new Elysia()
  .decorate("db", db)
  .get("/hi", () => "hello")
  .get("/wild/*", ({ params }) => {
    return {
      message: "Hello, world!",
      value: params["*"],
    };
  })
  .use(auth)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// app.handle(new Request("http://localhost/")).then(console.log);
