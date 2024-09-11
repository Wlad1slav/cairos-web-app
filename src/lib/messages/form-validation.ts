export const validationMin = (num: number, label: string) => ({
    message: `${label} має містити не менше ${num} символів`
});

export const validationMax = (num: number, label: string) => ({
    message: `${label} має містити не більше ${num} символів`
});

export const invalidEmail = {message: 'Некоректна електрона адреса'};
