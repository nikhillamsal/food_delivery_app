import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrder() {
    const [orderData, setorderData] = useState({})


    const fetchMyOrder = async () => {
        await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])



    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className="container">
    <div className="row">
        {orderData && orderData.orderData ? (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Order Date</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Size</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.orderData.order_data.slice(0).reverse().map((item) =>
                        item.map((arrayData) => (
                            <tr key={`${arrayData.name}-${arrayData.qty}`}>
                                {arrayData.Order_date ? (
                                    <td colSpan="5" className="text-left">
                                        <strong>
                                            {arrayData.Order_date}
                                            </strong>
                                    </td>
                                ) : (
                                    <>
                                        <td></td>
                                        <td>{arrayData.name}</td>
                                        <td>{arrayData.qty}</td>
                                        <td>{arrayData.size}</td>
                                        <td>Rs. {arrayData.price}/-</td>
                                    </>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        ) : (
            <p>No orders found</p>
        )}
    </div>
</div>


            <Footer />
        </div>
    )
}
