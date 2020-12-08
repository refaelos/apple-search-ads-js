module.exports = class ASAApiError extends Error{
    constructor(err) {
        super(err.message);
        this.errors = err.response.data.error.errors;
    }

    prettyPrint(action) {
        console.log(`${action ? `An ERROR occurred while ${action}\n` : ''}` +
        `error message: ${this.message}\n` +
        `detailed errors:\n` +
        this.errors.map(e => `\t${e.message}`).join('\n'));
    }
}