import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState

      const productExists = cartList.find(item => item.title === product.title)

      if (productExists) {
        const updatedCartList = cartList.map(item =>
          item.title === product.title
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        )
        return {cartList: updatedCartList}
      }

      return {cartList: [...cartList, product]}
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const newCartList = cartList.map(i => {
      if (i.id === id) {
        return {...i, quantity: i.quantity + 1}
      }
      return i
    })

    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = id => {
    console.log('Decrement is working')
    const {cartList} = this.state

    const newList = cartList
      .map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return {...item, quantity: item.quantity - 1}
          }

          return null
        }
        return item
      })
      .filter(item => item !== null)
    this.setState({cartList: newList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newCartList = cartList.filter(i => {
      if (i.id !== id) {
        return id
      }
    })
    this.setState({cartList: newCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
