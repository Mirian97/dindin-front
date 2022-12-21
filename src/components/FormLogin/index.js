import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { messageError } from "../../utils/messages";
import { getItem, setItem } from "../../utils/storage";
import Input from "../Input";

function FormLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        getItem("token") && navigate("/main");
    }, [navigate])

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!form.email || !form.password) {
                messageError("Todos os campos precisam estar preenchidos!");
                return;
            }
            const response = await api.post("/login", {
                email: form.email,
                senha: form.password
            })
            const { usuario, token } = response.data;
            setItem("token", token);
            setItem("userId", usuario.id);
            setItem("userName", usuario.nome);
            handleClearForm();
            navigate("/main");

        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    function handleClearForm() {
        setForm({
            email: "",
            password: ""
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <h4 className="color-purple-primary">Login</h4>
            <div className="inputs-login flex-column">
                <Input
                    textLabel="E-mail"
                    name="email"
                    type="email"
                    value={form.email}
                    form={form}
                    setForm={setForm}
                />
                <Input
                    textLabel="Senha"
                    name="password"
                    type="password"
                    value={form.password}
                    form={form}
                    setForm={setForm}
                />
            </div>
            <button className="btn-primary-purple" >
                Entrar
            </button>
        </form>
    )
}

export default FormLogin;