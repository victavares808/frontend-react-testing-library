import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');

    const notFoundTitle = screen.getByRole(
      'heading',
      { level: 2, name: /Page requested not found Crying emoji/i },
    );
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    render(<NotFound />);
    const queryImage = screen.getByRole(
      'img',
      { name: /pikachu crying because the page requested was not found/i },
    );
    expect(queryImage).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
