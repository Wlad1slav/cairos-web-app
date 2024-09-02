import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInWithGoogle from "@/components/buttons/signInGoogle";
import { signIn } from 'next-auth/react';

// Mock the signIn function from next-auth/react
jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}));

describe('SignInWithGoogle', () => {
    it('Renders the button with the Google logo and correct text', () => {
        render(<SignInWithGoogle />);

        const button = screen.getByRole('button', { name: /Увійти з Google/i });
        expect(button).toBeInTheDocument();

        const logo = screen.getByAltText('google logo');
        expect(logo).toBeInTheDocument();
        // expect(logo).toHaveAttribute('src', expect.stringContaining('/assets/images/Google__G__logo.svg.webp'));

        const text = screen.getByText('Увійти з Google');
        expect(text).toBeInTheDocument();
    });

    it('Calls signIn function with "google" provider when the button is clicked', async () => {
        render(<SignInWithGoogle />);

        const button = screen.getByRole('button', { name: /Увійти з Google/i });

        fireEvent.click(button);

        expect(signIn).toHaveBeenCalledWith('google');
    });
});
