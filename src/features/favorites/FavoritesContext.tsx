
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

type FavoritesContextType = {
    favoriteIds: string[];
    toggleFavorite: (serviceId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

type FavoritesProviderProps = {
    children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    const toggleFavorite = (serviceId: string) => {
        setFavoriteIds((currentIds) => {
            if (currentIds.includes(serviceId)) {
                return currentIds.filter((id) => id !== serviceId);
            }

            return [...currentIds, serviceId];
        });
    };

    return (
        <FavoritesContext.Provider
            value={{ favoriteIds, toggleFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites must be used within FavoritesProvider"
        );
    }

    return context;
}
