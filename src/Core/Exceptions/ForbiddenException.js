class ForbiddenException extends Error
{
    constructor(message)
    {
        super(message);
    }
}


module.exports = ForbiddenException