import {useState } from "react";
import Navigation from './navigation.jsx'
import Home from "./home.jsx";
import Cart from "./cart.jsx";
import Shop from "./shop.jsx";
import ErrorPage from "./errorElement.jsx";
import { useParams } from "react-router";


export default function Children(){
    const {page} = useParams();
    return (
        <>
            {page === "cart" ? (<Cart />)
             : page === "shop" ? (<Shop />)
             : (page === "home" || page === undefined) ? (<Home />) 
             : (<ErrorPage />)}
        </>
    )
}