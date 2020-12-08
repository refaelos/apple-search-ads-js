const DateFormat = require('dateformat');

class ReportingRequest {
    constructor(selector,
                groupBy,
                {
                    startTime = DateFormat(new Date() - (1000 * 60 * 60 * 24 * 3), 'yyyy-mm-dd'),
                    endTime = DateFormat(new Date() - (1000 * 60 * 60 * 24), 'yyyy-mm-dd'),
                    granularity = 'DAILY',
                    returnGrandTotals,
                    returnRecordsWithNoMetrics = true,
                    returnRowTotals,
                    timeZone = 'UTC'
                } = {}) {

        if (!selector || !groupBy) {
            throw new Error('selector and groupBy are required parameters. Fields in the selector must also be in groupBy. For more info see: https://developer.apple.com/documentation/apple_search_ads/reportingrequest');
        }

        if (groupBy.some(field => ['age', 'gender', 'geo'].includes(field))) {
            if (returnRowTotals || returnGrandTotals) {
                throw  new Error("returnRowTotals and returnGrandTotals can't be 'true' when age, gender or geo are in groupBy.");
            }
        }

        this.selector = selector;
        this.startTime = startTime;
        this.endTime = endTime;
        this.granularity = granularity;
        this.groupBy = groupBy;
        this.returnGrandTotals = returnGrandTotals;
        this.returnRecordsWithNoMetrics = returnRecordsWithNoMetrics;
        this.returnRowTotals = returnRowTotals;
        this.timeZone = timeZone;
    }
}

module.exports = ReportingRequest;