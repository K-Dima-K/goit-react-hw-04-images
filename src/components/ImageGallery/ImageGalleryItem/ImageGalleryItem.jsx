import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, openImage, tags }) => {
  return (
    <li
      onClick={() => openImage({ alt: tags, src: webformatURL })}
      className={css.ImageGalleryItem}
    >
      <img
        className={css.ImageGalleryItem_image}
        src={largeImageURL}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  openImage: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
