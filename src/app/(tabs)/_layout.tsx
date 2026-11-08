import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#6366F1",
                tabBarInactiveTintColor: "#9CA3AF"
            }}
        >
            <Tabs.Screen
                name="index"
                options={{ title: "Home", tabBarLabel: "Home" }}
            />

            <Tabs.Screen
                name="search"
                options={{ title: "Search", tabBarLabel: "Search" }}
            />

            <Tabs.Screen
                name="favorites"
                options={{ title: "Favorites", tabBarLabel: "Favorites" }}
            />

            <Tabs.Screen
                name="bookings"
                options={{ title: "Bookings", tabBarLabel: "Bookings" }}
            />

            <Tabs.Screen
                name="profile"
                options={{ title: "Profile", tabBarLabel: "Profile" }}
            />
        </Tabs>
    );
}