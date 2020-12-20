const Api = require('./api');
const AdGroup = require('./adgroup');

module.exports = class AdGroups extends Api {
    constructor(asaApi) {
        super(asaApi);
    }

    /**
     * Create a new ad group
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/create_an_ad_group}
     * @param {number|string} campaignId the id of the campaign to associate the ad group with
     * @param {AdGroup} adGroup the ad group to create
     * @returns {Promise<AdGroup>}
     */
    create(campaignId, adGroup) {
        return super.create(`campaigns/${campaignId}/adgroups`, adGroup);
    }

    /**
     * Fetches ad groups within a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/find_ad_groups}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {object} selector the request body that includes the [Selector]{@link https://developer.apple.com/documentation/apple_search_ads/selector}.
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<AdGroup>}>}
     */
    find(campaignId, selector, {pageSize = 1000} = {}) {
        return super.find(`campaigns/${campaignId}/adgroups/find`, selector, pageSize);
    }

    /**
     * Fetches a specific ad group with a campaign and ad group identifier.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_an_ad_group}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the ad group to fetch
     * @returns {Promise<AdGroup>}
     */
    get(campaignId, adGroupId) {
        return super.get(`campaigns/${campaignId}/adgroups/${adGroupId}`);
    }

    /**
     * Fetches all ad groups with a campaign identifier.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_all_ad_groups}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number} pageSize the size of each page in the returned results
     * @returns {Promise<{next: function, results: Array<AdGroup>}>}
     */
    getAll(campaignId, {pageSize = 1000} = {}) {
        return super.get(`campaigns/${campaignId}/adgroups`, pageSize);
    }

    /**
     * Update an existing ad group
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/update_an_ad_group}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the ad group to fetch
     * @param {AdGroup.UpdateRequest} adGroupUpdateRequest array of AdGroup.UpdateRequest
     * @returns {Promise<AdGroup>}
     */
    update(campaignId, adGroupId, adGroupUpdateRequest) {
        return super.update(`campaigns/${campaignId}/adgroups/${adGroupId}`, adGroupUpdateRequest)
    }

    /**
     * Delete an existing ad group
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/delete_an_ad_group}
     * @param {number|string} campaignId the id of the associated campaign
     * @param {number|string} adGroupId the id of the ad group to delete
     * @returns {*}
     */
    delete(campaignId, adGroupId) {
        return super.delete(`campaigns/${campaignId}/adgroups/${adGroupId}`);
    }
}