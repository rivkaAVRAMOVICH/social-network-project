import React, { useContext } from 'react';
import { CurrentUser } from './App';
import '../css/Info.css';

function Info() {
    const { currentUser } = useContext(CurrentUser);
    return (
        <>
            <div className="info-details">
                <p><strong>Name:</strong> {currentUser.name}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Phone:</strong> {currentUser.phone}</p>
                <p><strong>Address:</strong> {currentUser.address}</p>
                
            </div>
        </>
    );
}

export default Info;
