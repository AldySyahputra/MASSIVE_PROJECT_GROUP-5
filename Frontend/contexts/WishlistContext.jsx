import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    setWishlist((currentWishlist) => [...currentWishlist, item]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((currentWishlist) => currentWishlist.filter((item) => item.id !== id));
  };

  return <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>{children}</WishlistContext.Provider>;
};
