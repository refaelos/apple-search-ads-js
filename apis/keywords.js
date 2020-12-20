const Api = require('./api');
const Keyword = require('./keyword');

module.exports = class Keywords extends Api {
    constructor(asaApi) {
        super(asaApi);
    }

    /**
     * Create a new keyword
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/create_targeting_keywords}
     * @param {number|string} campaignId the id of the campaign to associate the keyword with
     * @param {number|string} adGroupId the id of the ad group to associate the keyword with
     * @param {Array<Keyword>} keywords the keywords to create
     * @returns {Promise<Keyword>}
     */
    create(campaignId, adGroupId, keywords) {
        return super.create(`campaigns/${campaignId}/adgroups/${adGroupId}/targetingkeywords/bulk`, keywords);
    }

    /**
     * Fetches keywords in ad groups.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/find_targeting_keywords_in_a_campaign}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {object} selector the request body that includes the [Selector]{@link https://developer.apple.com/documentation/apple_search_ads/selector}.
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<Keyword>}>}
     */
    find(campaignId, selector, {pageSize = 1000} = {}) {
        return super.find(`campaigns/${campaignId}/adgroups/targetingkeywords/find`, selector, pageSize);
    }

    /**
     * Fetches a specific targeting keyword in an ad group.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_an_ad_group}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the associated ad group
     * @param {number|string} keywordId the id of the keyword to fetch
     * @returns {Promise<Keyword>}
     */
    get(campaignId, adGroupId, keywordId) {
        return super.get(`campaigns/${campaignId}/adgroups/${adGroupId}/targetingkeywords/${keywordId}`);
    }

    /**
     * Fetches all targeting keywords in ad groups.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_all_targeting_keywords_in_an_ad_group}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the associated ad group
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<Keyword>}>}
     */
    getAll(campaignId, adGroupId, {pageSize = 1000} = {}) {
        return super.get(`campaigns/${campaignId}/adgroups/${adGroupId}/targetingkeywords`, pageSize);
    }

    /**
     * Updates targeting keywords in ad groups.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/update_targeting_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the ad group to fetch
     * @param {Array<Keyword.UpdateRequest>} keywordUpdateRequests array of Keyword.UpdateRequest
     * @returns {Promise<Keyword>}
     */
    update(campaignId, adGroupId, keywordUpdateRequests) {
        return super.update(`campaigns/${campaignId}/adgroups/${adGroupId}/targetingkeywords/bulk`, keywordUpdateRequests);
    }
}
