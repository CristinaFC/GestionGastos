class InvalidRefreshTokenException extends Error
{
    constructor(message)
    {
        super(message);
    }
}


module.exports = InvalidRefreshTokenException