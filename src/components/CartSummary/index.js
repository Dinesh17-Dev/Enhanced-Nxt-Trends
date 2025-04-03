import CartContext from '../../context/CartContext.js'
import './index.css'

const CartSummary = () => {
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const totalPrices = cartList.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        )

        const totalItems = cartList.length

        return (
          <div className="summ-container">
            <h1 className="summ-head">
              Order Total: <span className="span">RS {totalPrices}</span>
            </h1>
            <p className="para">{totalItems} items in cart</p>
            <button className="summ-btn">Checkout</button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
