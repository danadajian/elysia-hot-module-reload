# elysia-hot-module-reload

An [Elysia](https://elysiajs.com/) plugin that enables hot module reloading in the browser for local development!

## Basic Usage With React

```tsx
import Elysia from "elysia";
import { hotModuleReload, HotModuleReload } from "elysia-hot-module-reload";
import { renderToReadableStream } from "react-dom/server";

function App() {
  return <div>Hello world!</div>;
}

const app = new Elysia()
  .get("*", async (context) => {
    const stream = await renderToReadableStream(
      <>
        <App />
        <HotModuleReload />
      </>,
    );
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .use(hotModuleReload())
  .listen(3000);

console.info(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
```

### Custom Websocket Path

```tsx
import Elysia from "elysia";
import { hotModuleReload, HotModuleReload } from "elysia-hot-module-reload";
import { renderToReadableStream } from "react-dom/server";

function App() {
  return <div>Hello world!</div>;
}

const customWebSocketPath = "my-custom-path";

const app = new Elysia()
  .get("*", async (context) => {
    const stream = await renderToReadableStream(
      <>
        <App />
        <HotModuleReload webSocketPath={customWebSocketPath} />
      </>,
    );
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .use(hotModuleReload({ webSocketPath: customWebSocketPath }))
  .listen(3000);

console.info(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
```

[Example usage with React + SSR!](https://github.com/danadajian/elysia-hot-module-reload/blob/main/example/server.tsx)
