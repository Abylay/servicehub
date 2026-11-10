import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

export default function TabsLayout() {
    const { theme } = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,

                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={22}
                            color={
                                focused
                                    ? theme.colors.primary
                                    : theme.colors.textSecondary
                            }
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarLabel: "Search",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "search" : "search-outline"}
                            size={22}
                            color={
                                focused
                                    ? theme.colors.primary
                                    : theme.colors.textSecondary
                            }
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    tabBarLabel: "Favorites",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "heart" : "heart-outline"}
                            size={22}
                            color={
                                focused
                                    ? theme.colors.primary
                                    : theme.colors.textSecondary
                            }
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="bookings"
                options={{
                    title: "Bookings",
                    tabBarLabel: "Bookings",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "calendar" : "calendar-outline"}
                            size={22}
                            color={
                                focused
                                    ? theme.colors.primary
                                    : theme.colors.textSecondary
                            }
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={22}
                            color={
                                focused
                                    ? theme.colors.primary
                                    : theme.colors.textSecondary
                            }
                        />
                    ),
                }}
            />
        </Tabs>
    );
}