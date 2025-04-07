// app/layout.tsx
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Providers from "../providers";
import Navigation from "../components/navigation/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "My App",
  description: "My cool app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}>
          <Providers>
            <div className="relative z-[9999] flex justify-center mx-auto max-w-[480px] h-screen overflow-auto bg-[#2b2a2a]">
              {children}
              <Navigation />
            </div>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
