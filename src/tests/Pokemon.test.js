import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

const pokeName = 'pokemon-name';
const pokeWeight = 'pokemon-weight';
const pokeType = 'pokemon-type';
const moreDetails = 'More details';
const pokeObject = pokemons[0];

describe('Teste o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokeObject } />);
    const renderName = screen.getByTestId(pokeName).innerHTML;
    expect(renderName).toBe(pokeObject.name);
    const renderType = screen.getByTestId(pokeType).innerHTML;
    expect(renderType).toBe(pokeObject.type);
    const { value, measurementUnit } = pokeObject.averageWeight;
    const pokemonWeight = screen.getByTestId(pokeWeight).innerHTML;
    const pokeWeightObj = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonWeight).toBe(pokeWeightObj);
    const pokemonImage = screen.getByAltText(`${pokeObject.name} sprite`);
    expect(pokemonImage.src).toContain(pokeObject.image);
  });

  test('Se o card do Pokémon indicado na Pokédex contém um link de navegação',
    () => {
      renderWithRouter(<App />);
      const mDetails = screen.getByRole('link', { name: moreDetails });
      expect(mDetails).toBeInTheDocument();
      expect(mDetails).toHaveAttribute('href', `/pokemons/${pokeObject.id}`);
    });

  test('Se ao clicar no link de navegação do Pokémon é feito o redirecionamento',
    () => {
      const { history } = renderWithRouter(<App />);
      const mDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(mDetails);
      expect(screen.getByText(`${pokeObject.name} Details`)).toBeInTheDocument();
      expect(history.location.pathname).toBe(`/pokemons/${pokeObject.id}`);
    });

  test('Se existe um ícone de estrela nos Pokémons favoritados',
    () => {
      renderWithRouter(<App />);
      const mDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(mDetails);
      const favoritedPokemon = screen.getByLabelText('Pokémon favoritado?');
      userEvent.click(favoritedPokemon);
      const pokemonImage = screen
        .getByAltText(`${pokeObject.name} is marked as favorite`);
      expect(pokemonImage).toHaveAttribute('src', '/star-icon.svg');
    });
});
