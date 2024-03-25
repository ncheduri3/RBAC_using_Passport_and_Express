import { NavBar } from "../NavBar";

const Layout = ({children}: {children: any}) => {
    return (
        <>
            <NavBar />
            { children }
        </>
    );
}

export { Layout };