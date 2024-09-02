// Mock the signOut function from next-auth/react
import SignOut from "@/components/buttons/signOut";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('next-auth/react', () => ({
    signOut: jest.fn(),
}));

describe('SignOut', () => {
    it('Renders the button with correct text', () => {
        render(<SignOut/>);
        const button = screen.getByRole('button', {name: /Вийти/i });
        expect(button).toBeInTheDocument();
    });

    it('Calls signOut function when the button is clicked', async () => {
        render(<SignOut/>);
        const button = screen.getByRole('button', {name: /Вийти/i });
        fireEvent.click(button);
    });
})