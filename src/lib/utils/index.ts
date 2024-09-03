export * from './shadecn';

export function calculateForHundredYearTime(birthdate: Date) {
    const now = new Date();
    const hundredYearsDate = new Date(birthdate);
    hundredYearsDate.setFullYear(hundredYearsDate.getFullYear() + 100);

    const diffInMs = hundredYearsDate.getTime() - now.getTime(); // Calculation of the difference between the current date and the date of reaching 100 years

    const years = hundredYearsDate.getFullYear() - now.getFullYear();
    const months = years * 12 + (hundredYearsDate.getMonth() - now.getMonth());
    const weeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return { days, months, weeks, years };
}