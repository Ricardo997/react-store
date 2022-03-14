import React from 'react';
import "./Cart.scss"
import CartItem from "../CartItem/CartItem";

function Cart(props: any) {
  const calculateTotal = () => {
    let total = 0;
    if (props.cartProducts.length > 0) {
      for (const item of props.cartProducts) {
        total += (item.price * item.amount);
      }
      return total;
    } else {
      return total;
    }
  }

  const onAddOne = (id: string) => {
    props.onAddOne(id);
  }

  const onSubtractOne = (id: string) => {
    props.onSubtractOne(id);
  }

  return (
    <div className="Cart" data-testid="Cart">
      <div className="checkout">
        CHECKOUT {calculateTotal()}€
      </div>
      <div className="cartList">
        { props.cartProducts.map((item: any) => {
          return <CartItem
            key={item.id}
            product={item}
            addOne={ () => onAddOne(item.id) }
            subtractOne={ () => onSubtractOne(item.id) }
          />;
        }) }
      </div>
    </div>
  );
}

export default Cart;
