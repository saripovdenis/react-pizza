import React from 'react';
import { Route } from 'react-router';

import { useDispatch } from 'react-redux';

import { Header } from './components';
import { Home, Cart } from './pages';
import { fetchPizzas } from './redux/actions';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // axios.get('http://localhost:3001/pizzas').then(({ data }) => dispatch(setPizzas(data)));
    dispatch(fetchPizzas());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  );
}

export default App;
