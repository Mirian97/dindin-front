import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/FormLogin";
import Header from "../../components/Header";
import "./style.css";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="container white">
            <Header />
            <div className="content-login flex-row align-center justify-center">
                <main>
                    <h1>
                        Controle suas <span className="color-purple-primary">finanças</span>,
                        <br />
                        sem planilha chata.
                    </h1>
                    <p>
                        Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.
                    </p>
                    <button
                        className="btn-primary-purple btn-login"
                        onClick={() => navigate("/sign-up")}
                    >
                        Cadastre-se
                    </button>
                </main>
                <FormLogin />
            </div>
        </div>
    )
}

export default Login;