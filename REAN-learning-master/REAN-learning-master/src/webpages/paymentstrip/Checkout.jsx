import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; 
import './PaymentForm.css'; 
import Cookies from "universal-cookie";
import axios from 'axios';

const CheckoutForm = () => {
  const cookie = new Cookies();
  const id = cookie.get("course-id");
  const gettoken = cookie.get("Bearer");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [emailUser, setEmailUser] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    const headers = {
        Authorization: `Bearer ${gettoken}`
    };

    axios.get("http://localhost:5000/api/auth/profile", { headers })
        .then(response => {
          setEmailUser(response.data.email); 
        })
        .catch(error => {
            console.error('Error fetching profile', error);
        });
  }, [gettoken]);

  async function handleBuy() {
    const headers = {
      Authorization: `Bearer ${gettoken}`
    };
    try {
      let res = await axios.post(
        `http://localhost:5000/api/purchases/purchase/${id}`, 
        null, 
        { headers }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    if (email !== emailUser) {
      setErrorMessage("Please enter the correct email."); 
      setLoading(false);
      return; 
    } else {
      setErrorMessage(""); 
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
      },
      redirect: 'if_required',
    });

    setLoading(false);

    if (error) {
      console.log(error.message);
    } else {
      handleBuy();
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/courses'); 
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='emaill'
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {errorMessage && <div style={{ color: 'red', paddingBottom:"10px" }}>{errorMessage}</div>}
      <PaymentElement />
      <button 
        type="submit" 
        disabled={!stripe || loading} 
        style={{ 
          position: 'relative', 
          backgroundColor: paymentSuccess ? 'green' : '#0a74da',
          color: 'white', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center', 
          padding: '10px 20px',
          minWidth: '150px', 
        }} 
      >
        {loading ? (
          <>
            <span className="spinner" style={{
              border: '2px solid white',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              animation: 'spin 1s linear infinite',
              marginRight: '5px' 
            }} />
            <span style={{ visibility: 'hidden' }}> </span> 
          </>
        ) : paymentSuccess ? (
          <> 
            <span style={{
              marginRight: '5px', 
              fontSize: '18px', 
              display: 'inline-block', 
              position: 'relative', 
              top: '3px'
            }}>✔</span> 
          </>
        ) : (
          'Pay now'
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;






