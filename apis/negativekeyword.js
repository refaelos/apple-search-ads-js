class NegativeKeyword {
    constructor(text, matchType, {deleted, id, modificationTime, status} = {}) {
        this.text = text;
        this.matchType = matchType;
        this.deleted = deleted;
        this.id = id;
        this.modificationTime = modificationTime;
        this.status = status;
    }

    static UpdateRequest = class {
        constructor({text, matchType, deleted, id, modificationTime, status} = {}) {
            return new NegativeKeyword(text, matchType, {deleted, id, modificationTime, status});
        }
    }
}

module.exports = NegativeKeyword;
