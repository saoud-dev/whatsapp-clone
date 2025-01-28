import React from "react";
import "./SideBar.css";
import Badge from "@mui/material/Badge";
import ChatIcon from "@mui/icons-material/Chat";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import GroupsIcon from "@mui/icons-material/Groups";
import CampaignIcon from "@mui/icons-material/Campaign";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Avatar } from "@mui/material";

function SideBar() {
  return (
    <div className="main-left">
      <div className="top-icon">
        <Badge badgeContent={3} color="primary">
          <ChatIcon className="icon" />
        </Badge>
        <AutoModeIcon className="icon" />
        <CampaignIcon className="icon" />
        <GroupsIcon className="icon" />
        <AutoAwesomeIcon className="icon" />
      </div>

      <div className="bottom-icon">
        <SettingsOutlinedIcon className="icon" />
        <Avatar src="https://i.pravatar.cc/300" />
      </div>
    </div>
  );
}

export default SideBar;
