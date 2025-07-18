import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest'
// import { screen, render } from '@testing-library/react'
import type { Pokemon } from '../types'
import { fetchPokemonByName } from '../api'

const mockFetch = vi.fn()

beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('fetchPokemonByName', () => {

    it('should fetch pokemon by name', async () => {
        const mockData: Pokemon = {
            name: 'bulbasaur',
            base_experience: 64,
            sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" }
        }

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData)
        } as Response);

        const data = await fetchPokemonByName('bulbasaur')
        expect(data.base_experience).toBe(64)
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('bulbasaur'))
    })

    it('should throw an error when response is not ok', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: () => Promise.resolve({ message: 'Not found' })
        } as Response)

        await expect(fetchPokemonByName('unknkkkk')).rejects.toThrow('Pokemon not found: 404')
    })
})

// describe('fetchPokemonList', () => {
//     it('should fetch pokemon list by given limit and page', () => {
//         const mockData: PokemonListResponse = {
//             // next
//         }
//         mockFetch.mockResolvedValueOnce({
//             ok: true,
//             json: () => Promise.resolve(mockData)
//         } as Response);
//     })
// })