class Certificate {
    constructor(pemPath, keyPath) {
        this._pemPath = pemPath;
        this._keyPath = keyPath;
    }

    pem() {
        return this._pemPath;
    }

    key() {
        return this._keyPath;
    }
}

module.exports = Certificate;