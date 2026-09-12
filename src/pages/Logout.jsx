import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contextApi/AuthContext';
import apiClient from '../ApiClient/interceptor';

const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const handleLogout = async () => {
        try {
            await apiClient.post("/user/logout");
            setUser(null);
            alert("logout successful");
            navigate("/login");
        } catch (error) {
            console.log("Logout error:", error);

            alert(
                error.response?.data?.message ||
                "Logout failed"
            );

        }
    }
    return (
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Logout;
