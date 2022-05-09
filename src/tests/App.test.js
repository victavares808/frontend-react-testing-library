import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '..//renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {  
    test ('Se links rederizam e devem possuir os texto Home, About e Favorite Pokemon.', () => {
        
        renderWithRouter(<App />);

        const homeLinkTest = screen.getByRole('link', { name: 'Home' });
        const aboutLinkTest = screen.getByRole('link', { name: 'About' }); 
        const favoritePokemonsLinkTest = screen.getByRole('link', { name: 'Favorite Pokémons' }); 

        expect(homeLinkTest).toBeDefined();
        expect(aboutLinkTest).toBeDefined();
        expect(favoritePokemonsLinkTest).toBeDefined();
    });
    
    test ('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
        
       const { history } = renderWithRouter(<App />);

        const homeLink = screen.getByRole('link', { name: 'Home' });
        expect(homeLink).toBeInTheDocument();
        userEvent.click(homeLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/');
    });
    
    
    test ('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
        const { history } = renderWithRouter(<App />);

        const aboutLink = screen.getByRole('link', { name: 'About' });
        expect(aboutLink).toBeInTheDocument();
        userEvent.click(aboutLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/about');
    });
    
    
    test ('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
        const { history } = renderWithRouter(<App />);

        const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
        expect(favoriteLink).toBeInTheDocument();
        userEvent.click(favoriteLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/favorites');
    });

    test ('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
        const { history } = renderWithRouter(<App />);

        const pageNotFound = screen.getByRole('link', { name: ''})

        history.push('/pagina/que-nao-existe/');
    })

});

