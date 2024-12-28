import React from "react";

import "./App.css";
import { sampleProducts } from "./data";

function App() {
  return (
    <div className='App'>
      <h1>prox commerce</h1>
      <main>
        <ul>
          {sampleProducts.map((product) => (
            <li key={product.slug}>
              <img
                src={product.image}
                alt={product.name}
                className='product-image'
              />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
