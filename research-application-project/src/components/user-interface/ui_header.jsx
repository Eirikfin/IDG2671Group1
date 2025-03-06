import { useState, useEffect, useRef } from "react";

export default function Header() {
    let [isMenuOpen, setIsMenuOpen] = useState(false);
    let menuRef = useRef(null);
    let menuDrop = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        let handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest(".header_menu-button")
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return() => document.removeEventListener("click", handleClickOutside);
    }, []);

    return(
        <header className="header">
            <h1>Research Application</h1>
            <nav>
                <a href="#">Home</a>
                <button className="header_menu-button" onClick={menuDrop}>Menu</button>
                <ul 
                    ref={menuRef} 
                    className={`header_menu ${isMenuOpen ? "open" : ""}`}
                >
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Manage database</a></li>
                    <li><a href="#">Something</a></li>
                </ul>
            </nav>
        </header>
    );
}