import Elysia from "elysia";

const reloadMessage = "reload";
const defaultWebSocketPath = "ws";

const buildHotReloadScript = (webSocketPath: string) => `
function hotReload() {
  const socket = new WebSocket("ws://" + location.host + "/${webSocketPath}");
  socket.onmessage = (message) => {
    if (message.data === "${reloadMessage}") {
      location.reload()
    }
  };
  console.log('Hot reload enabled.');
}
hotReload();
`;

export const HotModuleReload = ({
  webSocketPath = defaultWebSocketPath,
} = {}) => (
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: buildHotReloadScript(webSocketPath),
    }}
  />
);

declare global {
  var ws: typeof Elysia.arguments;
}

export const hotModuleReload = ({
  webSocketPath = defaultWebSocketPath,
} = {}) => {
  global.ws?.send(reloadMessage);

  return new Elysia({
    name: "elysia-hmr",
  }).ws(`/${webSocketPath}`, {
    open: (ws) => {
      global.ws = ws;
    },
  });
};
