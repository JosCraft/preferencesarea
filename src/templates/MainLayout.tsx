import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow bg-green-100">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
