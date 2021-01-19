import { Component } from 'react';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import imagesAPI from './services/pixabay-api';
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    largeImageURL: '',
    alt: '',
    isLoading: false,
    showModal: false,
    totalImages: 0,
  };

  handleFormSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      totalImages: 0,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      this.getImages();
    }
  }

  getImages = () => {
    const { query, page } = this.state;

    this.toggleLoader();

    return imagesAPI
      .fetchImages(query, page)
      .then(({ hits, total }) => {
        if (query === ' ') {
          toast.warning('Enter valid query.');
          return;
        }

        if (total === 0) {
          toast.dark('Nothing was found. Enter another query.');
          return;
        }

        if (page === 1) {
          toast.success(`${total} images was found.`);
        }

        this.setState(({ images }) => ({
          images: [...images, ...hits],
          totalImages: total - images.length,
        }));
      })
      .finally(() => {
        this.toggleLoader();
      });
  };

  handleChangePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  onLoadMore = () => {
    this.handleChangePage();

    setTimeout(() => {
      this.getImages();
    }, 400);

    this.scrollTo();
  };

  scrollTo = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 150,
        behavior: 'smooth',
      });
    }, 1000);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = e => {
    const { source } = e.target.dataset;
    const { alt } = e.target;

    this.setState({
      largeImageURL: source,
      alt: alt,
    });

    this.toggleModal();
  };

  render() {
    const {
      query,
      images,
      page,
      largeImageURL,
      alt,
      isLoading,
      showModal,
      totalImages,
    } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          query={query}
          page={page}
          images={images}
          onOpenModal={this.onOpenModal}
        />
        {isLoading && <Loader />}
        {totalImages > 11 && <Button onLoadMore={this.onLoadMore} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            alt={alt}
            onClose={this.toggleModal}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          transition={Zoom}
          hideProgressBar
        />
      </Container>
    );
  }
}

export default App;
