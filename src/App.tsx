import { StompSessionProvider } from "react-stomp-hooks";

import "./App.css";

import { ChatRoom } from "./components/ChatRoom";

function App() {
  return (
    <StompSessionProvider
      url={"https://penguin-settling-happily.ngrok-free.app/ws"}
      connectHeaders={{"ngrok-skip-browser-warning": "123"}}
      debug={(str) => {
        console.log(str);
      }}
    >
      <ChatRoom />
    </StompSessionProvider>
  );
}

export default App;
