const Periods = require("../../Core/Enumeration/Periods");

const calculateNextInsertion = (period, date) =>
{
    let next = new Date(date);
    if (period == Periods.Diario)
        next.setDate(date.getDate() + 1)
    else if (period == Periods.Semanal)
        next.setDate(date.getDate() + 7)
    else if (period == Periods.Mensual)
        next.setMonth(date.getMonth() + 1)
    else if (period == Periods.Anual)
        next.setFullYear(date.getFullYear() + 1)
    return next
}

module.exports = {
    calculateNextInsertion
}