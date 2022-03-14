import React from 'react';
import './Product.scss';

// @ts-ignore
function Product(props) {

  return (
    <div className="item" data-testid="Product">
      <div className="favorite" onClick={props.onFav}>
        <img src={ props.data.favorite ? "/favorite-active.svg" : "/favorite.svg" } alt="favorite"/>
      </div>
      <img src={props.data.image_url} alt="" />
      <div className="body">
        <div className="principalSection">
          <div className="name">{props.data.productName}</div>
          <div className="price">{props.data.price}€</div>
        </div>
        <div className="description">
          <p>{props.data.productDescription}</p>
        </div>
      </div>
      <div className="footer">
        <div className="stock">{props.data.stock} left</div>
        <div className="addContainer">
          <button onClick={props.onAdd} disabled={0 === props.data.stock}>+ add</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
