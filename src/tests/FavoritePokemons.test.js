import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavPokemon = screen.getByText(/no favorite pokemon found/i);
    expect(noFavPokemon).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25'); /* emula nova entrada no histórico em 'More Details' */
    const favPokemonCb = screen.getByRole('checkbox');
    userEvent.click(favPokemonCb);
    history.push('/favorites'); /* emula nova entrada no histórico em 'Favorites' */
    const favoritePokemon = screen.getByText(/Pikachu/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
