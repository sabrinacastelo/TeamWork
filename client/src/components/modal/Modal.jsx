import React from 'react';
import { Link } from 'react-router-dom';
import './modal.css';
import CloseIcon from '@mui/icons-material/Close';

function Modal({ searchResults, closeModal }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="modal">
            <button className='close' onClick={closeModal}><CloseIcon/></button>
            {searchResults.map(user => (
                <div className='modal-content' key={user.id}>
                    <Link to={`/profile/${user.username}`}>
                        <img className='Img' src={ user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"} alt={user.username} />
                        <h2>{user.username}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Modal;