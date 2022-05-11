import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokeName = 'pokemon-name';
const nextPokemonBtn = 'next-pokemon';
const ARRAY_OF_POKEMONS = 9;

describe('Teste o componente <Pokedex.js />', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const pokeHeading = screen.getByRole('heading',
        { level: 2, name: 'Encountered pokémons' });
      expect(pokeHeading).toBeInTheDocument();
    });

  test('Se é exibido o próximo pokemon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const listOfNames = [screen.getByTestId(pokeName).innerHTML];
    const nextPokemonButton = screen.getByTestId(nextPokemonBtn);
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');
    /* toHaveTextContent - Verifica se o elemento fornecido tem um conteúdo de texto ou não.
       Quando um argumento de string é passado, ele realizará uma verificação parcial com distinção entre letras maiúsculas e minúsculas com o conteúdo do elemento.
       Se você quiser combinar todo o conteúdo, você pode usar um RegExp para fazer isso.
       Para executar uma correspondência que não diferencia maiúsculas de minúsculas, você pode usar um RegExp com o modificador /i.
    */
    for (let index = 1; index <= ARRAY_OF_POKEMONS; index += 1) {
      userEvent.click(nextPokemonButton);
      const pokemonsName = screen.getByTestId(pokeName).innerHTML;
      if (index < ARRAY_OF_POKEMONS) {
        listOfNames.push(pokemonsName);
        expect(listOfNames[listOfNames.length - 1])
          .not.toBe(listOfNames[listOfNames.length - 2]);
      } else {
        expect(pokemonsName).toBe(listOfNames[0]);
      }
    }
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByTestId(nextPokemonBtn);
    expect(screen.getAllByTestId(pokeName).length).toBe(1);
    for (let index = 2; index <= ARRAY_OF_POKEMONS; index += 1) {
      userEvent.click(nextPokemonButton);
      expect(screen.getAllByTestId(pokeName).length).toBe(1);
    }
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokeTypeList = [];
    const typeListBtn = screen.getAllByTestId('pokemon-type-button');
    typeListBtn.forEach((typeButton) => {
      userEvent.click(typeButton);
      pokeTypeList.push(typeButton.innerHTML);
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(typeButton.innerHTML).toBe(screen.getByTestId('pokemon-type').innerHTML);
      if (!screen.getByTestId(nextPokemonBtn).disabled) {
        userEvent.click(screen.getByTestId(nextPokemonBtn));
        expect(typeButton.innerHTML).toBe(screen.getByTestId('pokemon-type').innerHTML);
      }
    });
    expect(pokeTypeList.length).toBe(typeListBtn.length);
  });
  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetFilterBtn = screen.getByRole('button', { name: 'All' });
    expect(resetFilterBtn).toBeInTheDocument();
    const pokeNextbtn = screen.getByTestId(nextPokemonBtn);
    const fakeFilter = () => {
      const pokeList = [];
      for (let index = 1; index <= ARRAY_OF_POKEMONS; index += 1) {
        pokeList.push(screen.getByTestId(pokeName).innerHTML);
        userEvent.click(pokeNextbtn);
      }

      expect(pokeList.length).toBe(ARRAY_OF_POKEMONS);
    };

    fakeFilter();

    userEvent.click(resetFilterBtn);
    fakeFilter();
  });
});
