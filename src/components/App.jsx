import { useState, useEffect } from 'react';
// import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { StyledApp, Message } from './App.styled';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './service/api';

export const App = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [fetchResult, setFetchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [outOfImg, setOutOfImg] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');



  useEffect(() => {
  if (!inputQuery) {
      return;
    }

    setLoading(true);
    fetchImages(inputQuery, page)
      .then(data => {
        if (data.hits.length === 0) {
          setOutOfImg(true);
        }
        setFetchResult(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
      })
      .catch(error => {
        setError(error);
        setOutOfImg(true);
      })
      .finally(() => setLoading(false));
  }, [inputQuery, page]);



  const handleFormSubmit = inputQuery => {
    setInputQuery(inputQuery);
    setFetchResult([]);
    setPage(1);
    setTotalHits(0);
    setLoading(false);
    setOutOfImg(false);
    setError(null);
    setUrl('');
  };

   const onLoadMoreClick = () => {
    setPage(prevState => (page + 1 ));
  };


  const toggleModal = url => {
    setShowModal(!showModal);
    setUrl(url);
  };

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Searchbar onSubmit={handleFormSubmit} />

        {!inputQuery && (
          <Message>
            This page is created for visual enjoyment,
            please enter something to search
            and enjoy the beautiful pictures...
          </Message>
        )}

        {loading && <Loader visible={loading} />}

        {outOfImg &&
          <Message>
          Sorry. There are no {inputQuery} images,
          enter something else...
        </Message>}

        {error && <h1>{error.message}</h1>}

        {fetchResult && (
          <ImageGallery images={fetchResult} onModal={toggleModal} />
        )}

        {showModal && <Modal onClose={toggleModal} url={url} />}

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              border: '3px solid pink',
            },
            duration: 2000,
          }}
        />
      </StyledApp>

      {fetchResult.length > 0 && fetchResult.length < totalHits && (
        <Button onClick={onLoadMoreClick}>Load More</Button>
      )}
    </>
  );
};

