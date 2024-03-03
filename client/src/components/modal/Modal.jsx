import React from 'react';
import { Link } from 'react-router-dom';
import './modal.css';
import CloseIcon from '@mui/icons-material/Close';

function Modal({ searchResults, closeModal }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="Modal">
            <button className='close' onClick={closeModal}><CloseIcon /></button>
            {searchResults.map(user => (
                <div className='modal-content' key={user.id}>
                    <div className="profile">
                        <Link to={`/profile/${user.username}`}>
                            <img className='Img' src={user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"} alt={user.username} />
                            <h3 className='title'>{user.username}</h3>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Modal;