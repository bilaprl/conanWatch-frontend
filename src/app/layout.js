import './globals.css';
import { Montserrat, Lora } from 'next/font/google'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['500', '700', '800', '900'],
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora', 
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'], 
});

export const metadata = {
  title: 'ConanWatch - Jelajahi semua Movie Detective Conan',
  description: 'Platform daftar film, dan ulasan Detective Conan.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body
        className={`${lora.variable} ${montserrat.variable} font-[family-name:var(--font-body)] antialiased min-h-screen relative flex flex-col selection:bg-secondary selection:text-white`}
      >
        <Navbar />
        
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}