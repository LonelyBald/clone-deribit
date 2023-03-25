import React, { useEffect } from "react";
import { Layout } from "./components/Layout";
import {
  onClose,
  onMessage,
  onOpen,
  setWS,
} from "./deribitClient";

function App() {
  useEffect(() => {

    const ws = new WebSocket("wss://test.deribit.com/ws/api/v2");
    const setWebsocket = setWS
    setWebsocket(ws)
    ws.onmessage = onMessage
    ws.onopen = onOpen
    ws.onclose = onClose

  }, []);

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
