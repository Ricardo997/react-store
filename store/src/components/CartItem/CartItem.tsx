import React from 'react';
import "./CartItem.scss"

function CartItem(props) {

  return (
    <div className="productWrapper">
      <img data-testid="image" src={ props.product.image_url } alt=""/>
      <div className="info">
        <div className="name">{ props.product.productName }</div>
        <div className="amount">
          <button onClick={ () => props.subtractOne() }>-</button>
          { props.product.amount }
          <button onClick={ () => props.addOne() }>+</button>
        </div>
      </div>
      <div className="price">{ props.product.price }€</div>
    </div>
  )
}

export default CartItem;