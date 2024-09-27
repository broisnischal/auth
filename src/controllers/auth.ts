import { createInsertSchema } from "drizzle-typebox";
import Elysia, { t } from "elysia";
import { user } from "../db/schema";
import { db, sqlite } from "../db";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { test } from "bun:test";

const insertUserSchema = createInsertSchema(user, {
  image: t.Required(
    t.File({
      maxSize: "2m",
    })
  ),
});

const plugin = new Elysia({ name: "plugin" }).macro(({ onBeforeHandle }) => ({
  hi(word: string) {
    onBeforeHandle(() => {
      console.log(word);
    });
  },
}));

export const auth = new Elysia({
  prefix: "/auth",
  serve: {
    maxRequestBodySize: 1024 * 1024 * 256, // 256MB
  },
})
  .use(plugin)

  // .guard({
  //   headers: t.Object({
  //     bearer: t.String({
  //       pattern: "/^Bearer .+$/",
  //     }),
  //   }),
  // })
  // .derive(({ headers }) => {
  //   const auth = headers["Authorization"];

  //   return {
  //     bearer: auth?.startsWith("Bearer ") ? auth.slice(7) : null,
  //   };
  // })
  .decorate("db", db)
  .onRequest(async (ctx) => {
    const formData = await ctx.request.formData();
    return formData.get("file");
  })
  .put(
    "/sign-up",
    ({ body, db }) => {
      const { image, ...user } = body;

      //   return db.insert(user, { schema: insertUserSchema }).then((id) => ({
      //     id,
      //     image,
      //   }));

      return new Response("Not implemented yet");
    },
    {
      body: t.Omit(insertUserSchema, ["id"]),
      type: "multipart/form-data",
      hi: "fuck",
      // beforeHandle({ set, cookie: { session }, error }) {
      //   // if (!validateSession(session.value)) return error(401);
      //   if (!session.value) return error(401);
      // },
    }
  );

// const plugin = <T extends string>(config: { prefix: T }) =>
//     new Elysia({
//         name: 'my-plugin',
//         seed: config,
//     })
//     .get(`${config.prefix}/hi`, () => 'Hi')
