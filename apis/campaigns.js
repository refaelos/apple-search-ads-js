const Api = require('./api');
const Campaign = require('./campaign');

module.exports = class Campaigns extends Api {
    constructor(asaApi) {
        super(asaApi);
    }

    /**
     * Create a new ad group
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/create_a_campaign}
     * @param {Campaign} campaign the campaign to create
     * @returns {Promise<Campaign>}
     */
    async create(campaign) {
        const resp = await super.create('campaigns', campaign);
        return resp.data;
    }

    /**
     * Fetches campaigns with selector operators.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/find_campaigns}
     * @param {object} selector the request body that includes the [Selector]{@link https://developer.apple.com/documentation/apple_search_ads/selector}.
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<Campaign>}>}
     */
    async find(selector, {pageSize = 1000} = {}) {
        const resp = await super.find('campaigns/find', selector, pageSize);
        return {results: resp.data, next: resp.next};
    }

    /**
     * Fetches a specific campaign by campaign identifier.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_a_campaign}
     * @param {number|string} campaignId the id of the associated campaign
     * @returns {Promise<Campaign>}
     */
    async get(campaignId) {
        const resp = await super.get(`campaigns/${campaignId}`);
        return resp.data;
    }

    /**
     * Fetches all campaigns assigned to an org.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_all_campaigns}
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<Campaign>}>}
     */
    async getAll({pageSize = 1000} = {}) {
        const resp = await super.get('campaigns', pageSize);
        return {results: resp.data, next: resp.next};
    }

    /**
     * Updates a campaign with a campaign identifier.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/update_a_campaign}
     * @param {number|string} campaignId the id of the campaign to update
     * @param {Campaign.UpdateRequest} campaignUpdateRequest array of Campaign.UpdateRequest
     * @returns {Promise<Campaign>}
     */
    async update(campaignId, campaignUpdateRequest) {
        let clearGeoTargeting = false;
        if (campaignUpdateRequest.countriesOrRegions) {
            if (campaignUpdateRequest.countriesOrRegions.length) {
                clearGeoTargeting = true;
            } else {
                campaignUpdateRequest.countriesOrRegions = undefined;
            }
        }

        const body = {campaign: campaignUpdateRequest}

        if (clearGeoTargeting) {
            body.clearGeoTargetingOnCountryOrRegionChange = true;
        }

        const resp = await super.update(`campaigns/${campaignId}`, body);
        return resp.data;
    }

    /**
     * Delete an existing campaign
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/delete_a_campaign}
     * @param {number|string} campaignId the id of the campaign to delete
     * @returns {*}
     */
    delete(campaignId) {
        return super.delete(`campaigns/${campaignId}`);
    }
}