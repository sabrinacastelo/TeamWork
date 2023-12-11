import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <img src="/assets/teamwork-logo.png" alt="" className="imgLogo" />
                    <h3 className="loginLogo">TeamWork</h3>
                    <span className="loginDesc">
                        Conheça nossos projetos sociais e faça parte da nossa equipe!                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Senha"
                            type="password"
                            required
                            minLength="6"
                            className="loginInput"
                            ref={password}
                        />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? (
                                <Box sx={{ display: 'flex' , justifyContent: "center"}}>
                                    <CircularProgress color="primary" size="20px" />
                                </Box>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                        <span className="loginForgot">Esqueceu a senha?</span>
                        <Link to="/register" className="loginRegisterButton">
                            {isFetching ? (
                                <Box sx={{ display: 'flex' , justifyContent: "center"}}>
                                    <CircularProgress size="20px" />
                                </Box>
                            ) : (
                                "Criar uma nova conta"
                            )}
                        </Link>
                    </form>
                </div>
            </div>
        </div >
    );
}