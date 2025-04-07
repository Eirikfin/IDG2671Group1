import { useState, useEffect, useRef } from "react";
import styles from './ui_header.module.scss';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const menuDrop = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest(`.${styles.menuButton}`)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <header className={styles.header}>
            <h1 className={styles.header_title}>Research Application</h1>
            
            <nav>
                <div>
                    <button className={styles.menuButton} onClick={menuDrop}>
                        Menu
                    </button>
                    <ul
                        ref={menuRef}
                        className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}
                    >
                        <li><Link to ="/">Profile</Link></li>
                        <li><Link to="/">Manage database</Link></li>
                        <li><Link to="/results">Results</Link></li>
                    </ul>
                </div>
                <div>
                    <Link to="/" className={styles.homeButton} >Home</Link>
                </div>
            </nav>
        </header>
    );
}