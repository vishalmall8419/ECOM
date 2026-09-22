import { useEffect, useState } from "react";

export const WISHLIST_KEY = "ecom-wishlist";
export const CART_KEY = "ecom-cart";
const STORE_EVENT = "ecom-store-change";

const readItems = (key) => {
  try {
    const storedItems = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(storedItems) ? storedItems : [];
  } catch {
    return [];
  }
};

const writeItems = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

export const useStoredItems = (key) => {
  const [items, setItems] = useState(() => readItems(key));

  useEffect(() => {
    const syncItems = () => setItems(readItems(key));

    window.addEventListener(STORE_EVENT, syncItems);
    window.addEventListener("storage", syncItems);

    return () => {
      window.removeEventListener(STORE_EVENT, syncItems);
      window.removeEventListener("storage", syncItems);
    };
  }, [key]);

  const updateItems = (updater) => {
    const updatedItems = updater(readItems(key));
    writeItems(key, updatedItems);
    setItems(updatedItems);
  };

  return [items, updateItems];
};

export const addToWishlist = (product) => {
  const items = readItems(WISHLIST_KEY);
  if (items.some((item) => item.id === product.id)) return items;

  const updatedItems = [...items, product];
  writeItems(WISHLIST_KEY, updatedItems);
  return updatedItems;
};

export const removeFromWishlist = (id) => {
  const updatedItems = readItems(WISHLIST_KEY).filter((item) => item.id !== id);
  writeItems(WISHLIST_KEY, updatedItems);
  return updatedItems;
};

export const addToCart = (product, quantity = 1) => {
  const items = readItems(CART_KEY);
  const existingItem = items.find((item) => item.id === product.id);
  const updatedItems = existingItem
    ? items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + quantity }
          : item,
      )
    : [...items, { ...product, quantity }];

  writeItems(CART_KEY, updatedItems);
  return updatedItems;
};

export const removeFromCart = (id) => {
  const updatedItems = readItems(CART_KEY).filter((item) => item.id !== id);
  writeItems(CART_KEY, updatedItems);
  return updatedItems;
};
