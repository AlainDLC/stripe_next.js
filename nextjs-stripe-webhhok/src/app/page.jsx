"use client";
import { products } from "./products";

const handlePay = async (product) => {
  const res = await fetch("api/checkout", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const session = await res.json();

  window.location = session.url;
};

function App() {
  return (
    <div className="px-44">
      <h1 className="text-3xl font-bold text-center my-10">Products</h1>
      <div className="grid grid-cols-3 gap-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-slate-600 text-center p-4 rounded-md text-white"
          >
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <img alt="pro" src={product.image} className="w-full" />
            <button
              className="bg-green-800 text-white rounded-md mt-4 w-full"
              onClick={() => handlePay(product)}
            >
              Betala
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
