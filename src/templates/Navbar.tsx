import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from '../assets/react.svg';

import { Button } from "../components/ui/button";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-emerald-800 text-white shadow-md">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold">
                    <img src={logo} alt="Logo" className="h-10" />
                </a>

                <div className="flex items-center ml-auto space-x-6 ">
                    <div className=" pl-4 pr-5 border-r">
                    </div>

                 


                    <Button
                        className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </nav>


            {isOpen && (
                <div className="md:hidden bg-blue-700">
                    <ul className="flex flex-col space-y-2 px-4 py-2">
                        <li>
                            <a href="/" className="block py-2 px-4 text-white hover:bg-blue-600 rounded transition-colors duration-200">
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="/muestras" className="block py-2 px-4 text-white hover:bg-blue-600 rounded transition-colors duration-200">
                                Muestras
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
