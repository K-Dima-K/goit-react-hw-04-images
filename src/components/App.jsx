import { Component } from 'react';

import { searchImages } from '../servises/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImages(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...data],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  openImage = img => {
    this.setState({
      currentImage: img,
    });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { searchImages, loadMore, openImage, closeModal } = this;
    const { items, error, loading, currentImage } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchImages} />
        <ImageGallery items={items} openImage={openImage} />
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {Boolean(items.length) && !loading && <Button loadMore={loadMore} />}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={closeModal} />
        )}
      </div>
    );
  }
}
