import {useContext, useEffect, useState } from "react";
import style from "../Styles/shop.module.css"
import { useOutletContext } from "react-router";
import { CartContext, CartSetContext } from "./cartContext";

export default function Shop(){
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const cart = useContext(CartContext);
    const setCart = useContext(CartSetContext);

    useEffect(() => {
        let isMounted = false;

        fetch("https://dummyjson.com/products/category/smartphones")
        .then(response => {
            if(response.status >= 400){
                throw new Error("server error");
            }
            return response.json()
        })
        .then(response => {
            if(!isMounted){
                setItems(response.products.map(product => {
                    return {
                        id: product.id,
                        images: product.images,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        qty: 1,
                    }
                }))
            }            
        }
        )
        .catch(err => setError(err));
        console.log("fetch renders")

        return () => {
            isMounted = true;
        }
    }, []);

    
    if(error) return <p>A issue has been encountered</p>;

    function handleAddCart(e){
        const itemTargetedId = parseInt(e.target.id.split("_")[1]);
        const itemTargeted = items.find(item => item.id === itemTargetedId)
        setCart([...cart, {
            id: itemTargeted.id,
            images: itemTargeted.images,
            title: itemTargeted.title,
            description: itemTargeted.description,
            price: itemTargeted.price,
            qty: itemTargeted.qty
                    }])        
    }

    function onChange(e){
        const itemTargeted = parseInt(e.target.id.split("_")[1]);
        const newValue = parseInt(e.target.value);
        setItems(items.map(item => {
            if(item.id === itemTargeted){
                return {
                    ...item, qty: newValue
                }
            } else {
                return item
            }
        }))
    }

    return(
        <div className={style.shop}>
                {items.map(item => {
                    return (
                    <div key={item.id} className={style.cardShop}>
                        <img src={item.images[1]} />
                        <h2 className={style.itemTitle}>{item.title}</h2>
                        <p className={style.itemDescription}>{item.description}</p>
                        <h3 className={style.itemPrice}>{item.price + "€"}</h3>
                        <div className={style.qtyAddbtn}>
                            <label htmlFor={"input_"+item.id} className={style.labelInput} >Quantity
                                <input id={"input_"+item.id} type="number" className={style.qtyInput} value={item.qty} onChange={onChange} />
                            </label>                            
                            <button id={"btn_"+item.id} onClick={handleAddCart} className={style.addCartBtn}>ADD TO CART</button>
                        </div>
                    </div>
                    )                   
                })}
        </div>      

    )
}