import React, { useState } from 'react';
import Conversation from '../conversations/Conversation';

function ChatMenu({ conversations }) {
    const [showModal, setShowModal] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);

    const openConversation = (conversation) => {
        setCurrentChat(conversation);
        setShowModal(true);
    };

    return (
        <div className="chatMenuWrapper">
            {conversations.map((c) => (
                <div onClick={() => openConversation(c)}>
                    <Conversation conversation={c} />
                </div>
            ))}
            {showModal && <Conversation conversation={currentChat} closeModal={() => setShowModal(false)} />}
        </div>
    );
}

export default ChatMenu;