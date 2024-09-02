import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionnaireNavButtonsProps } from '@/lib/types';
import QuestionnaireNavButtons from "@/components/questionnaire/questionnaire-nav-buttons";

describe('QuestionnaireNavButtons', () => {
    const defaultProps: QuestionnaireNavButtonsProps = {
        continueDisabled: false,
        submitting: false,
        onContinue: jest.fn(),
        nextUrl: '/next',
        backUrl: '/back',
        enableNext: true,
        end: false,
    };

    it('Renders the "Назад" and "Продовжити" buttons', () => {
        render(<QuestionnaireNavButtons {...defaultProps} />);

        const backButton = screen.getByRole('link', { name: /Назад/i });
        const continueButton = screen.getByRole('button', { name: /Продовжити/i });

        expect(backButton).toBeInTheDocument();
        expect(backButton).toHaveAttribute('href', '/back');
        expect(continueButton).toBeInTheDocument();
    });

    it('Renders the "Пропустити" button when enableNext is true and end is false', () => {
        render(<QuestionnaireNavButtons {...defaultProps} />);

        const skipButton = screen.getByRole('link', { name: /Пропустити/i });
        expect(skipButton).toBeInTheDocument();
        expect(skipButton).toHaveAttribute('href', '/next');
    });

    it('Does not render the "Пропустити" button when enableNext is false', () => {
        render(<QuestionnaireNavButtons {...defaultProps} enableNext={false} />);

        const skipButton = screen.queryByRole('link', { name: /Пропустити/i });
        expect(skipButton).not.toBeInTheDocument();
    });

    it('Renders the "Закінчити" button when end is true', () => {
        render(<QuestionnaireNavButtons {...defaultProps} end={true} />);

        const finishButton = screen.getByRole('link', { name: /Закінчити/i });
        expect(finishButton).toBeInTheDocument();
        expect(finishButton).toHaveAttribute('href', '/next');
    });

    it('Disables the "Продовжити" button when continueDisabled is true', () => {
        render(<QuestionnaireNavButtons {...defaultProps} continueDisabled={true} />);

        const continueButton = screen.getByRole('button', { name: /Продовжити/i });
        expect(continueButton).toBeDisabled();
    });

    it('Displays a loader when submitting is true', () => {
        render(<QuestionnaireNavButtons {...defaultProps} submitting={true} />);

        const continueButton = screen.getByRole('button', { name: /Продовжити/i });
        expect(continueButton).toBeDisabled();
    });

    it('Calls onContinue when the "Продовжити" button is clicked', () => {
        render(<QuestionnaireNavButtons {...defaultProps} />);

        const continueButton = screen.getByRole('button', { name: /Продовжити/i });
        fireEvent.click(continueButton);

        expect(defaultProps.onContinue).toHaveBeenCalled();
    });
});
