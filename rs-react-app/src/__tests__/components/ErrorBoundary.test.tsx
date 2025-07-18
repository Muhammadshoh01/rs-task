import { render, screen } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import { ErrorBoundary } from '../../components/ErrorBoundary'
import React from 'react'
import userEvent from '@testing-library/user-event'

class SafeComponent extends React.Component {
    render() {
        return <h1>Safe Component</h1>
    }
}
class ProblemComponent extends React.Component {
    render(): never {
        throw new Error('Error happened')
    }
}

describe('ErrorBoundary', () => {
    it('should render child component when component is error free', () => {
        render(
            <ErrorBoundary>
                <SafeComponent />
            </ErrorBoundary>
        )

        expect(screen.getByText("Safe Component")).toBeInTheDocument()
    })

    it('should render fallback ui when child component has error', () => {
        render(
            <ErrorBoundary>
                <ProblemComponent />
            </ErrorBoundary>
        )

        expect(screen.getByText("Something went wrong.")).toBeInTheDocument()
        expect(screen.getByText('Error happened')).toBeInTheDocument()
        expect(screen.getByRole('button')).toHaveTextContent(/reset/i)
    })

    it('should reset error when reset button is clicked', async () => {
        render(
            <ErrorBoundary>
                <ProblemComponent />
            </ErrorBoundary>
        )

        const user = userEvent.setup()
        await user.click(screen.getByRole('button', { name: /reset/i }))

    })
})