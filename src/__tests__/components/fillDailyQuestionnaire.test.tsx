import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FillDailyQuestionnaire from '../../components/buttons/fillDailyQuestionnaire';

describe('FillDailyQuestionnaire button component', () => {
    it('Renders the button with the text "Сьогоднішній Квестінарій пройдений" when both mood and checklist are true', () => {
        render(<FillDailyQuestionnaire completion={{ mood: true, checklist: true }} />);

        const paragraph = screen.getByText('Сьогоднішній Квестінарій пройдений');
        expect(paragraph).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('Renders the button with the text "Пройти щоденний Квестінарій" when both mood and checklist are false', () => {
        render(<FillDailyQuestionnaire completion={{ mood: false, checklist: false }} />);

        const paragraph = screen.getByText('Пройти щоденний Квестінарій');
        expect(paragraph).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/profile/questionnaire/mood');
    });

    it('Renders the button with the text "Закінчити щоденний Квестінарій" when mood is true and checklist is false', () => {
        render(<FillDailyQuestionnaire completion={{ mood: true, checklist: false }} />);

        const paragraph = screen.getByText('Закінчити щоденний Квестінарій');
        expect(paragraph).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/profile/questionnaire/checklist');
    });

    it('Renders the button with the text "Закінчити щоденний Квестінарій" when mood is false and checklist is true', () => {
        render(<FillDailyQuestionnaire completion={{ mood: false, checklist: true }} />);

        const paragraph = screen.getByText('Закінчити щоденний Квестінарій');
        expect(paragraph).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/profile/questionnaire/mood');
    });
});
