import React from 'react'
import Popup from 'reactjs-popup' // Import reactjs-popup
import CartContext from '../../context/CartContext'
import PaymentPopup from '../PaymentPopup' // Import the PaymentPopup component
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalPrices = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )

      const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)

      return (
        <div className="summ-container">
          <h1 className="summ-head">
            Order Total: <span className="span">RS {totalPrices}</span>
          </h1>
          <p className="para">{totalItems} items in cart</p>
          <Popup
            trigger={<button className="summ-btn">Checkout</button>}
            modal
            closeOnDocumentClick
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <PaymentPopup
                  totalItems={totalItems}
                  totalPrice={totalPrices}
                  onClose={close}
                />
              </div>
            )}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
