import { Stack } from "expo-router";
import { ThemeProvider } from "@/theme";
import {BookingsProvider} from "@/features/bookings/BookingsContext";
import { UserProvider } from "@/features/user/UserContext";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <BookingsProvider>
                <UserProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(auth)" />
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="provider/[id]" />
                        <Stack.Screen name="booking/index" />
                        <Stack.Screen name="booking/confirmation" />
                    </Stack>
                </UserProvider>
            </BookingsProvider>
        </ThemeProvider>
    );
}