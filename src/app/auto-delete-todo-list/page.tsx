"use client";
import { products } from "@/data/products";
import { ProductItem } from "@/interface/product-interfaces";
import { useEffect, useRef, useState } from "react";

const RETURN_DELAY = 5000;

const AutoDeleteTodoList = () => {
  const [availableItems, setAvailableItems] = useState<ProductItem[]>(products);
  const [fruits, setFruits] = useState<ProductItem[]>([]);
  const [vegetables, setVegetables] = useState<ProductItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const handleMoveToCategory = (item: ProductItem) => {
    setAvailableItems((prev) => prev.filter((p) => p.name !== item.name));

    if (item.type === "Fruit") {
      setFruits((prev) => [...prev, item]);
    } else {
      setVegetables((prev) => [...prev, item]);
    }

    const timer = setTimeout(() => handleReturnToMain(item), RETURN_DELAY);
    timersRef.current.set(item.name, timer);
  };

  const handleReturnToMain = (item: ProductItem) => {
    const timer = timersRef.current.get(item.name);
    if (timer === undefined) return;
    clearTimeout(timer);
    timersRef.current.delete(item.name);

    if (item.type === "Fruit") {
      setFruits((prev) => prev.filter((p) => p.name !== item.name));
    } else {
      setVegetables((prev) => prev.filter((p) => p.name !== item.name));
    }

    setAvailableItems((prev) => [...prev, item]);
  };

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

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
