import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import "./Messages.css";

function UnknowMsg({ onClick }) {
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    fetch(
      "http://192.168.1.46:3007/api/conversations/667976aa29428f5d4f02f79c",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("UnknowMsg:", data);
        setReceivers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, []);

  return (
    <>
      {receivers.map((receiver) => (
        <div
          key={receiver._id}
          className="msg-container"
          onClick={() => onClick(receiver)}
        >
          <div className="msg-img">
            <Avatar />
          </div>
          <div className="flex">
            <div className="msg-del">
              <h5>{receiver.username}</h5>
              <h6>{receiver.lastMessage}</h6>
            </div>
            <div className="time">
              <span className="times">
                {new Date(receiver.timestamp).toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
              <div className="unread">
                <span className="unread-msg">1</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default UnknowMsg;
