export * from './props';

export type TChecks = {
    label: string;
    description: string;
};

export type TSocraticQuestioning = {
    text: string;
    imageUrl: string;
    day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    type: 'Цитата' | 'Питання' | 'Дія';
};