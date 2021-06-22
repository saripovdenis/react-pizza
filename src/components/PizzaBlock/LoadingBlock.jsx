import React from 'react';
import ContentLoader from 'react-content-loader';

function LoadingBlock() {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="-46" cy="196" r="20" />
      <circle cx="130" cy="130" r="130" />
      <rect x="0" y="294" rx="3" ry="3" width="264" height="22" />
      <rect x="1" y="336" rx="6" ry="6" width="266" height="79" />
      <rect x="4" y="426" rx="5" ry="5" width="92" height="29" />
      <rect x="113" y="424" rx="18" ry="18" width="152" height="34" />
    </ContentLoader>
  );
}

export default LoadingBlock;
