export default (secs) => {
    const hours = Math.floor(secs / 3600.0);
    const minutes = Math.floor((secs / 60.0) % 60.0);
    const seconds = Math.floor(secs % 60.0);

    const hoursToShowIfAny = hours < 1 ? '' : `${hours}:`;
    const minutesToShow = minutes < 10 ? `0${minutes}` : minutes;
    const secondsToShow = seconds < 10 ? `0${seconds}` : seconds;

    return `${hoursToShowIfAny}${minutesToShow}:${secondsToShow}`;
};