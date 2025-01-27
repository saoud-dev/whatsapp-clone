import React, { useState } from "react";
import Left from "./Components/Left/Left";
import Middle from "./Components/Middle/Middle";
import Right from "./Components/Right/Right";
import ChatPage from "./Components/ChatPage/ChatPage";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const openChatPage = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="app_body">
      <Left />
      <Middle onClickMessage={openChatPage} />
      {selectedUser ? <ChatPage user={selectedUser} /> : <Right />}
    </div>
  );
}

export default App;
