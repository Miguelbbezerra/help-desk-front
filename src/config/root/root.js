import { Outlet } from "react-router-dom";
import PersistentDrawerLeft from "../../layout/persistentDrawer";

export default function Root(){
    return(
        <PersistentDrawerLeft>
            <Outlet />
        </PersistentDrawerLeft>
    )
}