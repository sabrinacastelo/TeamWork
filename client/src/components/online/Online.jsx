import ChatOnline from "../chatOnline/chatOnline";
import "./online.css";
import { io } from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Online() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getUsers", (users) => {
            console.log('Usuários recebidos do servidor:', users);
            const onlineFollowings = user.followings.filter((f) => users.some((u) => u.userId === f));
            console.log('Usuários online que são seguidos pelo usuário atual:', onlineFollowings);
            setOnlineUsers(onlineFollowings);
        });
    }, [user]);

    return (
        <div className="chatOnline">
            <h4>Usuários Online</h4>
            <div className="chatOnlineWrapper">
                <ChatOnline
                    onlineUsers={onlineUsers}
                    currentId={user._id}
                />
            </div>
        </div>
    );
}