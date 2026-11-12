
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Booking } from "./types";

const STORAGE_KEY = "@servicehub/bookings";

type BookingsContextType = {
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    updateBookingStatus: (
        bookingId: string,
        status: Booking["status"]
    ) => void;
};

const BookingContext = createContext<BookingsContextType | undefined>(
    undefined
);

type BookingsProviderProps = {
    children: ReactNode;
};

export function BookingsProvider({ children }: BookingsProviderProps) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load bookings from AsyncStorage
    useEffect(() => {
        let isMounted = true;

        const loadBookings = async () => {
            try {
                const storedBookings = await AsyncStorage.getItem(STORAGE_KEY);

                if (storedBookings && isMounted) {
                    setBookings(JSON.parse(storedBookings) as Booking[]);
                }
            } catch (error) {
                console.error("Failed to load bookings:", error);
            } finally {
                if (isMounted) {
                    setIsLoaded(true);
                }
            }
        };

        loadBookings();

        return () => {
            isMounted = false;
        };
    }, []);

    // Save bookings whenever they change
    useEffect(() => {
        if (!isLoaded) return;

        const saveBookings = async () => {
            try {
                await AsyncStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(bookings)
                );
            } catch (error) {
                console.error("Failed to save bookings:", error);
            }
        };

        saveBookings();
    }, [bookings, isLoaded]);

    // Automatically update expired bookings
    useEffect(() => {
        if (!isLoaded) return;

        const updateExpiredBookings = () => {
            const now = new Date();

            setBookings((currentBookings) =>
                currentBookings.map((booking) => {
                    if (booking.status !== "upcoming") {
                        return booking;
                    }

                    const appointmentDate = new Date(booking.date);

                    const [hours, minutes] = booking.time
                        .split(":")
                        .map(Number);

                    appointmentDate.setHours(hours, minutes, 0, 0);

                    const appointmentEnd = new Date(
                        appointmentDate.getTime() +
                        booking.duration * 60 * 1000
                    );

                    if (appointmentEnd <= now) {
                        return {
                            ...booking,
                            status: "completed",
                        };
                    }

                    return booking;
                })
            );
        };

        updateExpiredBookings();

        const interval = setInterval(
            updateExpiredBookings,
            60 * 1000
        );

        return () => clearInterval(interval);
    }, [isLoaded]);

    const addBooking = (booking: Booking) => {
        setBookings((currentBookings) => [
            booking,
            ...currentBookings,
        ]);
    };

    const updateBookingStatus = (
        bookingId: string,
        status: Booking["status"]
    ) => {
        setBookings((currentBookings) =>
            currentBookings.map((booking) =>
                booking.id === bookingId
                    ? { ...booking, status }
                    : booking
            )
        );
    };

    return (
        <BookingContext.Provider
            value={{
                bookings,
                addBooking,
                updateBookingStatus,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBookings() {
    const context = useContext(BookingContext);

    if (!context) {
        throw new Error(
            "useBookings must be used within BookingsProvider"
        );
    }

    return context;
}
