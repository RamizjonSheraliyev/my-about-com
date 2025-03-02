import AboutMe from "./components/About";
import { Blog } from "./components/Blog";
import { ContactForm } from "./components/Contact";
import { DarkModeProvider } from "./components/DarkModeContext";
import { SocialLinks } from "./components/Form";
import { Header } from "./components/Header";
import { Portfolio } from "./components/Portfolio";
import { Resume } from "./components/Resume";

export default function Home() {
  return (
    <>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
        <main className="flex-grow">
          <DarkModeProvider>
            <Header />
            <AboutMe />
            <Resume />
            <Portfolio />
            <Blog />
            <ContactForm />
            <SocialLinks />
          </DarkModeProvider>
        </main>
      </div>
    </>
  );
}
