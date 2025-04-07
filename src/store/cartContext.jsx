import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    //make a copy of items array
    const updatedItems = [...state.items];

    //check if item exists in cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //if items exists update quantity by one else push item with quantity set to one
    if (existingCartItemIndex > -1) {
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    //check if item exists in cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updateItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    cartDispatch({
      type: "ADD_ITEM",
      item,
    });
  }
  function removeItem(id) {
    cartDispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function clearCart() {
    cartDispatch({
      type: "CLEAR_CART",
    });
  }
  const cartCTX = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart,
  };

  // console.log(cartCTX);

  return (
    <CartContext.Provider value={cartCTX}>{children}</CartContext.Provider>
  );
}

export default CartContext;
