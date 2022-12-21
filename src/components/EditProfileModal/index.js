import closeIcon from "../../assets/black-close-icon.svg";
import api from "../../services/api";
import { messageError, messageSucess } from "../../utils/messages";
import { getItem, setItem } from "../../utils/storage";
import Input from "../Input";
import "./style.css";

function EditProfileModal({
    openEditProfileModal,
    setOpenEditProfileModal,
    profileForm,
    setProfileForm
}) {

    async function handleSubmit(e) {
        e.preventDefault()

        if (!profileForm.name || !profileForm.email || !profileForm.password || !profileForm.repeatPassword) {
            messageError("Todos os campos precisam estar preenchidos!");
            return;
        }
        if (profileForm.password !== profileForm.repeatPassword) {
            messageError("As senhas precisam ser iguais");
            return;
        }
        try {
            await api.put("/usuario", {
                nome: profileForm.name,
                email: profileForm.email,
                senha: profileForm.password
            }, {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            messageSucess("Perfil atualizado com sucesso!");

            setProfileForm({
                ...profileForm,
                password: "",
                repeatPassword: ""
            })
            setItem("userName", profileForm.name);
            setOpenEditProfileModal(false);

        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }
    return (
        <>
            {openEditProfileModal &&
                <div className="container-modal flex-row align-center justify-center">
                    <form
                        className="edit-profile-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex-row align-center justify-between">
                            <h2>Editar Perfil</h2>
                            <img
                                className="close-icon"
                                src={closeIcon}
                                alt="Fechar Modal"
                                onClick={() => setOpenEditProfileModal(false)}
                            />
                        </div>
                        <div className="inputs-modal flex-column">
                            <Input
                                textLabel="Nome"
                                name="name"
                                type="text"
                                value={profileForm.name}
                                form={profileForm}
                                setForm={setProfileForm}
                            />
                            <Input
                                textLabel="E-mail"
                                name="email"
                                type="email"
                                value={profileForm.email}
                                form={profileForm}
                                setForm={setProfileForm}
                            />
                            <Input
                                textLabel="Senha"
                                name="password"
                                type="password"
                                value={profileForm.password}
                                form={profileForm}
                                setForm={setProfileForm}
                            />
                            <Input
                                textLabel="Confirmação de senha"
                                name="repeatPassword"
                                type="password"
                                value={profileForm.repeatPassword}
                                form={profileForm}
                                setForm={setProfileForm}
                            />
                        </div>
                        <button className="btn-primary-purple btn-main-modal">
                            Confirmar
                        </button>
                    </form>
                </div>
            }
        </>
    )
}

export default EditProfileModal;