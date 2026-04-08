import { createContext, useState } from "react";

export const CartContext = createContext();
export const CartSetContext = createContext();

export function CartProvider({children}){
    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={cart}>
            <CartSetContext.Provider value={setCart}>
                {children}
            </CartSetContext.Provider>
        </CartContext.Provider>
    );
}