const Api = require('./api');
const NegativeKeyword = require('./negativekeyword');

module.exports = class AdGroupNegativeKeywords extends Api {
    constructor(asaApi) {
        super(asaApi);
    }

    /**
     * Creates negative keywords in a specific ad group.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/create_ad_group_negative_keywords}
     * @param {number|string} campaignId the id of the campaign to associate the keyword with
     * @param {number|string} adGroupId the id of the ad group to associate the keyword with
     * @param {Array<NegativeKeyword>} negativeKeywords the negative keywords to create
     * @returns {Promise<Array<NegativeKeyword>>}
     */
    async create(campaignId, adGroupId, negativeKeywords) {
        const resp = await super.create(`campaigns/${campaignId}/adgroups/${adGroupId}/negativekeywords/bulk`, negativeKeywords);
        return resp.data;
    }

    /**
     * Fetches negative keywords in ad groups.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/find_ad_group_negative_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {object} selector the request body that includes the [Selector]{@link https://developer.apple.com/documentation/apple_search_ads/selector}.
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<NegativeKeyword>}>}
     */
    async find(campaignId, selector, {pageSize = 1000} = {}) {
        const resp = await super.find(`campaigns/${campaignId}/adgroups/negativekeywords/find`, selector, pageSize);
        return {results: resp.data, next: resp.next};
    }

    /**
     * Fetches a specific negative keyword in an ad group.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_an_ad_group_negative_keyword}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the associated ad group
     * @param {number|string} negativeKeywordId the id of the negative keyword to fetch
     * @returns {Promise<NegativeKeyword>}
     */
    async get(campaignId, adGroupId, negativeKeywordId) {
        const resp = await super.get(`campaigns/${campaignId}/adgroups/${adGroupId}/negativekeywords/${keywordId}`);
        return resp.data;
    }

    /**
     * Fetches all ad group negative keywords in ad groups.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_all_ad_group_negative_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the associated ad group
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<NegativeKeyword>}>}
     */
    async getAll(campaignId, adGroupId, {pageSize = 1000} = {}) {
        const resp = await super.get(`campaigns/${campaignId}/adgroups/${adGroupId}/negativekeywords`, pageSize);
        return {results: resp.data, next: resp.next};
    }

    /**
     * Updates targeting keywords in ad groups.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/update_ad_group_negative_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the ad group to fetch
     * @param {NegativeKeyword.UpdateRequest} negativeKeywordUpdateRequests array of NegativeKeyword.UpdateRequest
     * @returns {Promise<Array<NegativeKeyword>>}
     */
    async update(campaignId, adGroupId, negativeKeywordUpdateRequests) {
        const resp = await super.update(`campaigns/${campaignId}/adgroups/${adGroupId}/negativekeywords/bulk`, negativeKeywordUpdateRequests);
        return resp.data;
    }

    /**
     * Deletes negative keywords from an ad group.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/delete_ad_group_negative_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the ad group to fetch
     * @param {Array<number|string>} negativeKeywordIds the id of the negative keywords to delete
     * @returns {number} number of successfully deleted negative keywords
     */
    async delete(campaignId, adGroupId, negativeKeywordIds) {
        const resp = super.post(`campaigns/${campaignId}/adgroups/${adGroupId}/negativekeywords/delete/bulk`, negativeKeywordIds);
        return resp.data;
    }
}