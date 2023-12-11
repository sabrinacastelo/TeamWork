import "./sidebar.css";
import RssFeed from "@mui/icons-material/Feed"
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import Chat from  "@mui/icons-material/Chat"
// import Group from  "@mui/icons-material/Group"
// import CloseFriend from "../closeFriend/CloseFriend";
import SmartToyIcon from '@mui/icons-material/SmartToy';
// import { Users } from "../../dummyData";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import CloseFriend from "../closeFriend/CloseFriend";


export default function Sidebar() {
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" style={{ textDecoration: "none", color: "black", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/messenger" style={{ textDecoration: "none", color: "black", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <ChatIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Conversas</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <NotificationsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Notificações</span>
          </li>
          <li className="sidebarListItem">
            <Link to="/toys" style={{ textDecoration: "none", color: "black", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <SmartToyIcon className="sidebarIcon" />
              <span className="sidebarListItemText">ChatBot</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <PersonIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Perfil</span>
            </Link>
          </li>
          {location.pathname !== `/profile/${user.username}` && (
            <li className="sidebarListItem" onClick={logout}
              style={{ textDecoration: "none", fontWeight: "bold", color: "white", display: "flex", justifyContent: "center", alignItems: "center", height: "35px", backgroundColor: "#ee6065", borderRadius: "5px", cursor: "pointer", fontSize: "18px" }}
            >
          Sair
        </li>
          )}
      </ul>
      {/* <button className="sidebarButton">Show More</button> */}
      <hr className="sidebarHr" />
      <ul className="sidebarFriendList">
          <CloseFriend />
        </ul>
    </div>
    </div >
  );
}