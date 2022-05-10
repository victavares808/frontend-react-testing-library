import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const podekexTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(podekexTitle).toBeInTheDocument();
  });

  test('Existe dois paragrafos sobre a pokedex', () => {
    render(<About />);

    const paragraphOne = screen.getByText(/This application simulates/);
    const paragraphTwo = screen.getByText(/One can filter/);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const altText = screen.queryByAltText(/Pokédex/);
    expect(altText).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
