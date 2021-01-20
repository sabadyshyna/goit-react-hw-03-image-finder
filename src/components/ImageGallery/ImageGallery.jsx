import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          largeImageURL={largeImageURL}
          onOpenModal={onOpenModal}
          alt={tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
