const ReportingRequest = require('./reportingrequest');

module.exports = class Reports {

    constructor(asaApi) {
        this._asaApi = asaApi;

        this.fetchReport = async (path, reportingRequest, pageSize, offset) => {
            const res = await this._asaApi.post(path, this.buildBody(reportingRequest, {
                pageSize,
                offset
            }));
            const pagination = res.data.pagination;
            const postResp = {
                report: res.data.data.reportingDataResponse.row,
                grandTotals: res.data.data.reportingDataResponse.grandTotals
            };
            if (pagination !== null) {
                const newOffset = pagination.startIndex + pageSize;
                if (newOffset <= pagination.totalResults) {
                    postResp.next = () => {
                        return this.fetchReport(path, reportingRequest, pageSize, newOffset);
                    }
                }
            }
            return postResp;
        }
    }

    buildBody = (
        reportingRequest,
        {pageSize = 1000, offset = 0}
    ) => {
        reportingRequest.selector = Object.assign(reportingRequest.selector, {pagination: {limit: pageSize, offset}});
        return reportingRequest;
    }

    /**
     * Fetches reports on campaigns.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_campaign_level_reports}
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @param {number} offset the numbers of rows to offest the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    getCampaignLevelReports(reportingRequest, {pageSize, offset = 0} = {}) {
        return this.fetchReport(`reports/campaigns`, reportingRequest, pageSize, offset);
    }


    /**
     * Fetches reports on ad groups within a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_ad_group_level_reports}
     * @param campaignId the associated campaign id
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @param {number} offset the numbers of rows to offset the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    getAdGroupLevelReports(campaignId, reportingRequest, {pageSize, offset} = {}) {
        return this.fetchReport(`reports/campaigns/${campaignId}/adgroups`, reportingRequest, pageSize, offset);
    }

    /**
     * Fetches reports on targeting keywords within a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_keyword_level_reports}
     * @param campaignId the associated campaign id
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @param {number} offset the numbers of rows to offset the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    getKeywordLevelReports(campaignId, reportingRequest, {pageSize, offset} = {}) {
        return this.fetchReport(`reports/campaigns/${campaignId}/keywords`, reportingRequest, pageSize, offset);
    }

    /**
     * Fetches reports on search terms used in a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_search_terms_level_reports}
     * @param campaignId the associated campaign id
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @param {number} offset the numbers of rows to offset the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    getSearchTermLevelReports(campaignId, reportingRequest, {pageSize, offset} = {}) {
        return this.fetchReport(`reports/campaigns/${campaignId}/searchterms`, reportingRequest, pageSize, offset);
    }

    /**
     * Fetches reports on Creative Sets used within a campaign.
     * ASA Docs: {@link https://developer.apple.com/documentation/apple_search_ads/get_creative_set_level_reports}
     * @param campaignId the associated campaign id
     * @param {ReportingRequest} reportingRequest the report attributes as defined [here]{@link https://developer.apple.com/documentation/apple_search_ads/reportingrequest}
     * @param {number} pageSize the size of a page in the results
     * @param {number} offset the numbers of rows to offset the results
     * @returns {Promise<{next: function, report: Object}>}
     */
    getCreativeSetLevelReports(campaignId, reportingRequest, {pageSize, offset} = {}) {
        return this.fetchReport(`reports/campaigns/${campaignId}/creativesets`, reportingRequest, pageSize, offset);
    }
}