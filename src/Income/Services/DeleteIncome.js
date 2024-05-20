const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')

const deleteIncome = async (incomeId, session) =>
{
    const income = await Income.findOneAndDelete({ _id: incomeId }).session(session);

    if (!income) throw new NotFoundException(`Income with the id ${incomeId} not found`)

    await updateAccountAmounts(income.account, income.user, session)

    return income
}


module.exports = deleteIncome