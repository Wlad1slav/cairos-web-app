import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LeftUntilHundred from "@/components/widgets/leftUntilHundred";
import {calculateForHundredYearTime} from "@/lib/utils";

describe('LeftUntilHundred', () => {

    it('Renders the calculation for 100 years from birthdate', () => {
        // Set a fixed date for the current date to have predictable tests
        const fixedNow = new Date('2024-09-01T00:00:00.000Z');
        jest.useFakeTimers().setSystemTime(fixedNow);

        // Example birthdate
        const birthdate = new Date('2000-01-01T00:00:00.000Z');

        render(<LeftUntilHundred birthdate={birthdate} />);

        // Calculate expected values
        const {days, weeks, months, years} = calculateForHundredYearTime(birthdate);

        expect(screen.getByText(`${days} днів до 100 років!`)).toBeInTheDocument();
        expect(screen.getByText(`Вам залишилося ${years} років або ${months} місяців або ${weeks} тижнів до 100 років`)).toBeInTheDocument();

        // Restore timers
        jest.useRealTimers();
    });

    it('Handles a birthdate exactly 100 years ago', () => {
        const fixedNow = new Date('2100-01-01T00:00:00.000Z');
        jest.useFakeTimers().setSystemTime(fixedNow);

        const birthdate = new Date('2000-01-01T00:00:00.000Z');

        render(<LeftUntilHundred birthdate={birthdate} />);

        expect(screen.getByText('Ви досягли мети 😱')).toBeInTheDocument();
        expect(screen.getByText('У нас немає слів, ви просто герой! Ви стали героєм не тільки свого, але і нашого роману.')).toBeInTheDocument();

        jest.useRealTimers();
    });
});
