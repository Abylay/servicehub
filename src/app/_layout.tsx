import { Stack } from "expo-router";
import { ThemeProvider } from "@/theme";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="provider/[id]" />
                <Stack.Screen name="booking/index" />
            </Stack>
        </ThemeProvider>
    );
}