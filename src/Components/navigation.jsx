import {useState} from "react";
import style from "../Styles/navigation.module.css"
import { Link, Outlet } from "react-router";
import BtnCart from "./btnCart";


export default function Navigation(){
    const [cart, setCart] = useState([]);
    let nbCart = cart.length;

    return(
        <>
            <div className={style.nav}>
                <h1>Shopping shop</h1>
                <div className={style.btns}>
                    <Link to="/ShoppingCart/home"><button className={style.navBtn} >HOME</button></Link>
                    <Link to="/ShoppingCart/shop"><button className={style.navBtn} >SHOP</button></Link>
                    <Link to="/ShoppingCart/cart"><BtnCart /></Link>
                </div>
                {console.log("navigation re-render")}
            </div>
            <Outlet />
        </>
    )
}

