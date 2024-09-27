"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AdInsights_TopPerfoming = exports.Optimalaudience = exports.getPageFanOnline = exports.getTargetingAudienceForAd = exports.getHourlyBreakDown = exports.GetPageProfilevisit = exports.GetPageunlikesandunfollows = exports.GetNewfollowers = exports.GetPageProfilevisits = exports.fetch_Priview_FacebookData = exports.fetchInstagramData = exports.fetchFacebookData = exports.GetInterestandBehaviourAudiences = exports.GetRegionandcountry = exports.GetAgeandGender = exports.page_fan_adds = exports.GrowthPageandProfile = exports.GetNewFollows = exports.GetLocationInsights = exports.getPlatfrom = exports.getInsights = exports.getAdsetInsightsPrevious = exports.getAdsetInsights = exports.GrowthRateInsightsData = exports.getPostReachvsSpendInsightsData = exports.getAdsetInsightsData = exports.GetInterestandBehaviour = exports.fetch_Tab_Performing = exports.fetchInsights = void 0;
var envVariables_1 = require("$lib/services/NewFacebook/envVariables");
var new_page_ID = '182978528231776';
var new_page_token = 'EAATyloueTgYBO7nhzPZCmyCcZAqCpXFS5jfZA7zPZA4oZAH4vXPPactoAJfLbFfOZBckTZBZAf73rZA8AByWw8UH2ExnpR8of1XvVEAAEJiFgZBWcay0EIPbKEDPh2eDIm5QRj9xsjUMs7ZCS8HxoCoZB4KE1E2TL8MyOFTIMNsGVflzwCH7BRF7iOP2MPPZANdPsQ94SItfYntMccbZCCnSkZD';
function fetchInsights(ADSET_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + ADSET_ID + "/insights?  access_token=" + envVariables_1.FB_token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, error_1.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.fetchInsights = fetchInsights;
//---------------- performers api ----------------
function fetch_Tab_Performing(value) {
    return __awaiter(this, void 0, void 0, function () {
        var url, fields, fields, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = '';
                    if (value === 'post') {
                        fields = "message,\n             created_time,\n             likes.summary(true),\n             comments.summary(true),\n             shares.summary(true),\n             reactions.summary(true),\n             updated_time,\n             status_type,\n             picture,\n             full_picture,\n             story,\n             id";
                        url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.PAGE_ID_1 + "/posts?fields=" + fields + "&access_token=" + envVariables_1.Access_token_1;
                    }
                    else {
                        fields = "name,\n          message,\n          adcreatives{\n              effective_object_story_id,\n              body,\n              title,\n              image_url,\n              thumbnail_url\n          },\n          status,\n          insights{\n              impressions,\n              clicks,\n              spend\n          },\n          updated_time,\n          created_time";
                        url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID_1 + "/ads?fields=" + fields + "&access_token=" + envVariables_1.Access_token_1;
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error fetching Facebook posts:', error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.fetch_Tab_Performing = fetch_Tab_Performing;
exports.GetInterestandBehaviour = function () { return __awaiter(void 0, void 0, Promise, function () {
    var apiUrl, params, url, response, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID_1 + "/targetingsearch";
                params = new URLSearchParams({
                    q: 'travel',
                    type: 'adinterest',
                    access_token: envVariables_1.Access_token_1
                });
                url = apiUrl + "?" + params.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("HTTP error! status: " + response.status);
                }
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                return [2 /*return*/, data];
            case 4:
                error_3 = _a.sent();
                console.error('Error fetching targeting options:', error_3);
                throw error_3;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAdsetInsightsData = function () { return __awaiter(void 0, void 0, Promise, function () {
    var apiUrl, params, url, response, errorResponse, data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/insights";
                params = new URLSearchParams({
                    fields: 'spend,campaign_id,adset_id,ad_id,clicks,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_unique_click,cpc,cpm,cpp,ctr,frequency,impressions,inline_link_click_ctr,inline_link_clicks,reach,cost_per_action_type,action_values,unique_actions,video_30_sec_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,website_ctr',
                    breakdowns: 'age,gender',
                    time_range: '{"since":"2024-01-01","until":"2024-06-01"}',
                    action_breakdowns: 'action_type',
                    level: 'adset',
                    access_token: envVariables_1.Access_token_1
                });
                url = apiUrl + "?" + params.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                errorResponse = _a.sent();
                console.error('Error response from API:', errorResponse);
                throw new Error("HTTP error! status: " + response.status + " - " + errorResponse.error.message);
            case 4: return [4 /*yield*/, response.json()];
            case 5:
                data = _a.sent();
                return [2 /*return*/, data.data];
            case 6:
                error_4 = _a.sent();
                console.error('Error fetching adset insights:', error_4);
                throw error_4;
            case 7: return [2 /*return*/];
        }
    });
}); };
function getPostReachvsSpendInsightsData(trends_selected_post) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_CAMPAIGN_ID_2 + "/insights";
                    params = new URLSearchParams({
                        fields: 'reach,spend,impressions',
                        breakdowns: 'gender,age',
                        access_token: envVariables_1.T_TOKEN
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error fetching Facebook API:', error_5);
                    throw error_5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPostReachvsSpendInsightsData = getPostReachvsSpendInsightsData;
function GrowthRateInsightsData() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID_1 + "/insights";
                    params = new URLSearchParams({
                        access_token: envVariables_1.Access_token_1
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Groth daata check data +++++++++++++++++++', data);
                    return [2 /*return*/, data.data];
                case 4:
                    error_6 = _a.sent();
                    console.error('Error fetching Facebook API:', error_6);
                    throw error_6;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GrowthRateInsightsData = GrowthRateInsightsData;
exports.getAdsetInsights = function (timePeriod) { return __awaiter(void 0, void 0, Promise, function () {
    var apiUrl, timeRange, currentDate, params, url, response, errorResponse, data, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/insights";
                currentDate = new Date();
                switch (timePeriod) {
                    case '7days':
                        timeRange = {
                            since: new Date(currentDate.setDate(currentDate.getDate() - 7))
                                .toISOString()
                                .split('T')[0],
                            until: new Date().toISOString().split('T')[0]
                        };
                        break;
                    case '30days':
                        timeRange = {
                            since: new Date(currentDate.setDate(currentDate.getDate() - 30))
                                .toISOString()
                                .split('T')[0],
                            until: new Date().toISOString().split('T')[0]
                        };
                        break;
                    case '6months':
                        timeRange = {
                            since: new Date(currentDate.setMonth(currentDate.getMonth() - 6))
                                .toISOString()
                                .split('T')[0],
                            until: new Date().toISOString().split('T')[0]
                        };
                        break;
                    case '1year':
                        timeRange = {
                            since: new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
                                .toISOString()
                                .split('T')[0],
                            until: new Date().toISOString().split('T')[0]
                        };
                        break;
                    default:
                        throw new Error('Invalid time period');
                }
                params = new URLSearchParams({
                    fields: 'spend,campaign_id,actions,adset_id,ad_id,clicks,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_unique_click,cpc,cpm,cpp,ctr,frequency,impressions,inline_link_click_ctr,inline_link_clicks,reach,cost_per_action_type,action_values,unique_actions,video_30_sec_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,website_ctr',
                    breakdowns: 'age,gender',
                    time_range: JSON.stringify(timeRange),
                    action_breakdowns: 'action_type',
                    level: 'adset',
                    access_token: envVariables_1.Access_token_1
                });
                url = apiUrl + "?" + params.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                errorResponse = _a.sent();
                console.error('Error response from API:', errorResponse);
                throw new Error("HTTP error! status: " + response.status + " - " + errorResponse.error.message);
            case 4: return [4 /*yield*/, response.json()];
            case 5:
                data = _a.sent();
                return [2 /*return*/, data.data];
            case 6:
                error_7 = _a.sent();
                console.error('Error fetching adset insights:', error_7);
                throw error_7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getAdsetInsightsPrevious = function (timePeriod) { return __awaiter(void 0, void 0, Promise, function () {
    var apiUrl, previousDate, params, url, response, errorResponse, data, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/insights";
                previousDate = getTimeRange1(timePeriod).previous;
                params = new URLSearchParams({
                    fields: 'spend,campaign_id,actions,adset_id,ad_id,clicks,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_unique_click,cpc,cpm,cpp,ctr,frequency,impressions,inline_link_click_ctr,inline_link_clicks,reach,cost_per_action_type,action_values,unique_actions,video_30_sec_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,website_ctr',
                    breakdowns: 'age,gender',
                    time_range: JSON.stringify(previousDate),
                    action_breakdowns: 'action_type',
                    level: 'adset',
                    access_token: envVariables_1.Access_token_1
                });
                url = apiUrl + "?" + params.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                errorResponse = _a.sent();
                console.error('Error response from API:', errorResponse);
                throw new Error("HTTP error! status: " + response.status + " - " + errorResponse.error.message);
            case 4: return [4 /*yield*/, response.json()];
            case 5:
                data = _a.sent();
                return [2 /*return*/, data.data];
            case 6:
                error_8 = _a.sent();
                console.error('Error fetching adset insights:', error_8);
                throw error_8;
            case 7: return [2 /*return*/];
        }
    });
}); };
function getInsights(type) {
    return __awaiter(this, void 0, void 0, function () {
        var ADUrl, paramsAD, PostUrl, paramsPOST, URL, response, data, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ADUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_CAMPAIGN_ID_1 + "/insights";
                    paramsAD = new URLSearchParams({
                        breakdowns: 'age,gender',
                        fields: 'reach,spend',
                        access_token: envVariables_1.Access_token_1,
                        time_increment: '1'
                    });
                    PostUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.POST_ID + "/insights?";
                    paramsPOST = new URLSearchParams({
                        breakdowns: 'age,gender',
                        metric: 'post_impressions',
                        fields: 'reach,spend',
                        access_token: envVariables_1.Access_token_1,
                        time_increment: '1'
                    });
                    if (type == 'ad_insights') {
                        URL = ADUrl + "?" + paramsAD;
                    }
                    else {
                        URL = PostUrl + "/" + paramsPOST;
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(URL)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_9 = _a.sent();
                    console.error('Error fetching Facebook API:', error_9);
                    throw error_9;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getInsights = getInsights;
function getPlatfrom() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_CAMPAIGN_ID_1 + "/insights";
                    params = new URLSearchParams({
                        breakdowns: 'publisher_platform,platform_position,impression_device',
                        fields: 'impressions,clicks,reach,spend',
                        access_token: envVariables_1.Access_token_1,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_10 = _a.sent();
                    console.error('Error fetching Facebook API:', error_10);
                    throw error_10;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPlatfrom = getPlatfrom;
function GetLocationInsights() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_CAMPAIGN_ID_1 + "/insights";
                    params = new URLSearchParams({
                        breakdowns: 'country,region',
                        fields: 'reach,spend',
                        access_token: envVariables_1.Access_token_1,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_11 = _a.sent();
                    console.error('Error fetching Facebook API:', error_11);
                    throw error_11;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetLocationInsights = GetLocationInsights;
//===================================================================
function getTimeRange(timePeriod) {
    var currentDate = new Date();
    var sinceDate;
    switch (timePeriod) {
        case '7days':
            sinceDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
            break;
        case '30days':
            sinceDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
            break;
        case '6months':
            sinceDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
            break;
        case '1year':
            sinceDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
            break;
        default:
            throw new Error('Invalid time period');
    }
    return {
        since: sinceDate.toISOString().split('T')[0],
        until: new Date().toISOString().split('T')[0]
    };
}
function getTimeRange1(timePeriod) {
    var currentDate = new Date();
    var sinceDate;
    var previousSinceDate;
    var previousUntilDate;
    switch (timePeriod) {
        case '7days':
            sinceDate = new Date(currentDate);
            sinceDate.setDate(currentDate.getDate() - 7);
            previousUntilDate = new Date(sinceDate);
            previousSinceDate = new Date(previousUntilDate);
            previousSinceDate.setDate(previousUntilDate.getDate() - 7);
            break;
        case '30days':
            sinceDate = new Date(currentDate);
            sinceDate.setDate(currentDate.getDate() - 30);
            previousUntilDate = new Date(sinceDate);
            previousSinceDate = new Date(previousUntilDate);
            previousSinceDate.setDate(previousUntilDate.getDate() - 30);
            break;
        case '6months':
            sinceDate = new Date(currentDate);
            sinceDate.setMonth(currentDate.getMonth() - 6);
            previousUntilDate = new Date(sinceDate);
            previousSinceDate = new Date(previousUntilDate);
            previousSinceDate.setMonth(previousUntilDate.getMonth() - 6);
            break;
        case '1year':
            sinceDate = new Date(currentDate);
            sinceDate.setFullYear(currentDate.getFullYear() - 1);
            previousUntilDate = new Date(sinceDate);
            previousSinceDate = new Date(previousUntilDate);
            previousSinceDate.setFullYear(previousUntilDate.getFullYear() - 1);
            break;
        default:
            throw new Error('Invalid time period');
    }
    return {
        current: {
            since: sinceDate.toISOString().split('T')[0],
            until: new Date().toISOString().split('T')[0]
        },
        previous: {
            since: previousSinceDate.toISOString().split('T')[0],
            until: previousUntilDate.toISOString().split('T')[0]
        }
    };
}
//===================================================================
function GetNewFollows(timePeriod) {
    return __awaiter(this, void 0, Promise, function () {
        var apiUrl, timeRange, params, url, response, data, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + new_page_ID + "/insights";
                    timeRange = getTimeRange(timePeriod);
                    params = new URLSearchParams({
                        metric: 'page_fan_adds',
                        time_range: JSON.stringify(timeRange),
                        access_token: new_page_token,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        //  throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_12 = _a.sent();
                    console.error('Error fetching Facebook API:', error_12);
                    throw error_12;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetNewFollows = GetNewFollows;
function GrowthPageandProfile(timePeriod) {
    return __awaiter(this, void 0, Promise, function () {
        var apiUrl, timeRange, params, url, response, data, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + new_page_ID + "/insights";
                    timeRange = getTimeRange(timePeriod);
                    params = new URLSearchParams({
                        metric: 'page_views_total,page_impressions',
                        access_token: new_page_token,
                        time_range: JSON.stringify(timeRange)
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        //  throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_13 = _a.sent();
                    console.error('Error fetching Facebook API:', error_13);
                    throw error_13;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GrowthPageandProfile = GrowthPageandProfile;
function page_fan_adds(timePeriod) {
    return __awaiter(this, void 0, Promise, function () {
        var apiUrl, timeRange, params, url, response, data, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + new_page_ID + "/insights/page_fan_adds";
                    timeRange = getTimeRange(timePeriod);
                    params = new URLSearchParams({
                        access_token: new_page_token,
                        time_increment: '1',
                        time_range: JSON.stringify(timeRange)
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        //  throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_14 = _a.sent();
                    console.error('Error fetching Facebook API:', error_14);
                    throw error_14;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.page_fan_adds = page_fan_adds;
function GetAgeandGender() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID_1 + "/insights";
                    params = new URLSearchParams({
                        breakdowns: 'age,gender',
                        fields: 'reach,impressions,frequency,spend,actions,action_values',
                        access_token: envVariables_1.Access_token_1,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_15 = _a.sent();
                    console.error('Error fetching Facebook API:', error_15);
                    throw error_15;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetAgeandGender = GetAgeandGender;
function GetRegionandcountry() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID_1 + "/insights";
                    params = new URLSearchParams({
                        breakdowns: 'region,country ',
                        fields: 'reach,impressions,frequency,spend,actions,action_values',
                        access_token: envVariables_1.Access_token_1,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_16 = _a.sent();
                    console.error('Error fetching Facebook API:', error_16);
                    throw error_16;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetRegionandcountry = GetRegionandcountry;
function GetInterestandBehaviourAudiences() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/search";
                    params = new URLSearchParams({
                        type: 'adinterest',
                        q: 'Movies',
                        access_token: envVariables_1.Access_token_1,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_17 = _a.sent();
                    console.error('Error fetching Facebook API:', error_17);
                    throw error_17;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetInterestandBehaviourAudiences = GetInterestandBehaviourAudiences;
// Campaign Engagements API
var fetchFacebookData = function (fbAccessToken, fbPageId, timePeriod) { return __awaiter(void 0, void 0, Promise, function () {
    var likesSummary, commentsSummary, sharesSummary, reelViewsSummary, reactionsSummary, Post_response, timeRang, newTimeRange, url, response, data, posts, error_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                likesSummary = { facebook: 0, instagram: 0 };
                commentsSummary = { facebook: 0, instagram: 0 };
                sharesSummary = { facebook: 0, instagram: 0 };
                reelViewsSummary = { facebook: 0, instagram: 0 };
                reactionsSummary = {
                    like: 0,
                    love: 0,
                    care: 0,
                    haha: 0,
                    wow: 0,
                    sad: 0,
                    angry: 0
                };
                timeRang = getTimeRange(timePeriod);
                newTimeRange = getTimeRange1(timePeriod);
                url = "https://graph.facebook.com/v12.0/" + fbPageId + "/posts?fields=likes.summary(true),reactions.summary(true),comments.summary(true),shares,attachments{media_type}&time_range=" + timeRang + ",&access_token=" + fbAccessToken;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                _a.label = 2;
            case 2:
                if (!url) return [3 /*break*/, 5];
                return [4 /*yield*/, fetch(url)];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 4:
                data = _a.sent();
                posts = data.data;
                Post_response = posts;
                posts.forEach(function (post) {
                    var _a;
                    likesSummary.facebook += post.likes.summary.total_count;
                    commentsSummary.facebook += post.comments.summary.total_count;
                    sharesSummary.facebook += post.shares ? post.shares.count : 0;
                    if (post.attachments && post.attachments.data.length > 0) {
                        var mediaType = post.attachments.data[0].media_type;
                        if (mediaType === 'video') {
                            reelViewsSummary.instagram +=
                                ((_a = post.attachments.data[0].video_insights) === null || _a === void 0 ? void 0 : _a.video_view_count) || 0;
                        }
                    }
                    var reactions = post.reactions.data;
                    reactions.forEach(function (post) {
                        if (post.type === 'LIKE') {
                            reactionsSummary.like += 1;
                        }
                        if (post.type === 'LOVE') {
                            reactionsSummary.love += 1;
                        }
                        if (post.type === 'CARE') {
                            reactionsSummary.care += 1;
                        }
                        if (post.type === 'HAHA') {
                            reactionsSummary.haha += 1;
                        }
                        if (post.type === 'WOW') {
                            reactionsSummary.wow += 1;
                        }
                        if (post.type === 'SAD') {
                            reactionsSummary.sad += 1;
                        }
                        if (post.type === 'ANGRY') {
                            reactionsSummary.angry += 1;
                        }
                    });
                });
                url = data.paging ? data.paging.next : null;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_18 = _a.sent();
                console.error('Error fetching Facebook data:', error_18);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, {
                    likesSummary: likesSummary,
                    commentsSummary: commentsSummary,
                    sharesSummary: sharesSummary,
                    reelViewsSummary: reelViewsSummary,
                    reactionsSummary: reactionsSummary,
                    Post_response: Post_response
                }];
        }
    });
}); };
exports.fetchFacebookData = fetchFacebookData;
var fetch_Priview_FacebookData = function (fbAccessToken, fbPageId, timePeriod) { return __awaiter(void 0, void 0, Promise, function () {
    var likesSummary, commentsSummary, sharesSummary, reelViewsSummary, reactionsSummary, Post_response, timeRang, newTimeRange, url, response, data, posts, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                likesSummary = { facebook: 0, instagram: 0 };
                commentsSummary = { facebook: 0, instagram: 0 };
                sharesSummary = { facebook: 0, instagram: 0 };
                reelViewsSummary = { facebook: 0, instagram: 0 };
                reactionsSummary = {
                    like: 0,
                    love: 0,
                    care: 0,
                    haha: 0,
                    wow: 0,
                    sad: 0,
                    angry: 0
                };
                timeRang = getTimeRange(timePeriod);
                newTimeRange = getTimeRange1(timePeriod);
                url = "https://graph.facebook.com/v12.0/" + fbPageId + "/posts?fields=likes.summary(true),reactions.summary(true),comments.summary(true),shares,attachments{media_type}&time_range=" + newTimeRange.previous + ",&access_token=" + fbAccessToken;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                _a.label = 2;
            case 2:
                if (!url) return [3 /*break*/, 5];
                return [4 /*yield*/, fetch(url)];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 4:
                data = _a.sent();
                posts = data.data;
                Post_response = posts;
                posts.forEach(function (post) {
                    var _a;
                    likesSummary.facebook += post.likes.summary.total_count;
                    commentsSummary.facebook += post.comments.summary.total_count;
                    sharesSummary.facebook += post.shares ? post.shares.count : 0;
                    if (post.attachments && post.attachments.data.length > 0) {
                        var mediaType = post.attachments.data[0].media_type;
                        if (mediaType === 'video') {
                            reelViewsSummary.instagram +=
                                ((_a = post.attachments.data[0].video_insights) === null || _a === void 0 ? void 0 : _a.video_view_count) || 0;
                        }
                    }
                    var reactions = post.reactions.data;
                    reactions.forEach(function (post) {
                        if (post.type === 'LIKE') {
                            reactionsSummary.like += 1;
                        }
                        if (post.type === 'LOVE') {
                            reactionsSummary.love += 1;
                        }
                        if (post.type === 'CARE') {
                            reactionsSummary.care += 1;
                        }
                        if (post.type === 'HAHA') {
                            reactionsSummary.haha += 1;
                        }
                        if (post.type === 'WOW') {
                            reactionsSummary.wow += 1;
                        }
                        if (post.type === 'SAD') {
                            reactionsSummary.sad += 1;
                        }
                        if (post.type === 'ANGRY') {
                            reactionsSummary.angry += 1;
                        }
                    });
                });
                url = data.paging ? data.paging.next : null;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_19 = _a.sent();
                console.error('Error fetching Facebook data:', error_19);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, {
                    likesSummary: likesSummary,
                    commentsSummary: commentsSummary,
                    sharesSummary: sharesSummary,
                    reelViewsSummary: reelViewsSummary,
                    reactionsSummary: reactionsSummary,
                    Post_response: Post_response
                }];
        }
    });
}); };
exports.fetch_Priview_FacebookData = fetch_Priview_FacebookData;
var fetchInstagramData = function (igAccessToken, igPageId) { return __awaiter(void 0, void 0, Promise, function () {
    var likesSummary, commentsSummary, sharesSummary, reelViewsSummary, url, response, data, posts, error_20;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                likesSummary = { facebook: 0, instagram: 0 };
                commentsSummary = { facebook: 0, instagram: 0 };
                sharesSummary = { facebook: 0, instagram: 0 };
                reelViewsSummary = {
                    instagram: 0,
                    facebook: 0
                };
                url = "https://graph.instagram.com/v12.0/" + igPageId + "/media?fields=like_count,comments_count,permalink,media_type,children{media_url,media_type,thumbnail_url,permalink,shortcode},caption,timestamp&access_token=" + igAccessToken;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                _a.label = 2;
            case 2:
                if (!url) return [3 /*break*/, 5];
                return [4 /*yield*/, fetch(url)];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 4:
                data = _a.sent();
                posts = data.data;
                posts.forEach(function (post) {
                    likesSummary.instagram += post.like_count;
                    commentsSummary.instagram += post.comments_count;
                    sharesSummary.instagram += post.shares ? post.shares.count : 0;
                    if (post.media_type === 'VIDEO') {
                        reelViewsSummary.instagram += post.video_view_count;
                    }
                });
                url = data.paging ? data.paging.next : null;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_20 = _a.sent();
                console.error('Error fetching Instagram data:', error_20);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, { likesSummary: likesSummary, commentsSummary: commentsSummary, sharesSummary: sharesSummary, reelViewsSummary: reelViewsSummary }];
        }
    });
}); };
exports.fetchInstagramData = fetchInstagramData;
function GetPageProfilevisits(timePeriod) {
    return __awaiter(this, void 0, void 0, function () {
        var timeRang, apiUrl, params, url, response, data, error_21;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeRang = getTimeRange(timePeriod);
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.PAGE_ID_FOR_VISIT + "/insights/page_views_total";
                    params = new URLSearchParams({
                        time_range: JSON.stringify(timeRang),
                        access_token: envVariables_1.TOKEN_FOR_VISIT,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_21 = _a.sent();
                    console.error('Error fetching Facebook API:', error_21);
                    throw error_21;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetPageProfilevisits = GetPageProfilevisits;
function GetNewfollowers($timePeriod) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_22;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.PAGE_ID_FOR_VISIT + "/insights/page_fan_adds";
                    params = new URLSearchParams({
                        time_range: '{"since":"2023-06-28","until":"2024-06-28"}',
                        access_token: envVariables_1.TOKEN_FOR_VISIT,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_22 = _a.sent();
                    console.error('Error fetching Facebook API:', error_22);
                    throw error_22;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetNewfollowers = GetNewfollowers;
//export async function GetPageunlikesandunfollows($timePeriod: string) {
//  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID_FOR_VISIT}/insights/page_fan_removes`;
//  const params = new URLSearchParams({
//    time_range: '{"since":"2023-06-28","until":"2024-06-28"}',
//    access_token: TOKEN_FOR_VISIT,
//    time_increment: '1',
//  });
//  const url = `${apiUrl}?${params}`;
//  try {
//    const response = await fetch(url);
//    if (!response.ok) {
//      throw new Error(`HTTP error! Status: ${response.status}`);
//    }
//    const data = await response.json();
//
//    return data.data;
//  } catch (error) {
//    console.error('Error fetching Facebook API:', error);
//    throw error;
//  }
//}
function GetPageunlikesandunfollows(timePeriod) {
    return __awaiter(this, void 0, void 0, function () {
        var timeRang, apiUrl, params, url, response, data, error_23;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeRang = getTimeRange(timePeriod);
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.PAGE_ID_FOR_VISIT + "/insights/page_fan_removes";
                    params = new URLSearchParams({
                        time_range: JSON.stringify(timeRang),
                        access_token: envVariables_1.TOKEN_FOR_VISIT,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_23 = _a.sent();
                    console.error('Error fetching Facebook API:', error_23);
                    throw error_23;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetPageunlikesandunfollows = GetPageunlikesandunfollows;
function GetPageProfilevisit($timePeriod) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_24;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.PAGE_ID_FOR_VISIT + "/insights/page_views_total";
                    params = new URLSearchParams({
                        time_range: '{"since":"2023-06-28","until":"2024-06-28"}',
                        access_token: envVariables_1.TOKEN_FOR_VISIT,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_24 = _a.sent();
                    console.error('Error fetching Facebook API:', error_24);
                    throw error_24;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetPageProfilevisit = GetPageProfilevisit;
function getHourlyBreakDown(week) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, currentDate, startOfWeek, endOfWeek, timeRange, url, response, data, error_25;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_CAMPAIGN_ID_1 + "/insights";
                    params = new URLSearchParams({
                        fields: 'impressions',
                        access_token: envVariables_1.Access_token_1,
                        breakdowns: 'hourly_stats_aggregated_by_audience_time_zone'
                    });
                    if (week) {
                        currentDate = new Date();
                        startOfWeek = new Date(currentDate);
                        endOfWeek = new Date(currentDate);
                        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
                        startOfWeek.setHours(0, 0, 0, 0);
                        endOfWeek.setDate(startOfWeek.getDate() + 6);
                        endOfWeek.setHours(23, 59, 59, 999);
                        timeRange = {
                            since: startOfWeek.toISOString().split('T')[0],
                            until: endOfWeek.toISOString().split('T')[0]
                        };
                        params.append('time_range', JSON.stringify(timeRange));
                    }
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_25 = _a.sent();
                    console.error('Error fetching Facebook API:', error_25);
                    throw error_25;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getHourlyBreakDown = getHourlyBreakDown;
function getTargetingAudienceForAd(adsetId) {
    return __awaiter(this, void 0, void 0, function () {
        var URL, response, data, error_26;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    URL = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + adsetId + "?fields=targeting&access_token=" + envVariables_1.T_TOKEN;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(URL)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.targeting];
                case 4:
                    error_26 = _a.sent();
                    console.error('Error fetching Facebook API:', error_26);
                    throw error_26;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getTargetingAudienceForAd = getTargetingAudienceForAd;
function getPageFanOnline() {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data, error_27;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.PAGE_ID_1 + "/insights/page_fans_online?access_token=" + envVariables_1.Access_token_1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        console.log("HTTP error! Status: " + response);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_27 = _a.sent();
                    console.error('Error fetching Facebook API:', error_27);
                    throw error_27;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPageFanOnline = getPageFanOnline;
function Optimalaudience() {
    return __awaiter(this, void 0, void 0, function () {
        var timeRang, apiUrl, params, url, response, data, error_28;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeRang = getTimeRange('30days');
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID_1 + "/adsets";
                    params = new URLSearchParams({
                        time_range: JSON.stringify(timeRang),
                        fields: 'id,name,status,campaign_id,daily_budget,lifetime_budget,start_time,end_time,targeting,optimization_goal,billing_event,bid_amount,created_time,updated_time',
                        access_token: envVariables_1.T_TOKEN,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_28 = _a.sent();
                    console.error('Error fetching Facebook API:', error_28);
                    throw error_28;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.Optimalaudience = Optimalaudience;
function AdInsights_TopPerfoming() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, params, url, response, data, error_29;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/ads";
                    params = new URLSearchParams({
                        // time_range: JSON.stringify(timeRang),
                        fields: 'name,creative{effective_object_story_id,object_story_spec},insights{reach,impressions},adset{name,daily_budget,start_time,end_time,targeting}',
                        access_token: envVariables_1.T_TOKEN,
                        time_increment: '1'
                    });
                    url = apiUrl + "?" + params;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_29 = _a.sent();
                    console.error('Error fetching Facebook API:', error_29);
                    throw error_29;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.AdInsights_TopPerfoming = AdInsights_TopPerfoming;
