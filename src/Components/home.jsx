import {useState } from "react";
import style from "../Styles/home.module.css"
import {Link} from "react-router";

export default function Home(){

    return(
        <div className={style.home}>
            <h1>Experience Innovation</h1>
            <div className={style.textHome}>
                <p>Step into the future with cutting-edge smartphones designed to elevate your everyday life.</p>
                <p>Sleek design. Powerful performance.</p>
            </div>
            <Link to="/ShoppingCart/shop"><button className={style.goShopbtn} >GO SHOP</button></Link>
        </div>
    )
}