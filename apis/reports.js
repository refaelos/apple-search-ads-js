const ReportingRequest = require('./reportingrequest');

module.exports = class Reports {

    constructor(asaApi) {
        this._asaApi = asaApi;
    }

    buildBody = (
        reportingRequest,
        {pageSize = 1000}
    ) => {
        reportingRequest.selector = Object.assign(reportingRequest.selector, {pagination: {limit: pageSize}});
        return reportingRequest;
    }

    /**
     * Fetches reports on campaigns.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_campaign_level_reports}
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    async getCampaignLevelReports(reportingRequest, {pageSize} = {}) {
        const resp = await this._asaApi.post(`reports/campaigns`, this.buildBody(reportingRequest, {pageSize}));
        return {report: resp.data.reportingDataResponse, next: resp.next};
    }


    /**
     * Fetches reports on ad groups within a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_ad_group_level_reports}
     * @param campaignId the associated campaign id
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    async getAdGroupLevelReports(campaignId, reportingRequest, {pageSize} = {}) {
        const resp = await this._asaApi.post(`reports/campaigns/${campaignId}/adgroups`, this.buildBody(reportingRequest, {pageSize}));
        return {
            report: resp.data.reportingDataResponse.row,
            grandTotals: resp.data.reportingDataResponse.grandTotals,
            next: resp.next
        };
    }

    /**
     * Fetches reports on targeting keywords within a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_keyword_level_reports}
     * @param campaignId the associated campaign id
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    async getKeywordLevelReports(campaignId, reportingRequest, {pageSize} = {}) {
        const resp = await this._asaApi.post(`reports/campaigns/${campaignId}/keywords`, this.buildBody(reportingRequest, {pageSize}));
        return {
            report: resp.data.reportingDataResponse.row,
            grandTotals: resp.data.reportingDataResponse.grandTotals,
            next: resp.next
        };
    }

    /**
     * Fetches reports on search terms used in a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_search_terms_level_reports}
     * @param campaignId the associated campaign id
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    async getSearchTermLevelReports(campaignId, reportingRequest, {pageSize} = {}) {
        const resp = await this._asaApi.post(`reports/campaigns/${campaignId}/searchterms`, this.buildBody(reportingRequest, {pageSize}));
        return {
            report: resp.data.reportingDataResponse.row,
            grandTotals: resp.data.reportingDataResponse.grandTotals,
            next: resp.next
        };
    }

    /**
     * Fetches reports on Creative Sets used within a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_creative_set_level_reports}
     * @param campaignId the associated campaign id
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    async getCreativeSetLevelReports(campaignId, reportingRequest, {pageSize} = {}) {
        const resp = await this._asaApi.post(`reports/campaigns/${campaignId}/creativesets`, this.buildBody(reportingRequest, {pageSize}));
        return {
            report: resp.data.reportingDataResponse.row,
            grandTotals: resp.data.reportingDataResponse.grandTotals,
            next: resp.next
        };
    }
}