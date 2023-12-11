import { useRef } from "react";
import "./register.css";
import { useNavigate, Link } from "react-router-dom";

import api from "../../service/api"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("As senhas não correspondem!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await api.post("auth/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <img src="/assets/teamwork-logo.png" alt="" className="imgLogo" />
                    <h3 className="loginLogo">TeamWork</h3>
                    <span className="loginDesc">
                        Conheça nossos projetos sociais e faça parte da nossa equipe!
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Nome de usuário"
                            required
                            ref={username}
                            className="loginInput"
                        />
                        <input
                            placeholder="Email"
                            required
                            ref={email}
                            className="loginInput"
                            type="email"
                        />
                        <input
                            placeholder="Senha"
                            required
                            ref={password}
                            className="loginInput"
                            type="password"
                            minLength="6"
                            autoComplete="off"
                        />
                        <input
                            placeholder="Digite sua senha novamente"
                            required
                            ref={passwordAgain}
                            className="loginInput"
                            type="password"
                        />
                        <button className="loginButton" type="submit">
                            Cadastrar
                        </button>
                        <Link to="/login" className="loginRegisterButton">Entre na sua conta</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}