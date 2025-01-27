import React, { useState, useEffect } from "react";
import "./Conversation.css";
import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";

function ChatPage({ user }) {
  const [typedMessage, setTypedMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const senderId = "667976aa29428f5d4f02f79c";
  const receiverId = user._id;

  useEffect(() => {
    fetch(
      `http://192.168.1.46:3007/api/chats/getMessages?senderId=${senderId}&receiverId=${receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to fetch messages");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched messages:", data);
        const updatedMessages = data.data.map((msg) => ({
          ...msg,
          type: msg.sender._id === senderId ? "send" : "received",
        }));
        setMessages(updatedMessages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [receiverId, senderId]);

  const sendMessage = () => {
    if (typedMessage.trim() === "") return;

    const newMessage = { text: typedMessage, type: "send" };
    setMessages([...messages, newMessage]);
    setTypedMessage("");

    fetch("http://192.168.1.46:3007/api/chats/sendMessage", {
      method: "POST",
      body: JSON.stringify({
        senderId,
        receiverId,
        message: typedMessage,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Message sent:", data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-header-left">
          <Avatar />
          <div className="chat-header-info">
            <h3>{user.username}</h3>
            <p>Online</p>
          </div>
        </div>
        <div className="chat-header-right">
          <SearchIcon className="chat-icon" />
          <MoreVertIcon className="chat-icon" />
        </div>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <p>{msg.text}</p>
            <span className="message-time">
              {new Date(user.timestamp).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <EmojiEmotionsIcon className="chat-icon" />
        <AttachFileIcon className="chat-icon" />
        <input
          type="text"
          placeholder="Type a message"
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="chat-input"
        />
        <MicIcon className="chat-icon" />
        <SendIcon className="chat-icon" onClick={sendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
