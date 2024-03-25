import { useRouter, NextRouter } from "next/router";
import { useState } from "react";
import Link from 'next/link';
import styles from '../../styles/NavBar.module.css';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import logo from '../../../public/images/NORP-Logo.png';
import Image from "next/image";

const navigationRoutes = ["home", "people", "metabase", "contact", "resources", "login"];

const NavigationLink = ({href, text, router}: {href: string, text: string, router: NextRouter}) => {
    const isActive = router.asPath === (href === "/home" ? "/" : href );
    return (
        href === "/login" ?
        <Link href={href} passHref>
            <Button
                variant="outlined"
                startIcon={<LoginIcon />}
                onClick={(e) => {

                }}
            >
                Login
            </Button> 
        </Link>:
        <Link href={href === "/home" ? "/" : href} passHref>
            <a
                href={href === "/home" ? "/" : href}
                className={`${isActive && `${styles.nav_item_active}`} ${styles.nav_item}`}>
                    {text}
            </a>
        </Link>
    );
}

const NavBar = () => {
    const router = useRouter();
    return (
        <nav className={styles.nav_container}>
            <Image src={logo} width="300" height="65"></Image>
            <div className={styles.nav_item_container}>
                {
                    navigationRoutes.map( (route: string) => {
                        return(
                            <NavigationLink
                                key={route}
                                href={`/${route}`}
                                text={route.toUpperCase()}
                                router={router}
                            />
                        );
                    })
                }
            </div>
        </nav>
    );
}

export { NavBar };