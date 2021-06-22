import React from 'react';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { useSelector, useDispatch } from 'react-redux';

import { setCategory, fetchPizzas } from '../redux/actions';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'alphabet' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const onSelectCategory = React.useCallback(
    (index) => {
      console.log('SELECT CATEGORY');
      dispatch(setCategory(index));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (!items.lenght) {
      dispatch(fetchPizzas());
    }
  }, [dispatch, category]);

  return (
    <div>
      <div className="container">
        <div className="content__top">
          <Categories onClickItem={onSelectCategory} items={categoryNames} />
          <SortPopup items={sortItems} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoaded
            ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            : Array(12)
                .fill(0)
                .map((_, index) => <PizzaLoadingBlock key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
