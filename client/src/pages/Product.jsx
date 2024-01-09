import React from 'react';
import Layout from '../components/layout/Layout';
import Typography from '@mui/material/Typography';
import { Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import TshirtImg from '../images/construct.png'

function Product  ()  {
    const amount = 10500;
  const currency = "INR";
  const receiptId = "r1";


  // Use import.meta.env.DEV to check if the app is in development
  const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : '';
  

  const paymentHandler = async (e) => {
    console.log('baseUrl:', baseUrl);
    const response = await fetch(`${baseUrl}/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_live_MyISyBMETyjUMF", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Modelflick", //your business name
      description: "Donation",
      image: TshirtImg,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(`${baseUrl}/order/validate`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Modellfick", //your customer's name
        email: "modelflick@gmail.com",
        contact: "9447648320", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <Layout>
      <Container>
        <div className="product">
            <h2>Tshirt</h2>
            <p>Solid blue cotton Tshirt</p>
            <img src={TshirtImg} />
            <br />
            <button onClick={paymentHandler}>Pay</button>
        </div>
      </Container>
    </Layout>
  );
};

export default Product;
