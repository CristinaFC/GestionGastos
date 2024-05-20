// const updateCategoryAmount = async (date, category, amount, session) =>
// {
//     let expDate = new Date(date)
//     const expenseMonth = expDate.getMonth() + 1;
//     const expenseYear = expDate.getFullYear();


//     let total = 0;
//     let limit;
//     const monthIndex = category.monthlyExpenses?.findIndex(monthlyExpense =>
//         monthlyExpense.month === expenseMonth && monthlyExpense.year === expenseYear
//     );

//     if (!category.monthlyExpenses) category.monthlyExpenses = [];

//     if (monthIndex !== -1)
//     {
//         category.monthlyExpenses[monthIndex].total += parseInt(amount);
//         total = category.monthlyExpenses[monthIndex].total;
//         const actualDate = new Date()
//         limit = category.monthlyExpenses[monthIndex].limit
//         //Si el gasto se añade en un mes posterior al actual, se actualiza el límite de la categoría de ese mes al actual
//         if (expenseMonth > actualDate.getMonth() + 1 && expenseYear >= actualDate.getFullYear())
//         {
//             const actualMonthIndex = category.monthlyExpenses?.findIndex(monthlyExpense =>
//                 monthlyExpense.month === actualDate.getMonth() + 1 && monthlyExpense.year === actualDate.getFullYear()
//             );
//             if (category.monthlyExpenses[monthIndex].limit !== category.monthlyExpenses[actualMonthIndex].limit)
//                 category.monthlyExpenses[monthIndex].limit = category.monthlyExpenses[actualMonthIndex].limit
//         }
//     }
//     else
//     {
//         limit = isDateLaterThanCurrent(expDate) ? setLimit(category, expDate) : 0
//         category.monthlyExpenses.push({
//             month: expenseMonth,
//             year: expenseYear,
//             total: amount,
//             limit
//         });
//         total = parseInt(amount);
//     }


//     await category.save();

//     return { total, reached: isLimitReached(total, limit), limit };
// }

const updateCategoryAmount = async (date, category, amount, session) =>
{
    let expDate = new Date(date);
    const expenseMonth = expDate.getMonth() + 1;
    const expenseYear = expDate.getFullYear();

    let total = 0;
    let limit;
    const monthIndex = category.monthlyExpenses?.findIndex(monthlyExpense =>
        monthlyExpense.month === expenseMonth && monthlyExpense.year === expenseYear
    );

    if (!category.monthlyExpenses) category.monthlyExpenses = [];

    if (monthIndex !== -1)
    {
        category.monthlyExpenses[monthIndex].total += parseInt(amount);
        total = category.monthlyExpenses[monthIndex].total;
        const actualDate = new Date();
        limit = category.monthlyExpenses[monthIndex].limit;
        if (expenseMonth > actualDate.getMonth() + 1 && expenseYear >= actualDate.getFullYear())
        {
            const actualMonthIndex = category.monthlyExpenses?.findIndex(monthlyExpense =>
                monthlyExpense.month === actualDate.getMonth() + 1 && monthlyExpense.year === actualDate.getFullYear()
            );
            if (category.monthlyExpenses[monthIndex].limit !== category.monthlyExpenses[actualMonthIndex].limit)
                category.monthlyExpenses[monthIndex].limit = category.monthlyExpenses[actualMonthIndex].limit;
        }
    } else
    {
        limit = isDateLaterThanCurrent(expDate) ? setLimit(category, expDate) : 0;
        category.monthlyExpenses.push({
            month: expenseMonth,
            year: expenseYear,
            total: amount,
            limit
        });
        total = parseInt(amount);
    }

    await category.save({ session });

    return { total, reached: isLimitReached(total, limit), limit };
};

const setLimit = (category, date) =>
{
    let index = -1;
    let month = date.getMonth()
    let year = date.getFullYear();

    while (index === -1)
    {
        index = category.monthlyExpenses?.findIndex(monthlyExpense =>
            monthlyExpense.month === month && monthlyExpense.year === year
        );
        month--
        if (month === 0)
        {
            month = 12
            year--
        }
    }
    return category.monthlyExpenses[index].limit
}

const isDateLaterThanCurrent = (expDate) =>
{
    let month = expDate.getMonth()
    let year = expDate.getFullYear();
    let actualMonth = new Date().getMonth() + 1
    let actualYear = new Date().getFullYear()

    return month > actualMonth && year > actualYear
}
const isLimitReached = (amount, limit) =>
{
    return limit > 0 && amount > limit;
}

module.exports = { updateCategoryAmount }