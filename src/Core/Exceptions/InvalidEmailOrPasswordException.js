class InvalidEmailOrPasswordException extends Error
{
    constructor(message)
    {
        super(message);
    }
}


module.exports = InvalidEmailOrPasswordException