class Campaign {
    constructor(adamId, name, budgetAmount, countriesOrRegions,
                {supplySources = ['APPSTORE_SEARCH_RESULTS'], adChannelType = 'SEARCH', budgetOrders, countryOrRegionServingStateReasons, dailyBudgetAmount, deleted, displayStatus, endTime, id, locInvoiceDetails, modificationTime, orgId, paymentModel, servingStateReasons, servingStatus, status, startTime} = {}) {
        this.adamId = adamId;
        this.name = name;
        this.budgetAmount = budgetAmount;
        this.countriesOrRegions = countriesOrRegions;
        this.budgetOrders = budgetOrders;
        this.countryOrRegionServingStateReasons = countryOrRegionServingStateReasons;
        this.dailyBudgetAmount = dailyBudgetAmount;
        this.deleted = deleted;
        this.displayStatus = displayStatus;
        this.supplySources = supplySources;
        this.adChannelType = adChannelType;
        this.endTime = endTime;
        this.id = id;
        this.locInvoiceDetails = locInvoiceDetails;
        this.modificationTime = modificationTime;
        this.orgId = orgId;
        this.paymentModel = paymentModel;
        this.servingStateReasons = servingStateReasons;
        this.servingStatus = servingStatus;
        this.status = status;
        this.startTime = startTime;
    }

    static UpdateRequest = class {
        constructor({
                        name, budgetAmount, countriesOrRegions,
                        budgetOrders, dailyBudgetAmount, locInvoiceDetails, status
                    } = {}) {
            const campaign = new Campaign(
                undefined,
                name,
                budgetAmount,
                countriesOrRegions,
                {
                    budgetOrders,
                    dailyBudgetAmount,
                    locInvoiceDetails,
                    status,
                });

            delete campaign.supplySources;
            delete campaign.adChannelType;

            return campaign;
        }
    }
}

module.exports = Campaign;
