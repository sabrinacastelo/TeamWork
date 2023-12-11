import React, { useState } from 'react';
import api from "../../service/api";
import Modal from "../modal/Modal";
import SearchIcon from '@mui/icons-material/Search';
import "./search.css";

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await api.get("/search", {
                params: {
                    term: searchTerm
                }
            });
            if (res.data.length === 0) {
                alert('Nenhum usuário encontrado');
            } else {
                setSearchResults(res.data);
                setShowModal(true);
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
            } else {
                console.error(err);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit} className='topbarCenter'>
                <div className="searchbar">
                    <input type="text" value={searchTerm} onChange={handleSearchChange} className='searchInput' />
                    <button type="submit" className='searchButton'>
                        <SearchIcon style={{color: "#db55be"}} />
                    </button>
                </div>
            </form>
            {showModal && <Modal searchResults={searchResults} closeModal={closeModal} />}
        </div>
    );
}

export default Search;