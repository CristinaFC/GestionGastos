// const catchAsync = (fn) => async (req, res, next) => fn(req, res, next).catch(next)
const mongoose = require('mongoose');


const catchAsync = (fn) => async (req, res, next) =>
{
    const session = await mongoose.startSession();

    session.startTransaction();

    try
    {
        await fn(req, res, next, session);
        await session.commitTransaction();
        session.endSession();
    } catch (error)
    {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


module.exports = catchAsync
