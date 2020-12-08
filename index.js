const https = require('https');
const APIs = require('./apis');
const fs = require('fs');
const axios = require('axios');
const ASAApiError = require('./util/asaapierror');

class AsaApi {

    campaigns = new APIs.Campaigns(this);
    adgroups = new APIs.AdGroups(this);
    keywords = new APIs.Keywords(this);
    reports = new APIs.Reports(this);
    search = new APIs.Search(this);

    constructor(orgId, certificate) {
        this._orgId = orgId;
        this._certificate = certificate;
        this._v = 'v3';

        this._defaultQueryParams = {limit: 1000, offset: 0};

        this._httpsAgent = new https.Agent({
            rejectUnauthorized: false,
            cert: fs.readFileSync(this._certificate.pem()),
            key: fs.readFileSync(this._certificate.key())
        })

        this._client = axios.create({
            baseURL: `https://api.searchads.apple.com/api/${this._v}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `orgId=${this._orgId}`
            },
            httpsAgent: this._httpsAgent
        });
    }

    async get(path, queryParams) {
        const self = this;
        const res = await this._client.get(path, {params: Object.assign({}, this._defaultQueryParams, queryParams)})
        const pagination = res.data.pagination;
        if (pagination !== null) {
            const offset = pagination.startIndex + queryParams.limit;
            if (offset <= pagination.totalResults) {
                res.data.next = () => {
                    return self.get(path, Object.assign({}, queryParams, {offset}));
                };
            }
        }
        return res.data;
    }

    async post(path, body) {
        const self = this;
        try {
            const res = await this._client.post(path, body)
            const pagination = res.data.pagination;
            const bodyPagination = body.pagination ? body.pagination : (body.selector ? body.selector.pagination : null);
            if (pagination !== null && bodyPagination) {
                bodyPagination.offset = pagination.startIndex + bodyPagination.limit;
                if (bodyPagination.offset <= pagination.totalResults) {
                    res.data.next = () => {
                        return self.post(path, body);
                    };
                }
            }
            return res.data;
        } catch (e) {
            throw new ASAApiError(e);
        }
    }

    async put(path, body) {
        try {
            const res = await this._client.put(path, body)
            return res.data;
        } catch (e) {
            throw new ASAApiError(e);
        }
    }

    async delete(path) {
        try {
            const res = await this._client.delete(path);
            return res.data;
        } catch (e) {
            throw new ASAApiError(e);
        }
    }
}

module.exports = AsaApi;