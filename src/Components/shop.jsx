import {useContext, useEffect, useState } from "react";
import style from "../Styles/shop.module.css"
import { useOutletContext } from "react-router";
import { CartContext, CartSetContext } from "./cartContext";
import chevronLeft from "../assets/chevron-left.svg"
import chevronRight from "../assets/chevron-right.svg"

export default function Shop(){
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const cart = useContext(CartContext);
    const setCart = useContext(CartSetContext);

    useEffect(() => {
        let isMounted = true;

        fetch("https://dummyjson.com/products/category/smartphones")
        .then(response => {
            if(response.status >= 400){
                throw new Error("server error");
            }
            return response.json()
        })
        .then(response => {
            if(isMounted){
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

        return () => {
            isMounted = false;
        }
    }, []);

    
    if(error) return <p>An issue has been encountered</p>;

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

    function decreaseQty(e){
        const itemTargeted = parseInt(e.target.id.split("_")[1]);
        setItems(items.map(item => {
            if(item.id === itemTargeted){
                return {
                    ...item, qty: item.qty - 1
                }
            } else {
                return item
            }
        }))
    }

    function increaseQty(e){
        const itemTargeted = parseInt(e.target.id.split("_")[1]);
        setItems(items.map(item => {
            if(item.id === itemTargeted){
                return {
                    ...item, qty: item.qty +1
                }
            } else {
                return item
            }
        }))
    }

    function handleNext(e){
        let currentImg = document.querySelector("#image_" + e.target.id.split("_")[1]);
        let sourceImg = currentImg.src;
        const itemId = parseInt(e.target.id.split("_")[1]);
        const item = items.find(item => item.id === itemId);

        for(let index = 0; index < item.images.length; index++){
            if(sourceImg.includes(item.images[index])){
                if(index === item.images.length-1){
                    console.log("here")
                    currentImg.src = item.images[0]
                } else {
                    console.log("there")
                    currentImg.src = item.images[index + 1]
                }
            }
        }
    }

    function handlePrevious(e){
        let currImg = document.querySelector("#image_" + e.target.id.split("_")[1]);
        let srcImg = currImg.src;
        const itemId = parseInt(e.target.id.split("_")[1]);
        const item = items.find(item => item.id === itemId);

        for(let index = 0; index < item.images.length; index++){
            if(srcImg.includes(item.images[index])){
                if(index === 0){
                    currImg.src = item.images[item.images.length -1]
                } else {
                    currImg.src = item.images[index - 1]
                }
            }
        }
    }

    console.log(items)

    return(
        <div className={style.shop}>
                {items.map(item => {
                    return (
                    <div key={item.id} className={style.cardShop}>
                        <Carousel item={item} img={item.images[1]} handlePrevious={handlePrevious} handleNext={handleNext} />
                        <h2 className={style.itemTitle}>{item.title}</h2>
                        <p className={style.itemDescription}>{item.description}</p>
                        <h3 className={style.itemPrice}>{item.price + "€"}</h3>
                        <div className={style.qtyAddbtn}>
                            <div className={style.qtySection}>
                                <div id={"minus_"+item.id} className={style.minusQty} onClick={decreaseQty} >-</div>
                                <input id={"input_"+item.id} aria-label="quantity" type="number" className={style.qtyInput} value={item.qty} onChange={onChange} />
                                <div id={"plus_"+item.id} className={style.plusQty} onClick={increaseQty} >+</div>
                            </div>
                            <button id={"btn_"+item.id} onClick={handleAddCart} className={style.addCartBtn}>ADD TO CART</button>
                        </div>
                    </div>
                    )                   
                })}
        </div>      

    )
}

function Carousel({item, img, handlePrevious, handleNext}){
    return (
        <>
            <div className={style.caroussel}  >
                <img src={chevronLeft} id={"previous_" + item.id} className={style.previous} onClick={handlePrevious}/>
                <img id={"image_" + item.id} src={img} />
                <img src={chevronRight} id={"next_" + item.id} className={style.next} onClick={handleNext}/>
            </div>
        </>
    )
}