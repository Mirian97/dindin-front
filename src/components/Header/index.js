import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import logOffIcon from "../../assets/logoff-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";
import { clear, getItem } from "../../utils/storage";
import "./style.css";

function Header({ logged, setOpenEditProfileModal }) {
    const userName = getItem("userName");
    const navigate = useNavigate();

    function handleLogOffUser() {
        clear();
        navigate("/");
    }

    return (
        <header className="flex-row align-center justify-between white">
            <div
                className="header-profile flex-row"
                onClick={() => navigate("/")}
            >
                <img src={logo} alt="logo" />
                <h1>Dindin</h1>
            </div>
            {logged &&
                <div className="header-profile flex-row align-center">
                    <img
                        className="profile"
                        src={profileIcon}
                        alt="Icone de usuário"
                        onClick={() => setOpenEditProfileModal(true)}
                    />
                    <span>{userName}</span>
                    <img
                        className="logoff"
                        src={logOffIcon}
                        alt="Icone de usuário"
                        onClick={() => handleLogOffUser()}
                    />
                </div>
            }
        </header>
    )
}

export default Header;