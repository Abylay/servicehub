
export type BookingStatus =
    | "upcoming"
    | "completed"
    | "cancelled";

export type Booking = {
    id: string;

    providerId: string;
    serviceId: string;

    serviceTitle: string;
    providerName: string;

    date: string;
    time: string;

    price: number;
    duration: number;

    status: BookingStatus;

    createdAt: string;
};
