import axios from 'axios';

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch(setLoaded(false));
  const string = `http://localhost:3001/pizzas?${
    category !== null ? `category=${category}` : ''
  }&_sort=${sortBy.type}&_order=${sortBy.order}`;
  console.log(string);
  axios.get(string).then(({ data }) => dispatch(setPizzas(data)));
};

export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});
