const getTemp = (temp) => {
    return `${Math.trunc(temp - 273)}°C`;
};
const capitalizer = (str) => {
    return str[0].toUpperCase() + str.slice(1);
};

export { getTemp, capitalizer };