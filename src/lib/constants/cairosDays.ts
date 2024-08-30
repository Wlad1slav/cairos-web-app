import React from "react";
import {Brain, Cloud, Moon, Snowflake, Star, Sun, Wind} from "lucide-react";

interface DayOfTheWeek {
    dayNumber: number,
    weekDayLocalKey: string, // key to the name of the day of the week
    dayNameLocalKey: string, // the key to the name of that particular day, what it is dedicated to
    DayIcon: React.ElementType,
};

const Monday: DayOfTheWeek = {
    dayNumber: 1,
    weekDayLocalKey: 'Понеділок',
    dayNameLocalKey: 'День Інтелекту',
    DayIcon: Brain,
};

const Tuesday: DayOfTheWeek = {
    dayNumber: 2,
    weekDayLocalKey: 'Вівторок',
    dayNameLocalKey: 'День Інтелекту',
    DayIcon: Sun,
};

const Wednesday: DayOfTheWeek = {
    dayNumber: 3,
    weekDayLocalKey: 'Середа',
    dayNameLocalKey: 'День Інтелекту',
    DayIcon: Moon,
};

const Thursday: DayOfTheWeek = {
    dayNumber: 4,
    weekDayLocalKey: 'Четвер',
    dayNameLocalKey: 'День Інтелекту',
    DayIcon: Star,
};

const Friday: DayOfTheWeek = {
    dayNumber: 5,
    weekDayLocalKey: 'П\'ятниця',
    dayNameLocalKey: 'День Інтелекту',
    DayIcon: Cloud,
};

const Saturday: DayOfTheWeek = {
    dayNumber: 6,
    weekDayLocalKey: 'Субота',
    dayNameLocalKey: 'День Інтелекту',
    DayIcon: Snowflake,
};

const Sunday: DayOfTheWeek = {
    dayNumber: 7,
    weekDayLocalKey: 'Неділя',
    dayNameLocalKey: 'День Інтелекту',
    DayIcon: Wind,
};

const cairosDays: Record<number, DayOfTheWeek> = {
    0: Sunday,
    1: Monday,
    2: Tuesday,
    3: Wednesday,
    4: Thursday,
    5: Friday,
    6: Saturday,
};

export default cairosDays;
