const Api = require('./api');

module.exports = class Search extends Api {
    constructor(asaApi) {
        super(asaApi);
    }

    search({pageSize = 1000, query, returnOwnedApps = false} = {}) {
        if (!query && !returnOwnedApps) {
            throw new Error("You must provide 'query' when you don't choose to returnOwnedApps");
        }

        return super.get(`https://api.searchads.apple.com/api/v3/search/apps`, pageSize, {query, returnOwnedApps});
    }
}