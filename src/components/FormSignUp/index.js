import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import api from "../../services/api";
import { messageError, messageSucess } from "../../utils/messages";

function FormSignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!form.name || !form.email || !form.password || !form.repeatPassword) {
                messageError("Todos os campos precisam estar preenchidos!");
                return;
            }
            if (form.password !== form.repeatPassword) {
                messageError("As senhas precisam ser iguais");
                return;
            }
            await api.post("/usuario", {
                nome: form.name,
                email: form.email,
                senha: form.password
            })

            handleClearForm();
            messageSucess("Usuário cadastrado com sucesso!");

            setTimeout(() => {
                navigate("/login");
            }, 2500);

        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    function handleClearForm() {
        setForm({
            name: "",
            email: "",
            password: "",
            repeatPassword: ""
        })
    }

    return (
        <form className="form-sign-up" onSubmit={handleSubmit}>
            <h4 className="color-purple-primary">Cadastre-se</h4>
            <div className="inputs-sign-up flex-column">
                <Input
                    textLabel="Nome"
                    name="name"
                    type="text"
                    value={form.name}
                    form={form}
                    setForm={setForm}
                />
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
                <Input
                    textLabel="Confirmação de senha"
                    name="repeatPassword"
                    type="password"
                    value={form.repeatPassword}
                    form={form}
                    setForm={setForm}
                />
            </div>
            <button className="btn-primary-purple" >
                Cadastrar
            </button>
            <span className="span-sign-up font-lato color-purple-secondary">Já tem cadastro?
                <a onClick={() => navigate("/login")}> Clique aqui!</a>
            </span>
        </form>
    )
}

export default FormSignUp;