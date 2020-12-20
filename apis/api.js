module.exports = class Api {
    constructor(asaApi, urlTemplates) {
        this._asaApi = asaApi;
    }

    create(path, body) {
        return this._asaApi.post(path, body);
    }

    async find(path, selector, pageSize, offset = 0) {
        const self = this;
        return (async function ifunc(path, selector, pageSize, offset) {
            if (pageSize) {
                selector = Object.assign(selector, {pagination: {limit: pageSize, offset}});
            }
            const res = await self._asaApi.post(path, selector);
            const pagination = res.data.pagination;
            const postResp = {results: res.data.data};
            if (pagination !== null) {
                const newOffset = pagination.startIndex + pageSize;
                if (newOffset <= pagination.totalResults) {
                    postResp.next = () => {
                        return ifunc(path, selector, pageSize, newOffset);
                    }
                }
            }
            return postResp;
        })(path, selector, pageSize, offset);
    }

    async get(path, pageSize, queryParams) {
        const self = this;
        return (async function ifunc(path, pageSize, queryParams) {
            let qParams;
            if (pageSize) {
                qParams = {limit: pageSize};
            }
            if (queryParams) {
                qParams = Object.assign(qParams, queryParams);
            }
            const res = await self._asaApi.get(path, qParams);
            const pagination = res.data.pagination;
            const postResp = {results: res.data.data};
            if (pagination !== null) {
                const offset = pagination.startIndex + queryParams.limit;
                if (offset <= pagination.totalResults) {
                    postResp.next = () => {
                        return ifunc(path, pageSize, Object.assign({}, queryParams, {offset}));
                    };
                }
            }
            return postResp;
        })(path, pageSize, queryParams);
    }

    update(path, body) {
        return this._asaApi.put(path, body);
    }

    delete(path) {
        return this._asaApi.delete(path);
    }
}