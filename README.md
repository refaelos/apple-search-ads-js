<p align="center">
  <a href="https://github.com/refaelos/apple-search-ads-js">
    Apple Search Ads for Node.JS
  </a>
</p>

<p align="center">
  Opinionated Apple Search Ads API client library for Javascript
</p>

<a href="https://www.npmjs.com/package/apple-search-ads-js">
  <img alt="npm" src="https://img.shields.io/npm/v/apple-search-ads-js?style=flat-square">
</a>

## Installation
``` bash
$ npm install apple-search-ads-js
```

## Features
* Built according to the latest [Apple Search Ads Docs](https://developer.apple.com/documentation/apple_search_ads)
* This library offers an opinionated execution to the ASA API.


## Example
``` javascript
const AsaApi = require('apple-search-ads-js');
const Certificate = AsaApi.Certificate;
const ASAApiError = AsaApi.ASAApiError;

const asaApi = new AsaApi('<org-id-here>', new Certificate(
    '<your-pem>.pem',
    '<your-key>.key'
));

(async () => {
    try {
        const selector = {
            conditions: [
                {field: 'status', operator: 'EQUALS', values: ['ENABLED']}
            ]
        };
        
        // retrieve enabled campaigns with 15 results per page
        const resp = await asaApi.campaigns.find(selector, {pageSize: 15});
        const campaigns = resp.results;

        while (campaigns && campaigns.length > 0) {
            for (let campaign of campaigns) {
                // Do something with campaign
                console.log(`Fetched campaign: ${campaign.name}`);
            }
    
            if (cResp.next) {
                cResp = await cResp.next();
                campaigns = cResp.results;
            } else {
                campaigns = undefined;
            }
        }
    } catch (err) {
        if (err instanceof ASAApiError) {
            err.print(console);
        }
        throw err;
    }
});
``` 

## Usage
### Authentication
(based on [Apple Search Ads Authentication docs](https://developer.apple.com/documentation/apple_search_ads/authenticating_with_the_apple_search_ads_api))

#### Generate an API Certificate
To establish SSL authentication, do the following steps:

1. Click on the upper right-hand carrot and select Settings.
2. Click on API tab, then select Create API Certificate.
3. Select certificate permissions based on roles. For more information, refer to the roleNames field in the UserAcl object.
4. Click Create.
5. To download the API certificate, select Action, then Download.

> **Note:** 
> Certificates expire after _24 months_, at which time you can download a new PEM and key.

#### Grab your org id
Your OrgId is the account id shown when you click on your name in the top right corner in Apple Search Ads UI. 

#### Use the downloaded pem and key when initializing
``` javascript
const asaApi = new AsaApi('<org-id>', new Certificate(
    '<your-pem>.pem',
    '<your-key>.key'
));
```

