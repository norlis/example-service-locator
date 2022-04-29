import React from "react";
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => <>
    Bienvenido <br /><br />

    <Outlet />
</>



export default Layout