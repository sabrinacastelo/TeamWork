import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Search from "../search/Search";

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">TeamWork</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <Search />
            </div>
            <div className="topbarRight">
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="topbarImg"
                    />
                </Link>
            </div>
        </div>
    );
}