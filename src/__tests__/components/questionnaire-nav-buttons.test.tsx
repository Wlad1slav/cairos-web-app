import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QuestionnaireNavButtonsProps } from '@/lib/types';
import QuestionnaireNavButtons from "@/components/questionnaire/questionnaire-nav-buttons";
import { questionnaireSequence } from "@/config/questionnaire.config";

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(() => '/profile/questionnaire/mood')
}));

describe('QuestionnaireNavButtons', () => {
    const defaultProps: QuestionnaireNavButtonsProps = {
        continueDisabled: false,
        submitting: false,
        onContinue: jest.fn(),
        enableNext: true,
    };

    it('Renders the "Назад" and "Продовжити" buttons', () => {
        render(<QuestionnaireNavButtons {...defaultProps} />);

        const backButton = screen.getByRole('button', { name: /Назад/i });
        const continueButton = screen.getByRole('button', { name: /Продовжити/i });

        expect(backButton).toBeInTheDocument();
        expect(continueButton).toBeInTheDocument();
    });

    it('Renders the "Пропустити" button when enableNext is true and not on the last question', () => {
        render(<QuestionnaireNavButtons {...defaultProps} />);

        const skipButton = screen.getByRole('link', { name: /Пропустити/i });
        expect(skipButton).toBeInTheDocument();
        expect(skipButton).toHaveAttribute('href', `/profile/questionnaire/${questionnaireSequence[1]}`);
    });

    it('Does not render the "Пропустити" button when enableNext is false', () => {
        render(<QuestionnaireNavButtons {...defaultProps} enableNext={false} />);

        const skipButton = screen.queryByRole('link', { name: /Пропустити/i });
        expect(skipButton).not.toBeInTheDocument();
    });

    it('Disables the "Продовжити" button when continueDisabled is true', () => {
        render(<QuestionnaireNavButtons {...defaultProps} continueDisabled={true} />);

        const continueButton = screen.getByRole('button', { name: /Продовжити/i });
        expect(continueButton).toBeDisabled();
    });

    it('Renders the "Закінчити" button when on the last question', () => {
        // Redefining the link on which the test takes place
        jest.mocked(require('next/navigation').usePathname)
            .mockReturnValue(`/profile/questionnaire/${questionnaireSequence[questionnaireSequence.length - 1]}`);

        render(<QuestionnaireNavButtons {...defaultProps} enableNext={false} />);

        const finishButton = screen.getByRole('link', { name: /Закінчити/i });
        expect(finishButton).toBeInTheDocument();
        expect(finishButton).toHaveAttribute('href', '/profile/');
    });
});
