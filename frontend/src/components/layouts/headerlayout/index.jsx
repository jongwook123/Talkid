import { Outlet } from "react-router"

import Header from "components/header"

export default function HeaderLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
