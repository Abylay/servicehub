
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "./types";

const USER_STORAGE_KEY = "@servicehub/user";

const initialUser: User = {
    id: "user-1",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 234 567 890",
};

type UserContextType = {
    user: User;
    updateUser: (updatedUser: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(
    undefined
);

type UserProviderProps = {
    children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>(initialUser);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load user from AsyncStorage
    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem(
                    USER_STORAGE_KEY
                );

                if (savedUser) {
                    setUser(JSON.parse(savedUser) as User);
                }
            } catch (error) {
                console.error("Failed to load user:", error);
            } finally {
                setIsLoaded(true);
            }
        };

        void loadUser();
    }, []);

    // Save user whenever data changes
    useEffect(() => {
        if (!isLoaded) return;

        const saveUser = async () => {
            try {
                await AsyncStorage.setItem(
                    USER_STORAGE_KEY,
                    JSON.stringify(user)
                );
            } catch (error) {
                console.error("Failed to save user:", error);
            }
        };

        void saveUser();
    }, [user, isLoaded]);

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    if (!isLoaded) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }

    return context;
}
