import './Gallery.scss';

import React, { useEffect } from 'react';

import { GalleryItem } from '../GalleryItem';

export function Gallery(props) {
  const { pictures, onScroll } = props;

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    if (typeof onScroll === 'function') {
      onScroll();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      <div className="gallery">
        {pictures.map(picture => (
          <GalleryItem key={picture.id} {...picture} />
        ))}
      </div>
    </div>
  );
}
