import React from 'react';
import Product from "../Product/Product";
import "./Home.scss"
import Cart from "../Cart/Cart";

class Home extends React.Component<{}, {products: any[], cartProducts: any[], isLoaded: boolean, isMobile: boolean, onlyShowFavorites: boolean, cartActive: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      cartProducts: [],
      isLoaded: false,
      isMobile: false,
      onlyShowFavorites: false,
      cartActive: false,
      error: null
    }
  }

  setDisplay = () => {
    this.setState({isMobile: window.innerWidth < 768 });
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/grocery")
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data,
          isLoaded: true
        });
      }, (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      });
    this.setDisplay();
    window.addEventListener('resize', this.setDisplay);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setDisplay);
  }

  timesAdded = (id: string): number => {
    const productInCart = this.state.cartProducts.filter((item) => item.id === id)
    return productInCart.length > 0 ? productInCart[0].amount : 0;
  }

  addProduct(id: string) {
    const times: number = this.timesAdded(id);
    if (times) {
      let cartProducts = this.state.cartProducts;
      cartProducts.map((item) => {
        if (item.id === id) {
          item.amount++;
        }
        return true;
      });
      this.setState({cartProducts: cartProducts});
    } else {
      const newProduct = this.state.products.filter((item: any) => item.id === id)[0];
      const productToAdd = Object.assign({}, newProduct, {amount: 1})
      this.setState({cartProducts: [...this.state.cartProducts, productToAdd]});
    }
  }

  subtractOne(id: any) {
    let cartProducts = this.state.cartProducts;
    if (cartProducts.filter((item) =>  item.id === id)[0].amount === 1) {
      cartProducts.filter((item, index) => {
        if (item.id === id) {
          cartProducts.splice(index, 1);
        }
        return true;
      });
      this.setState({cartProducts: cartProducts});
    } else {
      cartProducts.map((item) => {
        if (item.id === id) {
          item.amount--;
        }
        return true;
      });
      this.setState({cartProducts: cartProducts});
    }
  }

  handleFav(id: string) {
    let products = this.state.products;
    products.map((item) => {
      if (item.id === id) {
        item.favorite = !item.favorite;
      }
      return true;
    });
    this.setState({products: products});
  }

  render() {

    return (
      <div className="Home" data-testid="Home">
        {!this.state.isLoaded &&
            <div className="loader">
                <img src="/loader.svg" alt="loading"/>
            </div>
        }
        {this.state.isLoaded && !(this.state.isMobile && this.state.cartActive) &&
          <div className="productList">
            {this.state.products.map((product: any) => {
              if ((this.state.onlyShowFavorites && product.favorite) || !this.state.onlyShowFavorites) {
                return (<Product key={product.id} data={product} onFav={() => this.handleFav(product.id)} onAdd={() => {
                  this.addProduct(product.id)
                }}/>);
              } else {
                return '';
              }
            })}
          </div>
        }
        {this.state.isLoaded &&
          <div className={`cart ${this.state.isMobile ? "mobile" : "desktop"} ${this.state.cartActive ? "active" : ""}`}>
            <Cart
              cartProducts={this.state.cartProducts}
              onAddOne={ (id: string) => this.addProduct(id) }
              onSubtractOne={ (id: string) => this.subtractOne(id) }
            />
          </div>
        }
        {this.state.isLoaded &&
          <div className="buttons">
              <button className={`cartButton ${this.state.isMobile ? "active" : ""}`} onClick={() => this.setState({cartActive: !this.state.cartActive})}>
                  <img src={ this.state.cartActive ? "/backarrow.svg" : "/shopping-cart.svg" } alt="shopping cart"/>
              </button>
              <button className={`favButton ${this.state.onlyShowFavorites ? "active" : ""}`} onClick={() => this.setState({onlyShowFavorites: !this.state.onlyShowFavorites})}>
                  <img src={ this.state.onlyShowFavorites ? "/favorite-active.svg" : "/favorite.svg" } alt="favorites"/>
              </button>
          </div>
        }
      </div>
    )
  }
}

export default Home;
