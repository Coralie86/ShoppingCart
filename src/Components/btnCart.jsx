import {useContext, useState} from "react";
import { CartContext } from "./cartContext";

import style from "../Styles/navigation.module.css"


export default function BtnCart(){

        const cart = useContext(CartContext);
        let nbCart = cart.length;

        return(
            <button className={style.navBtn}>{"CART (" + nbCart + ")"}</button>
        )
    
}