
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { FavoritesProvider } from "@/features/favorites/FavoritesContext";
import { useWindowDimensions } from "react-native";

export default function TabsLayout() {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const isDesktop = width >= 768;

    return (
        <FavoritesProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,

                    tabBarActiveTintColor: "#fff",
                    tabBarInactiveTintColor: theme.colors.textSecondary,

                    tabBarPosition: isDesktop ? "left" : "bottom",

                    tabBarLabelPosition: isDesktop
                        ? "beside-icon"
                        : "below-icon",

                    tabBarStyle: {
                        backgroundColor: theme.colors.surface,
                        borderTopColor: theme.colors.border,

                        ...(isDesktop
                            ? {
                                width: 220,
                                borderRightWidth: 1,
                                borderTopWidth: 0,
                                paddingTop: 24,
                            }
                            : {
                                height: 65,
                            }),
                    },

                    tabBarLabelStyle: {
                        fontSize: 13,
                        fontWeight: "600",
                    },

                    tabBarItemStyle: isDesktop
                        ? {
                            justifyContent: "flex-start",
                            paddingHorizontal: 16,
                        }
                        : undefined,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarLabel: "Home",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "home" : "home-outline"}
                                size={22}
                                color={color as string}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        tabBarLabel: "Search",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "search" : "search-outline"}
                                size={22}
                                color={color as string}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="favorites"
                    options={{
                        title: "Favorites",
                        tabBarLabel: "Favorites",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "heart" : "heart-outline"}
                                size={22}
                                color={color as string}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="bookings"
                    options={{
                        title: "Bookings",
                        tabBarLabel: "Bookings",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "calendar" : "calendar-outline"}
                                size={22}
                                color={color as string}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "person" : "person-outline"}
                                size={22}
                                color={color as string}
                            />
                        ),
                    }}
                />
            </Tabs>
        </FavoritesProvider>
    );
}