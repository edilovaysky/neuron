import './Loading.scss';

import React from 'react';

export function Loading() {
  return (
    <div className="cssload-loader">
      <div className="cssload-inner cssload-one"></div>
      <div className="cssload-inner cssload-two"></div>
      <div className="cssload-inner cssload-three"></div>
    </div>
  );
}
