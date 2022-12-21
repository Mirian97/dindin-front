import FormSignUp from "../../components/FormSignUp";
import Header from "../../components/Header";
import "./style.css";

function SignUp() {
    return (
        <div className="container">
            <Header />
            <div className="content-sign-up flex-row justify-center">
                <FormSignUp />
            </div>
        </div>
    )
}

export default SignUp;