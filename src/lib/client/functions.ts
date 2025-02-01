export const getCents = (amount = '$0') => {
    return Math.round(Number(amount.slice(1)) * 100);
}