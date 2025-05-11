import React, { useContext } from 'react';
import { CurrentUser } from './App';
import '../css/Home.css';

function Home() {
    const { currentUser } = useContext(CurrentUser);

    return (
        <div className="home-container">
            <div className="background-overlay">
                <header className="home-header">
                    {currentUser && <h1>Welcome, {currentUser.name}!</h1>}
                    <p>Your hub for managing tasks, sharing posts, and organizing photo albums.</p>
                </header>
                <section className="home-content">
                    <div className="home-card">
                        <h2>Posts</h2>
                        <p>Share your thoughts, ideas, and updates with your friends and family.</p>
                    </div>
                    <div className="home-card">
                        <h2>Task Lists</h2>
                        <p>Keep track of your to-dos and never miss a deadline.</p>
                    </div>
                    <div className="home-card">
                        <h2>Photo Albums</h2>
                        <p>Organize your memories into beautiful and accessible photo collections.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
