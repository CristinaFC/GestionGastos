const { calculateNextInsertion } = require("../../FixedExpense/Helpers/Helpers");
const FixedExpense = require("../../FixedExpense/Model/FixedExpense");
const schedule = require('node-schedule');
const Expense = require("../../Expense/Model/Expense");

const scheduleTasks = async () =>
{
    const job = schedule.scheduleJob('0 0 * * *', async function (fireDate)
    {
        //Obtener los gastos fijos activos
        const fixedExpenses = await FixedExpense.find({ status: 1 })
        const actualDate = new Date()
        actualDate.setHours(0, 0, 0, 0);
        fixedExpenses.forEach(async (fixedExp) =>
        {

            let {
                amount, user,
                account, category,
                concept,
                hasEndDate,
                dateEndOf, period,
                nextInsertion,
            } = fixedExp

            dateEndOf?.setHours(0, 0, 0, 0);


            //Si no tiene fecha final o si la fecha de finalización es posterior o igual a hoy
            if (!hasEndDate || actualDate?.getTime() <= dateEndOf?.getTime())
            {
                nextInsertion?.setHours(0, 0, 0, 0);
                /**Si la próx. inser. es hoy se añade un gasto*/
                if (nextInsertion?.getTime() === actualDate?.getTime())
                {
                    const expense = new Expense({
                        amount,
                        user,
                        account,
                        category,
                        concept,
                        date: actualDate,
                        fixedExpenseRef: fixedExp.uid
                    })
                    await expense.save()

                    let next = calculateNextInsertion(period, actualDate)
                    if (hasEndDate)
                    {
                        nextInsertion.setHours(0, 0, 0, 0);
                        endDate.setHours(0, 0, 0, 0);
                        //Si la fecha final es antes que la próx insersión, deja de ser un gasto fijo
                        if (endDate.getTime() < nextInsertion.getTime())
                            await FixedExpense.updateOne({ _id: fixedExp.id },
                                { $set: { active: 0, lastInsertion: actualDate, nextInsertion: null } })

                    } else
                    {
                        const found = await FixedExpense.findById(fixedExp.id)
                        found.lastInsertion = actualDate
                        found.active = 1
                        found.nextInsertion = next
                        await found.save()
                    }

                }

            } else if (dateEndOf?.getTime() > actualDate?.getTime())
                await FixedExpense.updateOne({ _id: fixedExp.id }, { $set: { active: 0 } })
        })
    });
    return job

}

module.exports = scheduleTasks