import React from 'react';

function Categories({ items, onClick }) {
  const [activeItem, setActiveItem] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {items.map((name, index) => (
          <li
            className={activeItem === index ? 'active' : ''}
            onClick={() => {
              onClick(name);
              setActiveItem(index);
            }}
            key={`${name}_${index}`}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
