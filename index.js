const https = require('https');
const APIs = require('./apis');
const fs = require('fs');
const axios = require('axios');
const Utils = require('./util');

class AsaApi {

    static Certificate = Utils.Certificate;
    static ASAApiError = Utils.ASAApiError;

    campaigns = new APIs.Campaigns(this);
    adgroups = new APIs.AdGroups(this);
    keywords = new APIs.Keywords(this);
    reports = new APIs.Reports(this);
    search = new APIs.Search(this);

    constructor(orgId, certificate) {
        this._orgId = orgId;
        this._certificate = certificate;
        this._v = 'v3';

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

    get(path, queryParams) {
        try {
            return this._client.get(path, {params: Object.assign({limit: 1000, offset: 0}, queryParams)});
        } catch (e) {
            throw new Utils.ASAApiError(e);
        }
    }

    post(path, body) {
        try {
            return this._client.post(path, body);
        } catch (e) {
            throw new Utils.ASAApiError(e);
        }
    }

    async put(path, body) {
        try {
            const res = await this._client.put(path, body)
            return res.data.data;
        } catch (e) {
            throw new Utils.ASAApiError(e);
        }
    }

    async delete(path) {
        try {
            const res = await this._client.delete(path);
            return res.data.data;
        } catch (e) {
            throw new Utils.ASAApiError(e);
        }
    }
}

module.exports = AsaApi;