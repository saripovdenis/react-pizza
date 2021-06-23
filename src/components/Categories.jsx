import React from 'react';
import PropTypes from 'prop-types';

const Categories = React.memo(({ activeCategoryIndex, items, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategoryIndex === null ? 'active' : ''}
          onClick={() => {
            onClickCategory(null);
          }}>
          Все
        </li>
        {items &&
          items.map((name, index) => (
            <li
              className={activeCategoryIndex === index ? 'active' : ''}
              onClick={() => {
                onClickCategory(index);
              }}
              key={`${name}_${index}`}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  // activeCategoryIndex: PropTypes.oneOf([PropTypes.number, null]).isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Categories.defaultProps = {
  activeCategoryIndex: null,
  items: [],
};

export default Categories;
