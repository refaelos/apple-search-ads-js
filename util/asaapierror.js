module.exports = class ASAApiError extends Error {
    constructor(err) {
        super(err.message);
        this.errors = err.response.data.error.errors;
    }

    print(logger = console) {
        this.errors.forEach(error => {
            logger.error(error.message);
        });
    }
}