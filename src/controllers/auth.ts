import { createInsertSchema } from "drizzle-typebox";
import Elysia, { Static, t } from "elysia";
import { db } from "../db";
import { user } from "../db/schema";

const insertUserSchema = createInsertSchema(user, {});

export const UploadAvatarDto = t.Object({
  file: t.File({
    type: "image/*",
    maxSize: "5m",
  }),
});

export type UploadAvatarDto = Static<typeof UploadAvatarDto>;

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
  // .onRequest(async (ctx) => {
  //   const formData = await ctx.request.formData();
  //   return formData.get("file");
  // })
  .put(
    "/sign-up",
    ({ body, db }) => {
      const { file } = body;
      console.log(file);

      //   return db.insert(user, { schema: insertUserSchema }).then((id) => ({
      //     id,
      //     image,
      //   }));
    },
    {
      // body: t.Omit(insertUserSchema, ["id"]),
      body: UploadAvatarDto,
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
