import { it, expect, describe } from 'vitest'
import { screen, render } from '@testing-library/react'
import { Header } from '../../components/Header'

describe('Header', () => {
    it('should render header', () => {
        render(<Header />)

        const banner = screen.getByRole('banner')
        expect(banner).toHaveTextContent(/pokemon/i)
    })
})