import Elysia from "elysia";
import { hotModuleReload, HotModuleReload } from "elysia-hot-module-reload";
import { renderToReadableStream } from "react-dom/server";
import { App } from "./app";
import { staticPlugin } from "@elysiajs/static";

await Bun.build({
  entrypoints: ["./example/client.tsx"],
  outdir: "./public",
});

const app = new Elysia()
  .get("*", async () => {
    const stream = await renderToReadableStream(
      <>
        <App />
        <HotModuleReload />
      </>,
      {
        bootstrapScripts: ["/public/client.js"],
      },
    );
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .use(hotModuleReload())
  .use(staticPlugin())
  .listen(3000);

console.info(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
