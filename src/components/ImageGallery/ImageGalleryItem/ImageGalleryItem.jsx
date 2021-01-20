import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ src, largeImageURL, alt, onOpenModal }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={src}
        data-source={largeImageURL}
        alt={alt}
        width="200"
        onClick={onOpenModal}
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
