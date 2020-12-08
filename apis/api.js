module.exports = class Api {
    constructor(asaApi, urlTemplates) {
        this._asaApi = asaApi;
    }

    create(path, body) {
        return this._asaApi.post(path, body);
    }

    find(path, selector, pageSize) {
        if (pageSize) {
            selector = Object.assign(selector, {pagination: {limit: pageSize}});
        }
        return this._asaApi.post(path, selector);
    }

    get(path, pageSize, queryParams) {
        let qParams;
        if (pageSize) {
            qParams = {limit: pageSize};
        }
        if (queryParams) {
            qParams = Object.assign(qParams, queryParams);
        }
        return this._asaApi.get(path, qParams);
    }

    update(path, body) {
        return this._asaApi.put(path, body);
    }

    delete(path) {
        return this._asaApi.delete(path);
    }
}