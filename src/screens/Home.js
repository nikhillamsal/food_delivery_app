import React, { useEffect, useState } from 'react'
import burger from '../img/burger.jpg'
import pizza from '../img/pizza.jpg'
import sandwich from '../img/sandwich.jpg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }
    useEffect(() => {
        loadData();
    }, [])




    return (
        <>
            <Navbar />
            <div>
                <div id="carouselExampleControls" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }} data-bs-ride="carousel">
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className='d-flex justify-content-center'>
                                <input className="form-control me-2" type="search" placeholder='Search' aria-label='Search' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                {/* <button className="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src={burger} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={pizza} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={sandwich} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    foodCat.length > 0 ? (
                        foodCat.map((data) => {
                            return (
                                <div className="row mb-3">
                                    <div key={data._id}  className="fs-3 m-3">{data.CategoryName}</div>
                                        <hr />
                                        {foodItem.length > 0 ? (
                                            foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                                                .map((filterItems) => (
                                                    <div key={filterItems._id} className = "col-12 col-md-6 col-lg-3">
                                                        <Card foodItem = {filterItems} options={filterItems.options[0]} />
                                                    </div>
                                                ))
                                        ) : (
                                            <div>No such data found</div>
                                        )}
                                    </div>
                            )
                        }
                        )
                    ) : (
                        <div>No categories available</div>
                    )}
            </div>
            <Footer />
        </>
    );
}
