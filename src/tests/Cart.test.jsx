import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {vi} from "vitest"
import { renderWithRouter } from "./Main.test.jsx";

window.fetch = vi.fn(() => {
  const products = [{
      id: 1,
      images: ['https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp', 'https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp', 'https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp'],
      title: 'iPhone 5s',
      description: 'The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it\'s an older model, it still provides a reliable user experience.',
      price: 199.99,
      qty: 1,} ]

  return (Promise.resolve({
    json: () => Promise.resolve({products}),
  }));
})

describe('Router', () => {
  
    it("check product in cart", async () => {
        const user = userEvent.setup();

        renderWithRouter('/ShoppingCart/shop');
        const addBtn = await screen.findByText("ADD TO CART");
        await user.click(addBtn);
        await user.click(await screen.findByText("CART (1)"))

        expect(await screen.findByText("Order Summary")).toBeInTheDocument();
        expect(await screen.findByText("iPhone 5s")).toBeInTheDocument();
    })

    it("increases qty of product in cart", async () => {
        const user = userEvent.setup();

        renderWithRouter('/ShoppingCart/shop');
        const addBtn = await screen.findByText("ADD TO CART");
        await user.click(addBtn);
        await user.click(await screen.findByText("CART (1)"))

        const plus = await screen.findByText("+")
        await user.click(plus)

        const qtyInput = await screen.findByRole("spinbutton", {name: /quantity/})
        expect(qtyInput.value).toBe('2')

    })

    it("decreases qty of product in cart", async () => {
        const user = userEvent.setup();

        renderWithRouter('/ShoppingCart/shop');
        const addBtn = await screen.findByText("ADD TO CART");
        await user.click(addBtn);
        await user.click(await screen.findByText("CART (1)"))

        const minus = await screen.findByText("-")
        await user.click(minus)

        const qtyInput = await screen.findByRole("spinbutton", {name: /quantity/})
        expect(qtyInput.value).toBe('0')

    })

    it("remove product from cart and cart is empty", async () => {
        const user = userEvent.setup();

        renderWithRouter('/ShoppingCart/shop');
        const addBtn = await screen.findByText("ADD TO CART");
        await user.click(addBtn);
        await user.click(await screen.findByText("CART (1)"))

        const remove = await screen.findByText("REMOVE")
        await user.click(remove)

        expect(await screen.findByText("Your Cart is currently empty!")).toBeInTheDocument();
        expect(await screen.findByText("CART (0)")).toBeInTheDocument();
        expect(screen.queryByText("iPhone 5s")).not.toBeInTheDocument();
    })

    it("update price of product in cart", async () => {
        const user = userEvent.setup();

        renderWithRouter('/ShoppingCart/shop');
        const addBtn = await screen.findByText("ADD TO CART");
        await user.click(addBtn);
        await user.click(await screen.findByText("CART (1)"))

        const plus = await screen.findByText("+")
        await user.click(plus)

        expect(await screen.findByText("Subtotal: 399.98€")).toBeInTheDocument();
        expect(await screen.findByText("Total: 399.98€")).toBeInTheDocument();

    })

});