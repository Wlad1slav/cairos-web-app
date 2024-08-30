export class Happiness {
    // The value of happiness
    private readonly value: number;

    static MAX_VALUE = 10;
    static MIN_VALUE = 1;

    static HAPPINESS_LEVELS: Record<number, string> = {
        1: "Меланхолія 😞",
        2: "Ностальгія 😕",
        3: "Спокій 💤",
        4: "Відчуженість 😶",
        5: "Задоволення 🙂",
        6: "Радість 😊",
        7: "Натхнення 😄",
        8: "Ейфорія 😃",
        9: "Екстаз 😆",
        10: "Блаженство 😇",
    };

    constructor(value: number) {
        this.value = this.normalisation(value);
    }

    // Overwrite value in standard range
    private normalisation(value: number) {
        return Math.round(value) > Happiness.MAX_VALUE ? Happiness.MAX_VALUE
            : (Math.round(value) < Happiness.MIN_VALUE ? Happiness.MIN_VALUE : Math.round(value));
    }

    // Get the happiness level local key
    public get(): string {
        return Happiness.HAPPINESS_LEVELS[this.value];
    }
}