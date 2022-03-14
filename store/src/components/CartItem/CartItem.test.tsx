import React from "react";
import CartItem from "./CartItem";
import {render} from "@testing-library/react";

test('renders item',  () => {
  const item = {
      id: "41fd4fd9-95c7-4809-96db-a147d352fdbb",
      image_url: "https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair",
      stock: 0,
      productName: "Unbranded Metal Chair",
      price: 43,
      productDescription: "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.",
      favorite: false
    };
  const component = render(<CartItem key={item.id} product={item}/>);

  expect(component.getByTestId('image').getAttribute('src')).toEqual(item.image_url);
});