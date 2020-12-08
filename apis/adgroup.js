class AdGroup {
    constructor(campaignId, name, startTime, defaultCpcBid,
                {automatedKeywordsOptIn, cpaGoal, deleted, displayStatus, endTime, id, modificationTime, orgId, servingStateReasons, servingStatus, status, targetingDimensions} = {}) {
        this.campaignId = campaignId;
        this.name = name;
        this.startTime = startTime;
        this.defaultCpcBid = defaultCpcBid;
        this.automatedKeywordsOptIn = automatedKeywordsOptIn;
        this.cpaGoal = cpaGoal;
        this.deleted = deleted;
        this.endTime = endTime;
        this.id = id;
        this.modificationTime = modificationTime;
        this.orgId = orgId;
        this.servingStateReasons = servingStateReasons;
        this.servingStatus = servingStatus;
        this.status = status;
        this.targetingDimensions = targetingDimensions;
    }

    static UpdateRequest = class {
        constructor({
                        campaignId, name, startTime, defaultCpcBid,
                        automatedKeywordsOptIn, cpaGoal, deleted, displayStatus, endTime, id, modificationTime, orgId, servingStateReasons, servingStatus, status, targetingDimensions
                    } = {}) {
            return new AdGroup(
                campaignId,
                name,
                startTime,
                defaultCpcBid,
                {
                    automatedKeywordsOptIn,
                    cpaGoal,
                    deleted,
                    displayStatus,
                    endTime,
                    id,
                    modificationTime,
                    orgId,
                    servingStateReasons,
                    servingStatus,
                    status,
                    targetingDimensions
                });
        }
    };
}

module.exports = AdGroup;