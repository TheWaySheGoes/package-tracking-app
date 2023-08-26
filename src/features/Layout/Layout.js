import { Outlet } from "react-router-dom";
import style from './Layout.module.css';
import React from "react";


const Layout = () => {

    return (
        <>
            <div className={style.body_container} >
                <div className={style.grid_container} >
                    <header className={style.grid_header}>
                        <h1>Package Tracking</h1>
                    </header>

                    <Outlet />

                    <footer className={style.grid_footer}>
                    </footer>
                </div>
            </div>
        </>
    )
};
export default Layout;