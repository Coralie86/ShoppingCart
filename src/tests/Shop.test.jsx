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
  
  it('renders fetched products', async () => {
    renderWithRouter('/ShoppingCart/shop');

    const phoneTitle = await screen.findByText("iPhone 5s")

    expect(phoneTitle).toBeInTheDocument();

  })

  it("increases the qty", async () => {
    const user = userEvent.setup();
    renderWithRouter('/ShoppingCart/shop');

    const plus = await screen.findByText("+");

    await user.click(plus);
    const qtyInput = await screen.findByRole("spinbutton", {name: /quantity/})

    expect(qtyInput.value).toBe('2')

  })

  it("decreases the qty", async () => {
    const user = userEvent.setup();
    renderWithRouter('/ShoppingCart/shop');

    const minus = await screen.findByText("-");

    await user.click(minus);
    const qtyInput = await screen.findByRole("spinbutton", {name: /quantity/})

    expect(qtyInput.value).toBe('0')

  })

  it("add a product to cart", async () => {
    const user = userEvent.setup();
    renderWithRouter('/ShoppingCart/shop');

    const addBtn = await screen.findByText("ADD TO CART");

    await user.click(addBtn);
    expect(await screen.findByText("CART (1)")).toBeInTheDocument();
  })

});