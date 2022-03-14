import React from "react";
import Product from "./Product";
import {render} from "@testing-library/react";
import '@testing-library/jest-dom'

const PRODUCT = {
  id: "41fd4fd9-95c7-4809-96db-a147d352fdbb",
  image_url: "https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair",
  stock: 0,
  productName: "Unbranded Metal Chair",
  price: 43,
  productDescription: "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.",
  favorite: false
};

test('renders product', () => {
  const productComponent = render(<Product key={PRODUCT.id} data={PRODUCT} />);
  expect(productComponent.getByTestId('Product')).toBeInTheDocument();
});