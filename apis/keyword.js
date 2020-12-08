class Keyword {
    constructor(text, matchType, bidAmount, {deleted, id, modificationTime, status} = {}) {
        this.text = text;
        this.matchType = matchType;
        this.bidAmount = bidAmount;
        this.deleted = deleted;
        this.id = id;
        this.modificationTime = modificationTime;
        this.status = status;
    }

    static UpdateRequest = class {
        constructor({text, matchType, bidAmount, deleted, id, modificationTime, status} = {}) {
            return new Keyword(text, matchType, bidAmount, {deleted, id, modificationTime, status});
        }
    }
}

module.exports = Keyword;
