class AlreadyExistsEntityException extends Error
{
    constructor(message)
    {
        super(message);
    }
}


module.exports = AlreadyExistsEntityException