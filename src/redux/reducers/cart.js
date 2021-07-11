const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => sum + obj.price, 0);

const getTotalSum = (obj, key) => {
  const [firstKey, ...keys] = key.split('.');
  return Object.keys(obj).reduce((sum, key) => {
    const value = keys.reduce((val, key) => val[key], obj[key][firstKey]);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA': {
      const currentPizzaItems = !state.items[action.payload.id] // Есть ли эта пицца в state?
        ? [action.payload] // Если нет, то просто верни массив с этой пиццой
        : [...state.items[action.payload.id].items, action.payload]; // Если да, то верни массив со всеми данными пиццами и одной новой

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'CLEAR_CART': {
      return { items: {}, totalPrice: 0, totalCount: 0 };
    }

    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount - currentTotalCount,
        totalPrice: state.totalPrice - currentTotalPrice,
      };
    }

    case 'PLUS_CART_ITEM': {
      const newItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          },
        },
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + state.items[action.payload].items[0].price,
      };
    }

    case 'MINUS_CART_ITEM': {
      const newItems = state.items[action.payload].items.slice(1);

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          },
        },
        totalCount: state.totalCount - 1,
        totalPrice: state.totalPrice - state.items[action.payload].items[0].price,
      };
    }

    default:
      return state;
  }
};

export default cart;
