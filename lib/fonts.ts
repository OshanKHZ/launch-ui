import { DM_Mono } from "next/font/google";

export const favorit = {
  className: "font-favorit",
};

export const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});
