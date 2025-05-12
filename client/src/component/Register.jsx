import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { CurrentUser, Error } from './App';
import { postRequest, setRefreshTokenInCookies } from '../Requests';
import '../css/Login.css';


function RegistrationPermission() {
    const { setCurrentUser } = useContext(CurrentUser);
    const { setErrorMessage } = useContext(Error);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: '',
        address: "",
        phone: '',
        password: "",
    });


    // const checkUserNameExists = async () => {
    //     const requestResult = await getRequest(`users?username=${registrationData.userName}`)
    //     if (requestResult.succeeded) {
    //         return requestResult.data.length > 0;
    //     }
    //     return true;
    // };
    const submitFullForm = async () => {
        console.log(formData);
        const requestResult = await postRequest(`register`, formData)
        if (requestResult.succeeded) {
            const { name, email, address, phone } = formData;
            localStorage.setItem("currentUser", JSON.stringify({ name, email, address, phone, id: requestResult.data.userId }));
            setCurrentUser({ name, email, address, phone, id: requestResult.data.userId });
            localStorage.setItem("token", requestResult.data.accessToken);
            setRefreshTokenInCookies(requestResult.data.refreshToken);
            navigate(`/users/${requestResult.data.userId}/home`);
        } else {
            setErrorMessage(requestResult.error)
        }

    };
    const handleFullFormSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        submitFullForm();
    };
    return (
        <>
            <div className="login-container">
                <h2>Registration</h2>
                <form className="form-container" onSubmit={handleFullFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            required
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Name:</label>
                        <input
                            required
                            type="text"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            required
                            type="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <input
                            required
                            type="address"
                            name="address"
                            className="form-input"
                            value={formData.address}
                            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone:</label>
                        <input
                            required
                            type="text"
                            name="phone"
                            className="form-input"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                    </div>
                    <button className="form-button" type="submit">Submit</button>
                </form>
                <Link to="/login">Login</Link>
            </div>

        </>
    );
}

export default RegistrationPermission;
