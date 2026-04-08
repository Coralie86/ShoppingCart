import {useContext, useState } from "react";
import style from "../Styles/cart.module.css"
import { CartContext, CartSetContext } from "./cartContext";
import { Link } from "react-router";

export default function Cart(){
    const cart = useContext(CartContext);
    const setCart = useContext(CartSetContext);

    function onChange(e){
        const itemTargeted = parseInt(e.target.id.split("_")[1]);
        const newValue = parseInt(e.target.value);
        setCart(cart.map(item => {
            if(item.id === itemTargeted){
                return {
                    ...item, qty: newValue
                }
            } else {
                return item
            }
        }))
    }

    function handleRemove(e){
        const itemTargetedId = parseInt(e.target.id.split("_")[1]);
        setCart(cart.filter(item => item.id !== itemTargetedId )) ;
    }

    if(cart.length === 0){
        return (
            <div>
                <h1>Your Cart is currently empty!</h1>
                <Link to="/ShoppingCart/shop">
                    You can go back to the shop page by clicking here, though!
                </Link>
            </div>
        )
    }

    return(
        <div className={style.cartSection}>
            <div className={style.cart}>
                {
                    cart.map(item => {
                        return(
                            <CartCard key={item.id} item ={item} onChange={onChange} handleRemove={handleRemove} />
                        )
                    })
                }
            </div>
            <Payment cartList={cart} />
        </div>
    )
}

function CartCard({item, onChange, handleRemove}){
    return(
        <div className={style.cartCard}>           
            <img src={item.images[1]} className={style.imgCart}/>
            <div className={style.infoCard}>
                <h1 className={style.cardTitle} >{item.title}</h1>
                <p className={style.cardPrice}>{item.price + "€"}</p>
                <p className={style.totalCard}>{"Subtotal: " + Math.round(item.price * item.qty *100) / 100 + "€"}</p>
                <div className={style.qtyAddbtn}>
                    <input id={"input_"+item.id} type="number" className={style.qtyInput} value={item.qty} onChange={onChange} />                          
                    <button id={"btn_"+item.id} onClick={handleRemove} className={style.removeCartBtn}>REMOVE</button>
                </div>
            </div>
        </div>
    )
}

function Payment({cartList}){
    let total = cartList.reduce((total, item) => total + (Math.round(item.price * item.qty *100) / 100) ,0)

    return(
        <div className={style.orderSummary}>
            <h1 className={style.summary}>Order Summary</h1>
            <p className={style.total} >{"Total: " + total + "€"}</p>
            <button className={style.payment}>PAYMENT</button>
        </div>
    )
}