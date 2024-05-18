import React, { useEffect, useState } from 'react'
import { LoginContext } from './ContextProvider';
import "./buynow.css"
import { loadStripe } from '@stripe/stripe-js';
import { useContext } from 'react';

const Subtotal = ({ iteam }) => {
    const [variant, setVariant] = useState("small")
    const [Price, setPrice] = useState(0)

    const { account, setAccount } = useContext(LoginContext)

    const totalAmout = () => {
        let Price = 0
        iteam.map((item) => {
            Price = item.prizes[0][variant] + Price
        })
        setPrice(Price)
    }
    useEffect(() => {
        totalAmout()
    }, [iteam])

    // Payment integration
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51OU1hESJ3xUqIdYs1ULQouUXgxGXzQ4ikO6l6POdm1SFmGv4JzkwiOA7KdjitzA5tbM9Mwyc1CLracMySMzUMyO400HodAh1bb")

        const body = {
            products: iteam
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const responce = await fetch("http://localhost:8005/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await responce.json()
        const result  = stripe.redirectToCheckout({
            sessionId:session.id
        })

        if(result.error){
            console.log(result.error)
        }
    }

    return (
        <>
            <div className='sub_item' >
                <h4>Total: <strong style={{ color: "green" }}> {Price} Rs/-</strong> </h4>
                <button className='btn btn-success mx-2  ' type='button' onClick={makePayment} >Checkout</button>

            </div>
        </>
    )
}

export default Subtotal