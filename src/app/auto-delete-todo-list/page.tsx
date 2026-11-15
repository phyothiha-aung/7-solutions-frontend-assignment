"use client";
import { products } from "@/data/products";
import { ProductItem } from "@/interface/product-interfaces";
import { useState } from "react";

const AutoDeleteTodoList = () => {
  const [availableItems, setAvailableItems] = useState<ProductItem[]>(products);
  const [fruits, setFruits] = useState<ProductItem[]>([]);
  const [vegetables, setVegetables] = useState<ProductItem[]>([]);

  const handleMoveToCategory = (item: ProductItem) => {
    setAvailableItems((prev) => prev.filter((p) => p.name !== item.name));

    if (item.type === "Fruit") {
      setFruits((prev) => [...prev, item]);
    } else {
      setVegetables((prev) => [...prev, item]);
    }
  };

  const handleReturnToMain = (item: ProductItem) => {
    if (item.type === "Fruit") {
      setFruits((prev) => prev.filter((p) => p.name !== item.name));
    } else {
      setVegetables((prev) => prev.filter((p) => p.name !== item.name));
    }

    setAvailableItems((prev) => [...prev, item]);
  };

  return (
    <main className="container mx-auto flex items-stretch gap-5 py-10 min-h-dvh">
      <div className="product-col">
        {availableItems.map((p) => (
          <button
            key={p.name}
            onClick={() => handleMoveToCategory(p)}
            className="item"
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="product-col border-l border-r border-gray-300">
        <p className="item bg-gray-300 font-medium text-black w-full rounded-none! border-0!">
          Fruit
        </p>
        {fruits.map((p) => (
          <button
            key={p.name}
            onClick={() => handleReturnToMain(p)}
            className="item"
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="product-col border-l border-r border-gray-300">
        <p className="item bg-gray-300 font-medium text-black w-full rounded-none! border-0!">
          Vegetable
        </p>
        {vegetables.map((p) => (
          <button
            key={p.name}
            onClick={() => handleReturnToMain(p)}
            className="item"
          >
            {p.name}
          </button>
        ))}
      </div>
    </main>
  );
};

export default AutoDeleteTodoList;
