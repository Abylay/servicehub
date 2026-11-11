import {mockServices} from "@/features/home/data/mockServices";

export type Provider = {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviewCount: number;
    experience: number;
    location: string;
    description: string;
    completedJobs: number;
};

export const mockProviders: Provider[] = [
    {
        id: "provider-1",
        name: "Alex Morgan",
        category: "Barber",
        rating: 4.9,
        reviewCount: 120,
        experience: 8,
        location: "New York, USA",
        description: "Professional barber specializing in modern haircuts and men's grooming.",
        completedJobs: 450,
    },
    {
        id: "provider-2",
        name: "Sarah Wilson",
        category: "Personal Trainer",
        rating: 4.8,
        reviewCount: 86,
        experience: 6,
        location: "New York, USA",
        description: "Certified personal trainer helping clients achieve their fitness goals.",
        completedJobs: 320,
    },
    {
        id: "provider-3",
        name: "Michael Brown",
        category: "Auto Detailing",
        rating: 4.9,
        reviewCount: 94,
        experience: 7,
        location: "New York, USA",
        description: "Experienced auto detailing specialist focused on quality car care.",
        completedJobs: 380,
    },
    {
        id: "provider-4",
        name: "Emma Davis",
        category: "Home Cleaning",
        rating: 4.7,
        reviewCount: 75,
        experience: 5,
        location: "New York, USA",
        description: "Reliable home cleaning professional providing detailed cleaning services.",
        completedJobs: 290,
    },
    {
        id: "provider-5",
        name: "James Wilson",
        category: "English Tutor",
        rating: 4.9,
        reviewCount: 63,
        experience: 9,
        location: "New York, USA",
        description: "Experienced English tutor offering personalized lessons for different levels.",
        completedJobs: 510,
    },
    {
        id: "provider-6",
        name: "Olivia Taylor",
        category: "Graphic Designer",
        rating: 5.0,
        reviewCount: 42,
        experience: 4,
        location: "New York, USA",
        description: "Creative graphic designer specializing in branding and visual identity.",
        completedJobs: 180,
    },
];

const providers = mockProviders.find((item) => item.id === "provider-3");
console.log(providers);
const service = mockServices.filter((item) => item.providerId === "provider-3");
console.log(service);