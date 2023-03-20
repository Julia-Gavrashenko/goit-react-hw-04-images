import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { Header, SearchForm, SearchButton, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleInputChange = event =>
    setInputQuery(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();

    if (inputQuery.trim().replaceAll(/\s+/g, '+') === '') {
      toast('Please, enter something to search');
      return;
    }

    onSubmit(inputQuery);
    setInputQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BsSearch />
        </SearchButton>

        <Input
          type="text"
          placeholder="Search images and photos"
          value={inputQuery}
          onChange={handleInputChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
