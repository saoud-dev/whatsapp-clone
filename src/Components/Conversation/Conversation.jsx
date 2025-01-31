// import React, { useState, useEffect, useRef } from "react";
// import "./Conversation.css";
// import { Avatar } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SearchIcon from "@mui/icons-material/Search";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import MicIcon from "@mui/icons-material/Mic";
// import SendIcon from "@mui/icons-material/Send";

// function Conversation({ user }) {
//   const [typedMessage, setTypedMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const scrollRef = useRef(null);

//   const senderId = "667976aa29428f5d4f02f79c";
//   const receiverId = user._id;

//   useEffect(() => {
//     fetch(
//       `http://192.168.1.46:3007/api/chats/getMessages?senderId=${senderId}&receiverId=${receiverId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched messages:", data);
//         const updatedMessages = data.data.map((msg) => ({
//           ...msg,
//           type: msg.sender._id === senderId ? "send" : "received",
//           timestamp: msg.createdAt,
//         }));
//         setMessages(updatedMessages);
//       })
//       .catch((error) => {
//         console.error("Error fetching messages:", error);
//       });
//   }, [receiverId, senderId]);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = () => {
//     if (typedMessage.trim() === "") return;

//     const currentTimestamp = new Date().toISOString();
//     const newMessage = {
//       text: typedMessage,
//       type: "send",
//       timestamp: currentTimestamp,
//     };
//     setMessages([...messages, newMessage]);
//     setTypedMessage("");

//     fetch("http://192.168.1.46:3007/api/chats/sendMessage", {
//       method: "POST",
//       body: JSON.stringify({
//         senderId,
//         receiverId,
//         message: typedMessage,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Message sent:", data);
//       })
//       .catch((error) => {
//         console.error("Error sending message:", error);
//       });
//   };

//   return (
//     <div className="chat-page">
//       <div className="chat-header">
//         <div className="chat-header-left">
//           <Avatar />
//           <div className="chat-header-info">
//             <h3>{user.username}</h3>
//             <p>Online</p>
//           </div>
//         </div>
//         <div className="chat-header-right">
//           <SearchIcon className="chat-icon" />
//           <MoreVertIcon className="chat-icon" />
//         </div>
//       </div>

//       {/* Chat body with ref for auto-scrolling */}
//       <div className="chat-body" ref={scrollRef}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.type}`}>
//             <p>{msg.text}</p>
//             <span className="message-time">
//               {new Date(msg.timestamp).toLocaleString("en-GB", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//               })}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="chat-footer">
//         <EmojiEmotionsIcon className="chat-icon" />
//         <AttachFileIcon className="chat-icon" />
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={typedMessage}
//           onChange={(e) => setTypedMessage(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           className="chat-input"
//         />
//         <MicIcon className="chat-icon" />
//         <SendIcon className="chat-icon" onClick={sendMessage} />
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import "./Conversation.css";
import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { useGetMessagesQuery, useSendMessageMutation } from "../Redux/apiSlice";

function Conversation({ user }) {
  const [typedMessage, setTypedMessage] = useState("");
  const [localMessages, setLocalMessages] = useState([]);
  const scrollRef = useRef(null);

  const senderId = "667976aa29428f5d4f02f79c";
  const receiverId = user._id;

  const {
    data: messages = [],
    isLoading,
    refetch,
  } = useGetMessagesQuery({
    senderId,
    receiverId,
  });

  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const handleSendMessage = () => {
    if (typedMessage.trim() === "") return;

    const newMessage = {
      senderId,
      receiverId,
      text: typedMessage,
      type: "send",
      timestamp: new Date().toISOString(),
    };

    setLocalMessages((prevMessages) => [...prevMessages, newMessage]);
    setTypedMessage("");

    sendMessage({
      senderId,
      receiverId,
      message: typedMessage,
    })
      .then((response) => {
        console.log("Message sent successfully:", response);
        refetch();
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
      <div className="chat-body" ref={scrollRef}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          localMessages.map((msg) => (
            <div key={msg.timestamp} className={`message ${msg.type}`}>
              <p>{msg.text}</p>
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="chat-footer">
        <EmojiEmotionsIcon className="chat-icon" />
        <AttachFileIcon className="chat-icon" />
        <input
          type="text"
          placeholder="Type a message"
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="chat-input"
        />
        <MicIcon className="chat-icon" />
        <SendIcon className="chat-icon" onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default Conversation;
