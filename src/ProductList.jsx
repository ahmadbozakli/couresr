import React, { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./redux/cartSlice";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };
  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  };

  const styleObjUl = {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    fontSize: "18px",
  };

  const styleA = {
    color: "white",
    fontSize: "18px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image:
            "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
        },
        {
          name: "Boston Fern",
          image:
            "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20",
        },
        {
          name: "Rubber Plant",
          image:
            "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17",
        },
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14",
        },
      ],
    },
    // KEEP YOUR OTHER CATEGORIES HERE
  ];

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="luxury">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
            alt="logo"
            width={60}
          />
          <a href="/" onClick={handleHomeClick}>
            <div>
              <h3 style={{ color: "white" }}>Paradise Nursery</h3>
              <i style={{ color: "white" }}>Where Green Meets Serenity</i>
            </div>
          </a>
        </div>
        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={handleHomeClick} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              🛒 Cart ({cartItems.reduce((total, item) => total + item.qty, 0)})
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group, idx) => (
            <div key={idx} className="plant-category">
              <h2>{group.category}</h2>
              <div className="plants-container">
                {group.plants.map((plant, i) => {
                  const id = `${group.category}-${i}`;
                  const isAdded = cartItems.find((item) => item.id === id);

                  return (
                    <div key={id} className="plant-card">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="plant-image"
                      />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="price">{plant.cost}</p>
                      <button
                        disabled={isAdded}
                        onClick={() =>
                          dispatch(addItem({ ...plant, id, qty: 1 }))
                        }
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
