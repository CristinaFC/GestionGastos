const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')

const deleteIncome = async (incomeId) =>
{
    const income = await Income.findByIdAndDelete(incomeId)

    if (!income)
        throw new NotFoundException(`Income with the id ${incomeId} not found`)

    await updateAccountAmounts(income.account, income.user)

    return income
}


module.exports = deleteIncome