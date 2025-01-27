import React from "react";
import "./Middle.css";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import UnknowMsg from "./unknowMsg";

function Middle({ onClickMessage }) {
  return (
    <div className="main-middle">
      <div className="top-sticky">
        <div className="chat-name">
          <div className="chats">Chats</div>
          <div className="chats-icon">
            <AddCommentIcon />
            <MoreVertIcon />
          </div>
        </div>

        <div className="chat-input">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        <div className="msg-cate">
          <div className="msg-name">All</div>
          <div className="msg-name">Unread</div>
          <div className="msg-name">Favorites</div>
          <div className="msg-name">Groups</div>
        </div>
      </div>

      <div className="msg-section">
        <UnknowMsg onClick={onClickMessage} />
      </div>
    </div>
  );
}

export default Middle;
