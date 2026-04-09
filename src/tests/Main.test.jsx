import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartProvider } from '../Components/cartContext.jsx'
import Navigation from '../Components/navigation.jsx'
import Children from '../Components/children.jsx'
import { RouterProvider , createMemoryRouter} from 'react-router'
import userEvent from "@testing-library/user-event";

export function renderWithRouter(initialPath = "/ShoppingCart/"){
  const router = createMemoryRouter([
      {
        path: "ShoppingCart/",
        element: <Navigation />,
        children: [
          {
            index: true, element: <Children />
          },
          {
            path: ":page", element: <Children />,
          }
        ]
      }
    ],
    {
      initialEntries: [initialPath]
    }
  )

    render(
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
          )
    
  return router;
}


describe('Router', () => {
  it('renders Default Route', () => {

  renderWithRouter();    

  const homeBtn = screen.getByRole("button", {name: "HOME"})
  const shopBtn = screen.getByRole("button", {name: "SHOP"})
  const cartBtn = screen.getByRole("button", {name: "CART (0)"})
  const goShopBtn = screen.getByRole("button", {name: "GO SHOP"})

  expect(screen.getByText(/shopping shop/i)).toBeInTheDocument();
  expect(homeBtn).toBeInTheDocument();
  expect(shopBtn).toBeInTheDocument();
  expect(cartBtn).toBeInTheDocument();
  expect(goShopBtn).toBeInTheDocument();
  
  });

  it('Route not found', () => {
    
    renderWithRouter("/ShoppingCart/big")

    expect(screen.getByText(/Oh no, this route doesn\'t exist!/)).toBeInTheDocument();
  })

  it('redirect to Shop page with Nav Bar', async () => {
    const user = userEvent.setup();

    const router = renderWithRouter();
    
    const shopBtn = screen.getByRole("button", {name: "SHOP"});
    await user.click(shopBtn);

    expect(router.state.location.pathname).toBe("/ShoppingCart/shop");
  })

  it('redirect to Shop page with Go SHOP', async () => {
    const user = userEvent.setup();

    const router = renderWithRouter();
    
    const shopBtn = screen.getByRole("button", {name: "GO SHOP"});
    await user.click(shopBtn);

    expect(router.state.location.pathname).toBe("/ShoppingCart/shop");
  })

  it('redirect to Cart page with Nav Bar', async () => {
    const user = userEvent.setup();

    const router = renderWithRouter();
    
    const cartBtn = screen.getByRole("button", {name: "CART (0)"});
    await user.click(cartBtn);

    expect(router.state.location.pathname).toBe("/ShoppingCart/cart");
    expect(screen.getByText('Your Cart is currently empty!')).toBeInTheDocument();
  })

});