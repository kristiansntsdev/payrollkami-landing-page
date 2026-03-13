import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Solusi penggajian otomatis untuk bisnis Indonesia — mudah, akurat, dan sesuai regulasi.",
    quickLinks: [
        {
            text: "Fitur",
            url: "#features"
        },
        {
            text: "Demo Gratis",
            url: "#demo"
        },
    ],
    email: 'hello@payrollkami.app',
    telephone: '+62811-9696-0658',
    socials: {
        instagram: 'https://www.instagram.com/payrollkami',
        // facebook: 'https://facebook.com',
        // linkedin: 'https://www.linkedin.com',
        // twitter: 'https://twitter.com',
    }
}