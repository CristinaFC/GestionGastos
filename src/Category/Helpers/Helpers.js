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

    //Comprobar si existe un registro de gastos para la categoría en la fecha del gasto
    const monthIndex = category.monthlyExpenses?.findIndex(monthlyExpense =>
        monthlyExpense.month === expenseMonth && monthlyExpense.year === expenseYear
    );

    if (!category.monthlyExpenses) category.monthlyExpenses = [];

    //Si la hay, se actualiza el total de gastos 
    if (monthIndex !== -1)
    {
        category.monthlyExpenses[monthIndex].total += parseInt(amount);
        total = category.monthlyExpenses[monthIndex].total;
        const actualDate = new Date();
        limit = category.monthlyExpenses[monthIndex].limit;

        if (expenseMonth > actualDate.getMonth() + 1 && expenseYear >= actualDate.getFullYear())
        {
            //Obtengo los valores del mes actual
            const actualMonthIndex = category.monthlyExpenses?.findIndex(monthlyExpense =>
                monthlyExpense.month === actualDate.getMonth() + 1 && monthlyExpense.year === actualDate.getFullYear()
            );

            //Si el límite es diferente, se actualiza al actual en caso de que exista
            if (actualMonthIndex !== -1 && category.monthlyExpenses[monthIndex].limit !== category.monthlyExpenses[actualMonthIndex].limit)
                category.monthlyExpenses[monthIndex].limit = category.monthlyExpenses[actualMonthIndex].limit;
            //Si no se busca el mes anterior al del gasto que contenga un límite
            else category.monthlyExpenses[monthIndex].limit = setLimit(category, expDate)
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
    let actualMonth = new Date().getMonth()
    let actualYear = new Date().getFullYear()

    return month > actualMonth && year >= actualYear
}
const isLimitReached = (amount, limit) =>
{
    return limit > 0 && amount > limit;
}

module.exports = { updateCategoryAmount }