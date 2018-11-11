var config = {};

//Github Info
config.githubClientId =process.env.GITHUB_CLIENT;
config.githubSecret = process.env.GITHUB_SECRET;

// SupportTeam - ContactUS
config.productEmail =process.env.PRODUCT_EMAIL;
config.productPassword =process.env.PRODUCT_PASSWORD;
config.productUserName =process.env.PRODUCT_USERNAME;

//URL
config.jenkinsUrl = process.env.JENKINS_URL;
config.reportUrl = process.env.REPORT_URL;
config.domainUrl = process.env.DOMAIN_URL;
config.webDomainUrl = process.env.WEB_DOMAIN_URL;

//chargebee
config.chargebeeSite = process.env.PRICE_SITE;
config.chargebeeApiKey = process.env.PRICE_API_KEY;

//MongoDB
config.mongoDBUrl = process.env.MONGODB_URL;

//UnWanted Config for Future use only
config.herokuSecretKey = "ca204864-9ed3-42fa-bbbc-86fd360d26a8";
config.bitbucketClientId="xQjj2sy4G887jD6XPH";
config.bitbucketsSecret = "vgKDLdaBJHDqCR92XLwYGp5w76Wdb2rQ";
config.gitlabClientId = "1c4dea8c78be986d4ed887a963f1dc5f3615b2e24adca9c35b8aa0437f3f0b75";
config.gitlabSecret = "caa19abfb490edc082cb6935cff3d9e95ee4c8d4a4113dd5619699e1e6376655";
module.exports = config;
