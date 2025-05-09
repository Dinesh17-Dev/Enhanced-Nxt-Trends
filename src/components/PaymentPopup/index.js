import {useState} from 'react'
import './index.css'

const PaymentPopup = ({totalItems, totalPrice, onClose}) => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handlePaymentMethodChange = event => {
    const selectedMethod = event.target.value
    setPaymentMethod(selectedMethod)
    setIsConfirmButtonDisabled(selectedMethod !== 'cod')
  }

  const handleConfirmOrder = () => {
    if (paymentMethod === 'cod') {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
        onClose() // Close the popup
        alert('Your order has been placed successfully') // Using alert as reactjs-popup doesn't have a built-in alert like react-popup
        // You can add further logic here, like clearing the cart
      }, 100) // Adjust the timeout as needed
    }
  }

  return (
    <div className="payment-popup">
      <h3>Payment Options</h3>
      <div className="payment-options">
        <div className="payment-option">
          <input
            type="radio"
            id="card"
            name="paymentMethod"
            value="card"
            disabled
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="card" className="disabled">
            Card
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="netBanking"
            name="paymentMethod"
            value="netBanking"
            disabled
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="netBanking" className="disabled">
            Net Banking
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="upi"
            name="paymentMethod"
            value="upi"
            disabled
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="upi" className="disabled">
            UPI
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="wallet"
            name="paymentMethod"
            value="wallet"
            disabled
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="wallet" className="disabled">
            Wallet
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Items: {totalItems}</p>
        <p>Total Price: RS {totalPrice}</p>
      </div>

      <button
        className="confirm-order-button"
        onClick={handleConfirmOrder}
        disabled={isConfirmButtonDisabled}
      >
        Confirm Order
      </button>

      {showSuccessMessage && (
        <p className="success-message">
          Your order has been placed successfully
        </p>
      )}
    </div>
  )
}

export default PaymentPopup
