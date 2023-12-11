import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ajuste o caminho de importação conforme necessário

export function useLogout() {
    const { dispatch } = useContext(AuthContext);

    return () => {
        dispatch({ type: "LOGOUT" });

        // Se você estiver usando um token de autenticação, você também pode querer removê-lo
        // localStorage.removeItem("authToken");
    };
}