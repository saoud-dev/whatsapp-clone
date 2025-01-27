import React, { useState } from "react";
import SideBar from "./Components/SideBar/SideBar";
import Chats from "./Components/Chats/Chats";
import DownloadScreen from "./Components/DownloadScreen/DownloadScreen";
import Conversation from "./Components/Conversation/Conversation";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const openChatPage = (receiver) => {
    setSelectedUser(receiver);
  };

  return (
    <div className="app_body">
      <SideBar />
      <Chats onClickMessage={openChatPage} />
      {selectedUser ? (
        <Conversation receiver={selectedUser} />
      ) : (
        <DownloadScreen />
      )}
    </div>
  );
}

export default App;
