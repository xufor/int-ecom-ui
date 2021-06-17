import { vars } from './commonData';
import { has, omit } from 'lodash';
import { PLACE_ORDER } from '../actions/placeOrderAction';

export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

const cartReducer = (state = {}, action) => {
  let id;
  switch (action.type) {
    case ADD_TO_CART:
      if (has(state, action.payload.id)) {
        alert("Item is already present in the cart.");
        return state;
      }
      alert("Item added to cart.");
      return { ...state, [action.payload.id]: { ...action.payload, quantity: 1 } };
    case INCREASE_QUANTITY:
      id = action.payload;
      return {...state, [id]: { ...state[id], quantity: state[id].quantity + 1 } }
    case DECREASE_QUANTITY:
      id = action.payload; 
      if(state[id].quantity === 1)
        return omit(state, [id]);
      else
        return {...state, [id]: { ...state[id], quantity: state[id].quantity - 1 } }
    case PLACE_ORDER + vars.f:
      return {};
    default:
      return state;
  }
}

export default cartReducer;