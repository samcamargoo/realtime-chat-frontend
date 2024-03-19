import { StompSessionProvider } from "react-stomp-hooks";

import "./App.css";

import { ChatRoom } from "./components/ChatRoom";

function App() {
  return (
    <StompSessionProvider
      url={"https://realtime-chat-production-8ad5.up.railway.app/ws"}
      debug={(str) => {
        console.log(str);
      }}
    >
      <ChatRoom />
    </StompSessionProvider>
  );
}

export default App;
