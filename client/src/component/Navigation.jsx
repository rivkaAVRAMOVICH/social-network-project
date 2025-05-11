import React, { useEffect, useState, useContext } from 'react';
import { CurrentUser } from './App';
import { Link, Outlet } from "react-router-dom";
import Info from "./Info";
import "../css/Navigation.css";

function Navigation() {
    const [toShowInfo, setToShowInfo] = useState(false);
    const { currentUser, setCurrentUser } = useContext(CurrentUser);

    const logout = () => {
        setCurrentUser(null);
        localStorage.setItem("currentUser", null);
    };

    const showInfo = () => {
        setToShowInfo(!toShowInfo);
    };

    const closeInfo = () => {
        setToShowInfo(false);
    };

    useEffect(() => {
        if (toShowInfo) setToShowInfo(false);
    }, [location.pathname]);

    return (
        <>
            {currentUser && (
                <>
                    <nav className="navigation-bar">
                        <div className="nav-links">
                            <Link to={`/users/${currentUser.id}/home`} className="nav-link">Home</Link>
                            <Link to={`/users/${currentUser.id}/albums`} className="nav-link">Albums</Link>
                            <Link to={`/users/${currentUser.id}/posts`} className="nav-link">Posts</Link>
                            <Link to={`/users/${currentUser.id}/todos`} className="nav-link">Todos</Link>
                            <button className="info-btn" onClick={showInfo}>Info</button>
                            <Link to="/" onClick={logout} className="nav-link">Logout</Link>
                        </div>
                        <div className="nav-right">
                            <span className='hello-name'>Hello {currentUser.name}</span>
                        </div>
                    </nav>

                    {toShowInfo && (
                        <div className="modal-info">
                            <div className="modal-content-info">
                                <button className="close-button" onClick={closeInfo}>X</button>
                                <Info />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Navigation;