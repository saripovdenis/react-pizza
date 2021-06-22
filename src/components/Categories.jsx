import React from 'react';

const Categories = React.memo(({ activeCategoryIndex, items, onClickItem }) => {
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategoryIndex === null ? 'active' : ''}
          onClick={() => {
            onClickItem(null);
          }}>
          Все
        </li>
        {items &&
          items.map((name, index) => (
            <li
              className={activeCategoryIndex === index ? 'active' : ''}
              onClick={() => {
                onClickItem(index);
              }}
              key={`${name}_${index}`}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;
