import { ReactElement, useState } from "react"
import { useMutation } from "urql";
import { AuthContext, User } from "./AuthContext";
import Cookies  from "js-cookie";
import { LOGIN } from "graphql/mutations";

interface Props {
    children: ReactElement | ReactElement[]
}

export const AuthProvider = ({ children }: Props) => {
    const [isLoggedIn, setUserIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User>()

    const [{ fetching }, userLogin ] = useMutation(LOGIN);
    console.log({ fetching });
    
    const login = async (username: string, password: string ) => {
        
        const { data, error } = await userLogin({ loginInput: { username, password } });

        console.log({ data });

        if (error) throw new Error(error.message.replace('[GraphQL]', ''));

        if (data?.login.token){
            setUserIsLoggedIn(true);
            setUser(data?.login.user);
            Cookies.set('token', data?.login.token);
            return true
        }else{
            return false
        }
    }

    const logout = () => {
        Cookies.remove('token');
        setUserIsLoggedIn(false);
        setUser(undefined);
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                isLoggedIn,
                user
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
