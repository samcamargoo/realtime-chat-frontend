import { useState } from "react";
import { useStompClient, useSubscription } from "react-stomp-hooks";
type Message = {
  content: string;
  sender: string;
  type: string;
};
export const ChatRoom = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const stompClient = useStompClient();

  useSubscription("/topic/public", (message) => {
    const messageReceived: Message = JSON.parse(message.body);

    if (messageReceived.type === "CHAT") {
      messageReceived.content =
        messageReceived.sender + " disse: " + messageReceived.content;
    }
    switch (messageReceived.type) {
      case "LEAVE":
        messageReceived.content = messageReceived.sender + " saiu";
        break;
      case "JOIN":
        messageReceived.content = messageReceived.sender + " entrou";
        break;
    }

    setMessages((prevState) => [...prevState, messageReceived]);
  });

  const sendMessage = () => {
    const message: Message = {
      content: newMessage,
      sender: username,
      type: "CHAT",
    };

    if (stompClient) {
      //Send Message
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(message),
      });
    }
    setNewMessage("");
  };

  const connectToRoom = () => {
    const user = {
      sender: username,
      type: "JOIN",
    };
    stompClient?.publish({
      destination: "/app/chat.addUser",
      body: JSON.stringify(user),
    });
    setShowChat(true);
  };

  return (
    <>
      {!showChat && (
        <div>
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={connectToRoom}>Entrar</button>
        </div>
      )}
      {showChat && (
        <>
          <div>
            {messages.map((message) => (
              <p>{message.content}</p>
            ))}
          </div>
          <input
            placeholder="enviar msg"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button onClick={sendMessage}>enviar</button>
        </>
      )}
    </>
  );
};
