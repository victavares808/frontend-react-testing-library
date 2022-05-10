import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de nav.', () => {
  test('Se links rederizam e possuem os texto Home, About e Favorite Pokemon.', () => {
    renderWithRouter(<App />);

    const homeLinkTest = screen.getByRole('link', { name: 'Home' });
    const aboutLinkTest = screen.getByRole('link', { name: 'About' });
    const favPokemonsLinkTest = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLinkTest).toBeDefined();
    expect(aboutLinkTest).toBeDefined();
    expect(favPokemonsLinkTest).toBeDefined();
  });

  test('Se a aplicação é redirecionada para a página inicial em Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
