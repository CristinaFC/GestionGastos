const NotFoundException = require("../../../Core/Exceptions/NotFoundException")
const catchAsync = require("../../../Core/Exceptions/Utils/CatchAsync")

const cascadeDelete = async (Model, userId, session) =>
{

    const documents = await Model.find({ user: userId }).session(session)

    if (documents.length === 0) throw new NotFoundException('No se encontraron documentos');

    for (const doc of documents) await Model.deleteOne({ _id: doc._id }).session(session);

    return

}

module.exports = catchAsync(cascadeDelete) 