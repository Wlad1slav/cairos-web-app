import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import CairosTelegram from "@/components/buttons/cairosTelegram";

describe('CairosTelegram button component', () => {
    it("renders correctly", () => {
        render(<CairosTelegram/>);

        const paragraph = screen.getByText('Радіч - Час Каіросу');
        expect(paragraph).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://t.me/radichcairos');
    });
});