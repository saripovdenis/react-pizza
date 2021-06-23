import React from 'react';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { useSelector, useDispatch } from 'react-redux';

import { setCategory, fetchPizzas, setSort } from '../redux/actions';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const onSelectCategory = React.useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [dispatch],
  );

  const onSelectSort = React.useCallback(
    (sortBy) => {
      dispatch(setSort(sortBy));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (!items.lenght) {
      dispatch(fetchPizzas(sortBy, category));
    }
  }, [dispatch, category, sortBy]);

  return (
    <div>
      <div className="container">
        <div className="content__top">
          <Categories
            activeCategoryIndex={category}
            onClickCategory={onSelectCategory}
            items={categoryNames}
          />
          <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSort={onSelectSort} />
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
