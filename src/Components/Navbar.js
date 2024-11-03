import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

function Navbar (){
    return(
        <header>
            <h1>Beta</h1>
            <nav>
                <Link to="challenges/">challenges</Link>   
                <LogoutButton/>
            </nav>
        </header>
    );
};

export default Navbar;