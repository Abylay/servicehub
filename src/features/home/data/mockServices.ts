import type {ImageSourcePropType} from "react-native";

export type Service = {
    id: string;
    title: string;
    category: string;
    provider: string;
    rating: number;
    reviewCount: number;
    price: number;
    duration: number;
    image: ImageSourcePropType;
};

export const mockServices: Service[] = [
    {
        id: "service-1",
        title: "Professional Haircut",
        category: "beauty",
        provider: "Alex Morgan",
        rating: 4.9,
        reviewCount: 120,
        price: 35,
        duration: 45,
        image: require("@/assets/images/services/haircut.jpg"),
    },
    {
        id: "service-2",
        title: "Personal Training",
        category: "fitness",
        provider: "Sarah Wilson",
        rating: 4.8,
        reviewCount: 86,
        price: 45,
        duration: 60,
        image: require("../../../../assets/images/services/fitness.jpg"),
    },
    {
        id: "service-3",
        title: "Car Detailing",
        category: "auto",
        provider: "Michael Brown",
        rating: 4.9,
        reviewCount: 94,
        price: 60,
        duration: 120,
        image: require("@/assets/images/services/car-detailing.jpg"),
    },
    {
        id: "service-4",
        title: "Home Cleaning",
        category: "home",
        provider: "Emma Davis",
        rating: 4.7,
        reviewCount: 75,
        price: 50,
        duration: 90,
        image: require("../../../../assets/images/services/home-cleaning.jpg"),
    },
    {
        id: "service-5",
        title: "English Tutoring",
        category: "education",
        provider: "James Wilson",
        rating: 4.9,
        reviewCount: 63,
        price: 25,
        duration: 60,
        image: require("../../../../assets/images/services/tutoring.jpg"),
    },
    {
        id: "service-6",
        title: "Logo Design",
        category: "creative",
        provider: "Olivia Taylor",
        rating: 5.0,
        reviewCount: 42,
        price: 80,
        duration: 120,
        image: require("../../../../assets/images/services/logo-design.jpg"),
    },
];
