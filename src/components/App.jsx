import { useState, useEffect } from 'react';

import { searchImages } from '../servises/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import css from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(search, page);
          setItems(prevItems => [...prevItems, ...data]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, [search, page]);

  const onSearchImages = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const openImage = img => {
    setCurrentImage(img);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSearchImages} />
      <ImageGallery items={items} openImage={openImage} />
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {Boolean(items.length) && !loading && <Button loadMore={loadMore} />}
      {currentImage && (
        <Modal currentImage={currentImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
