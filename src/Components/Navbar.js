import React from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { useAuth } from "../Api/AuthContext";

function Navbar() {
    const { isAuthenticated } = useAuth(); 
    return (
        <header>
            <h1>Beta</h1>
            <nav>

                {isAuthenticated ? (
                    <div>
                        <Link to="challenges/">challenges</Link>
                        <LogoutButton />

                    </div>
                ) : (
                    <div>

                        <Link to="/login">Iniciar Sesión</Link> 
                        <Link to="/register">Register</Link> 
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Navbar;
