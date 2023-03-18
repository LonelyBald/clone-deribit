import React, { useEffect } from "react";
import { Layout } from "./components/Layout";
const arr: string[] = [];
function App() {
  useEffect(() => {
    const msg = {
      jsonrpc: "2.0",
      id: 3600,
      method: "public/subscribe",
      params: {
        channels: ["deribit_price_index.btc_usd"],
      },
    };
    const ws = new WebSocket("wss://test.deribit.com/ws/api/v2");
    ws.onmessage = function (e) {
      // do something with the response...
      arr.push("test");
      // @ts-ignore
      console.log(arr);
      console.log("received from server : ", JSON.parse(e.data));
    };
    ws.onopen = function () {
      ws.send(JSON.stringify(msg));
    };
  }, []);

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
