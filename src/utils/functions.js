export function handleFormatPrice(number) {
    return `R$ ${(number / 100).toFixed(2).replace(".", ",")}`
}

export function getWeekDay(day) {
    const options = {
        weekday: "long",
        timeZone: "UTC"
    }
    const weekday = new Date(day).toLocaleDateString("pt-br", options);
    const weekdayFormated = weekday[0].toUpperCase() + weekday.slice(1);
    return weekdayFormated;
}

export function getDate(day) {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC"
    }
    const date = new Date(day).toLocaleDateString("pt-BR", options);
    return date;
}