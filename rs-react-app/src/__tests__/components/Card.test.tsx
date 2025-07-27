import { it, expect, describe } from 'vitest'
import { screen, render } from '@testing-library/react'
import type { Pokemon } from '../../types'
import { Card } from '../../components/Card'


const testPokemon: Pokemon = {
    id: 45,
    name: 'bulbasaur',
    base_experience: 64,
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" }
}

describe('Card', () => {
    it('should render pokemon info', () => {

        render(<Card pokemon={testPokemon} />)

        expect(screen.getByRole('img')).toHaveAttribute('alt', testPokemon.name)
        expect(screen.getByRole('img')).toHaveAttribute('src', testPokemon.sprites.front_default)
        expect(screen.getByText(testPokemon.name)).toBeInTheDocument()
        expect(screen.getByText(/base exp: 64/i)).toBeInTheDocument()
    })
})