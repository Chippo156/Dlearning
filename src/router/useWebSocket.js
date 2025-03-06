import { Client } from "@stomp/stompjs";
import { useEffect, useMemo } from "react";
import SockJS from "sockjs-client/dist/sockjs";

const WEBSOCKET_URL = "http://localhost:8080/ws";

export const useWebSocket = (url = WEBSOCKET_URL) => {
  const client = useMemo(
    () =>
      new Client({
        webSocketFactory: () => new SockJS(url),
        connectHeaders: {
          login: localStorage.getItem("token"),
        },
        onDisconnect: () => {
          console.log("Disconnected from the broker");
        },
      }),
    [url]
  );
  useEffect(() => {
    client.activate();
    return () => client.deactivate();
  }, [client]);
  return client;
};
