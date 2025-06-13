import Footer from "./components/Footer";
import InstallPrompt from "./components/InstallPrompt";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Montserrat, Lora } from 'next/font/google'

export const metadata = {
  title: 'Empowering Independence with Personalised NDIS Support | Treasured Care For You',
  description: 'Discover a community where independence is cherished. Treasured Care For You offers personalised NDIS support in a caring and welcoming environment for individuals and families',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  className="font-heading">
          <head>
        <link rel="icon" href="/logo-bgremove.png" sizes="128x128" type="image/png" />
      </head>
      <body className="font-heading">
        <Navbar />
        <InstallPrompt/>
        <main>  {/* page content */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}