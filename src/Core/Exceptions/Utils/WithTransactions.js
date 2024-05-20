const mongoose = require('mongoose');

const withTransaction = async (req, res, next) =>
{
    const session = await mongoose.startSession();
    session.startTransaction();
    req.session = session;

    res.on('finish', async () =>
    {
        if (res.statusCode >= 200 && res.statusCode < 400)
        {
            await session.commitTransaction();
        } else
        {
            await session.abortTransaction();
        }
        session.endSession();
    });

    next();
};

module.exports = withTransaction;
