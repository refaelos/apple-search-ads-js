const Api = require('./api');
const NegativeKeyword = require('./negativekeyword');

module.exports = class CampaignNegativeKeywords extends Api {
    constructor(asaApi) {
        super(asaApi);
    }

    /**
     * Creates negative keywords for a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/create_campaign_negative_keywords}
     * @param {number|string} campaignId the id of the campaign to associate the negative keywords with
     * @param {AdGroup} negativeKeywords an {Array<NegativeKeyword>}
     * @returns {Promise<Array<NegativeKeyword>>}
     */
    create(campaignId, negativeKeywords) {
        return super.create(`campaigns/${campaignId}/negativekeywords/bulk`, negativeKeywords);
    }

    /**
     * Fetches negative keywords for campaigns.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/find_campaign_negative_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {object} selector the request body that includes the [Selector]{@link https://developer.apple.com/documentation/apple_search_ads/selector}.
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<NegativeKeyword>}>}
     */
    find(campaignId, selector, {pageSize = 1000} = {}) {
        return super.find(`campaigns/${campaignId}/negativekeywords/find`, selector, pageSize);
    }

    /**
     * Fetches a specific negative keyword in a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_a_campaign_negative_keyword}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} keywordId the id of the negative keyword to fetch
     * @returns {Promise<NegativeKeyword>}
     */
    get(campaignId, keywordId) {
        return super.get(`campaigns/${campaignId}/negativekeywords/${keywordId}`);
    }

    /**
     * Fetches all negative keywords in a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_all_campaign_negative_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<NegativeKeyword>}>}
     */
    getAll(campaignId, {pageSize = 1000} = {}) {
        return super.get(`campaigns/${campaignId}/negativekeywords`, pageSize);
    }

    /**
     * Updates negative keywords in a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/update_campaign_negative_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {Array<NegativeKeyword.UpdateRequest>} negativeKeywordUpdateRequests array of NegativeKeyword.UpdateRequest
     * @returns {Promise<Array<NegativeKeyword>>}
     */
    update(campaignId, negativeKeywordUpdateRequests) {
        return super.update(`campaigns/${campaignId}/negativekeywords/bulk`, negativeKeywordUpdateRequests);
    }

    /**
     * Deletes negative keywords from a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/delete_campaign_negative_keywords}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {Array<number|string>} negativeKeywordIds the id of the negative keywords to delete
     * @returns {number} number of successfully deleted negative keywords
     */
    delete(campaignId, negativeKeywordIds) {
        return super.post(`campaigns/${campaignId}/negativekeywords/delete/bulk`, negativeKeywordIds);
    }
}