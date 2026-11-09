import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { darkTheme, lightTheme, type AppTheme } from "./themes";

type ThemeMode = "dark" | "light";

type ThemeContextValue = {
    theme: AppTheme;
    mode: ThemeMode;
    toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "servicehub_theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(
    undefined
);

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [mode, setMode] = useState<ThemeMode>("dark");
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);

    useEffect(() => {
        async function loadTheme() {
            try {
                const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);

                if (savedMode === "dark" || savedMode === "light") {
                    setMode(savedMode);
                }
            } catch (error) {
                console.warn("Failed to load theme:", error);
            } finally {
                setIsThemeLoaded(true);
            }
        }

        void loadTheme();
    }, []);

    const toggleTheme = async () => {
        const nextMode = mode === "dark" ? "light" : "dark";

        setMode(nextMode);

        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
        } catch (error) {
            console.warn("Failed to save theme:", error);
        }
    };

    const theme = mode === "dark" ? darkTheme : lightTheme;

    if (!isThemeLoaded) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}