import React from 'react';
import type { Pokemon } from '../types';

type Props = {
  pokemon: Pokemon;
};

export class Card extends React.Component<Props> {
  render() {
    const { name, base_experience, sprites } = this.props.pokemon;
    return (
      <div data-testid="pokemon-card" className="bg-white shadow rounded p-4 text-center">
        <img src={sprites.front_default} alt={name} className="mx-auto" />
        <h3 className="text-lg font-bold mt-2">{name}</h3>
        <p>Base EXP: {base_experience}</p>
      </div>
    );
  }
}
