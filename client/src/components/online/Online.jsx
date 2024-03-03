import ChatOnline from "../chatOnline/chatOnline";
import "./online.css";
import { io } from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/api";

export default function Online() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const [openConversation, setConversations] = useState([]);


    useEffect(() => {
        const openConversation = async () => {
            try {
                const res = await api.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        openConversation();
    }, [user._id]);


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getUsers", (users) => {
            const onlineFollowings = user.followings.filter((f) => users.some((u) => u.userId === f));
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
                    openConversation={openConversation} // Passando a função para abrir a conversa
                />
            </div>
        </div>
    );
}
