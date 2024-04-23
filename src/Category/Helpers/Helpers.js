const updateCategoryAmount = async (date, category, amount) =>
{
    let expDate = new Date(date)
    const expenseMonth = expDate.getMonth();
    const expenseYear = expDate.getFullYear();

    let total = 0;
    /**Solo se actualiza si el gasto se inserta en el mes actual */
    if (expenseMonth === new Date().getMonth() && expenseYear === new Date().getFullYear())
    {
        const monthIndex = category.monthlyExpenses?.findIndex(monthlyExpense =>
            monthlyExpense.month === expenseMonth && monthlyExpense.year === expenseYear
        );
        if (!category.monthlyExpenses) category.monthlyExpenses = [];

        if (monthIndex !== -1)
        {
            category.monthlyExpenses[monthIndex].total += parseInt(amount);
            total = category.monthlyExpenses[monthIndex].total;
        }
        else
        {
            category.monthlyExpenses.push({
                month: expenseMonth,
                year: expenseYear,
                total: amount
            });
            total = parseInt(amount);
        }


        await category.save();
    }
    return { total, reached: isLimitReached(total, category.limit) };
}

const isLimitReached = (amount, limit) =>
{
    return amount > limit
}

module.exports = { updateCategoryAmount }