class InvalidTokenException extends Error
{
    constructor(message)
    {
        super(message);
    }
}


module.exports = InvalidTokenException