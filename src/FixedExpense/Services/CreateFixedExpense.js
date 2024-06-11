
const User = require('../../Auth/Model/User')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException');
const FixedExpense = require('../Model/FixedExpense');
const Category = require('../../Category/Model/Category');
const Account = require('../../Account/Model/Account');
const { calculateNextInsertion } = require('../Helpers/Helpers');
const createExpense = require('../../Expense/Services/CreateExpense');

const createFixedExpense = async (user, props, session) =>
{
    let { initDate, amount, account, category, concept, period, hasEndDate, endDate, } = props;

    const userExists = await User.findById(user);
    if (!userExists) throw new NotFoundException(`User with id ${user} not found`);


    const categoryFound = await Category.findById(category);

    if (!categoryFound || categoryFound.type !== "Expenses"
        || (categoryFound.user.toString() !== user.id
            && categoryFound.readOnly === false)) throw new ForbiddenException('Invalid category');

    const accountFound = await Account.findById(account);
    if (!accountFound || accountFound.user.toString() !== user.id) throw new ForbiddenException('Invalid account');

    let date = new Date(initDate)
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() < currentDate.getTime())
        throw new ForbiddenException(`The date must not be earlier than the current date`)

    const fixedExpense = new FixedExpense({
        initDate,
        amount,
        account,
        category,
        concept,
        period,
        hasEndDate,
        endDate,
        user: user.id,
    });

    await fixedExpense.save({ session });
    /**Si comienza hoy 
    * se calcula la próxima insersión 
    * y se asigna la últ. insersión a fecha de hoy
    * en caso contrario, la próx. insersión es igual a "initDate"
    */

    if (date.getTime() == currentDate.getTime())
    {
        await createExpense(user, {
            date, amount, account,
            category, concept,
            fixedExpenseRef: fixedExpense.id
        }, session)

        const nextInsertion = calculateNextInsertion(period, date)
        fixedExpense.nextInsertion = nextInsertion
        fixedExpense.lastInsertion = initDate

    } else fixedExpense.nextInsertion = initDate

    await fixedExpense.save({ session });

    return fixedExpense;

}




module.exports = createFixedExpense