// app/layout.tsx
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Providers from "../providers";
import Navigation from "../components/navigation/navigation";

export const metadata = {
  title: {
    template: "%s | Muple",
    default: "Loading...",
  },
  description: "유튜브를 통한 음악 플레이어 입니다.",
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
