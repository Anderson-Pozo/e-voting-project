import { createContext } from "react"

export interface User {
    id:        string;
    fullname:  string;
    roles:     string[];
    isActive:  boolean;
    email:     null;
    createdAt: Date;
    updatedAt: Date;
}

interface ContextProps {
    login: (username: string, password: string) => Promise<boolean>,
    logout: () => void,
    isLoggedIn: boolean,
    user: User | undefined
}

export const AuthContext = createContext({} as ContextProps);