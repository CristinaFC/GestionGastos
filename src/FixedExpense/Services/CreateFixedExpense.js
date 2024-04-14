
const User = require('../../Auth/Model/User')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException');
const FixedExpense = require('../Model/FixedExpense');
const Category = require('../../Category/Model/Category');
const Account = require('../../Account/Model/Account');
const { isValidObjectId } = require('mongoose');
const { ObjectId } = require('mongodb');
const Periods = require('../../Core/Enumeration/Periods');
const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');
const Expense = require('../../Expense/Model/Expense');
const { calculateNextInsertion } = require('../Helpers/Helpers');
const createRecipient = require('../../Recipient/Services/CreateRecipient');
const Recipient = require('../../Recipient/Model/Recipient');
const createExpense = require('../../Expense/Services/CreateExpense');

const createFixedExpense = async (user, props) =>
{
    let { initDate, amount, account, category, concept, period, hasEndDate, endDate, recipient } = props;

    const userExists = await User.findById(user);
    if (!userExists) throw new NotFoundException(`User with id ${user} not found`);

    const recipientId = await getRecipientId(user, recipient);

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
        recipient: recipientId
    });

    await fixedExpense.save();
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
            recipientId,
            fixedExpenseRef: fixedExpense.id
        })

        const nextInsertion = calculateNextInsertion(period, date)
        fixedExpense.nextInsertion = nextInsertion
        fixedExpense.lastInsertion = initDate

    } else fixedExpense.nextInsertion = initDate

    await fixedExpense.save();

    return fixedExpense;

}


const getRecipientId = async (user, recipient) =>
{
    let recipientId;

    if (recipient)
    {
        if (isValidObjectId(recipient))
        {
            const recipientExists = await Recipient.findById(recipient);
            if (!recipientExists)
                throw new NotFoundException(`Recipient with id ${recipient} not found`);
            recipientId = recipient;
        } else
            recipientId = await createRecipient(user, recipient).uid;
    }

    return recipientId;
};

module.exports = createFixedExpense