export const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
};

export const getIsoDateString = (date) => {
    return date.toISOString().split('T')[0];
};
