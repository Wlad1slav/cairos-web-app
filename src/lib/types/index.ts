export * from './props';

export type TChecks = {
    label: string;
    description: string;
};

export type TSocraticQuestioning = {
    _id?: string;
    text: string;
    imageUrl: string;
    day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    type: 'Цитата' | 'Питання' | 'Дія';
};

export type TChartData = {
    date: string;
    amount: number;
};