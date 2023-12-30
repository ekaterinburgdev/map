export function getYearNameByValue(year: number) {
    const lastDigit = year % 10;
    const lastTwoDigits = year % 100;

    switch (lastTwoDigits) {
        case 11:
        case 12:
        case 13:
        case 14:
            return 'лет';
        default:
            break;
    }

    switch (lastDigit) {
        case 1:
            return 'год';
        case 2:
        case 3:
        case 4:
            return 'года';
        default:
            return 'лет';
    }
}
