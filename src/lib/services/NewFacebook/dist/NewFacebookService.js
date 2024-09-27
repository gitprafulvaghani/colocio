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
exports.getAdEngagementData = exports.uploadPhoto = exports.schedulePost = exports.getCreativeDetails = exports.GetBehaviorsData = exports.GetInterestsData = exports.deletePost = exports.Get_Ad_Draft = exports.getLocation = exports.getAdSetById = exports.getCreativeById = exports.Get_All_Ad_Archive = exports.Get_Ad_Archive = exports.PreviewsADCREATIVEID = exports.Previews = exports.getAdsPreviewData = exports.GetpostPreviews = exports.GetAdsPreviews = exports.getAllCampaigns = exports.searchInterests = exports.searchCountries = exports.ScheduleDelivery = exports.verifyAdCreative = exports.uploadImage = exports.createAdCreative = exports.createAdSetForShared = exports.createAdSet = exports.createCampaign = void 0;
var notification_1 = require("$lib/components/notification/notification");
var envVariables_1 = require("$lib/services/NewFacebook/envVariables");
function createCampaign(GoalDetails) {
    return __awaiter(this, void 0, Promise, function () {
        var formData, response, errorData, responseData, CampaignId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append('name', GoalDetails.goalselected);
                    //  formData.append('name', 'REACH');
                    formData.append('objective', 'OUTCOME_TRAFFIC');
                    formData.append('status', 'PAUSED');
                    formData.append('special_ad_categories', '[]');
                    formData.append('description', GoalDetails.discription);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/campaigns", {
                            method: 'POST',
                            body: formData,
                            headers: {
                                Authorization: "Bearer " + envVariables_1.T_TOKEN
                            }
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.error.message);
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    responseData = _a.sent();
                    CampaignId = responseData.id;
                    notification_1.notification.success('Campaign created successfully !', 3000);
                    return [2 /*return*/, CampaignId];
                case 6:
                    error_1 = _a.sent();
                    // notification.danger(error,5000)
                    console.error('Error creating campaign:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.createCampaign = createCampaign;
function createAdSet(GoalsDetails, audience_infos, meadia_details, Text_Detials, schedule_infos, value) {
    return __awaiter(this, void 0, void 0, function () {
        var interest_ids, locationIDs, convertToISOFormat, optimization_goal, bid_strategy, formData, response, errorData, creative_ID_1, responseData, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getInterestIds(audience_infos.interests)];
                case 1:
                    interest_ids = _a.sent();
                    return [4 /*yield*/, getLocationIDs(audience_infos.locations.map(function (location) { return location.name; }))];
                case 2:
                    locationIDs = _a.sent();
                    convertToISOFormat = function (dateStr) {
                        return new Date(dateStr).toISOString();
                    };
                    optimization_goal = 'LINK_CLICKS';
                    bid_strategy = 'LOWEST_COST_WITHOUT_CAP';
                    formData = {
                        name: 'New Campaign Duplicate',
                        campaign_id: '120200530069850577',
                        billing_event: 'IMPRESSIONS',
                        optimization_goal: optimization_goal,
                        start_time: convertToISOFormat(schedule_infos.start),
                        end_time: convertToISOFormat(schedule_infos.end),
                        bid_strategy: bid_strategy,
                        status: 'PAUSED',
                        targeting: {
                            age_min: parseInt(audience_infos.age.split('-')[0]),
                            age_max: parseInt(audience_infos.age.split('-')[1]),
                            genders: audience_infos.gender === 'Female' ? [1] : [2],
                            geo_locations: {
                                cities: locationIDs.map(function (location) { return ({
                                    key: parseInt(location.id)
                                }); })
                            },
                            interests: interest_ids.data.map(function (interest) { return ({
                                id: interest.id,
                                name: interest.name
                            }); })
                        }
                    };
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/adsets", {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                Authorization: "Bearer " + envVariables_1.Token
                            },
                            body: JSON.stringify(formData)
                        })];
                case 4:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, response.json()];
                case 5:
                    errorData = _a.sent();
                    throw new Error(errorData.error.message);
                case 6:
                    creative_ID_1 = [];
                    if (value === 'draft') {
                        meadia_details.map(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var imagesUrl, creativeAdId, setDelivery;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, uploadImage('/images/' + data.src)];
                                    case 1:
                                        imagesUrl = _a.sent();
                                        if (!imagesUrl) return [3 /*break*/, 4];
                                        return [4 /*yield*/, createAdCreative(imagesUrl.hash)];
                                    case 2:
                                        creativeAdId = _a.sent();
                                        creative_ID_1.push(creativeAdId);
                                        return [4 /*yield*/, ScheduleDelivery(creative_ID_1)];
                                    case 3:
                                        setDelivery = _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [4 /*yield*/, response.json()];
                case 7:
                    responseData = _a.sent();
                    if (responseData) {
                        notification_1.notification.success('Ad set created successfully !', 3000);
                    }
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _a.sent();
                    notification_1.notification.danger(error_2, 3000);
                    console.error('Error creating ad set:', error_2);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.createAdSet = createAdSet;
function createAdSetForShared(platformData, libraryData, facebookDesc, instagramDesc, selectedStartDate, selectedEndDate, $audienceData, $library) {
    return __awaiter(this, void 0, void 0, function () {
        var convertToISOFormat, locationIDs, creative_ID, formData, response, errorData, responseData, error_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    convertToISOFormat = function (dateStr) {
                        return new Date(dateStr).toISOString();
                    };
                    return [4 /*yield*/, getLocationIDsForShared($audienceData.location[0].name)];
                case 1:
                    locationIDs = _a.sent();
                    creative_ID = [];
                    libraryData.map(function (data) { return __awaiter(_this, void 0, void 0, function () {
                        var imagesUrl, creativeAdId, setDelivery;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, uploadImage('/images/' + data.src)];
                                case 1:
                                    imagesUrl = _a.sent();
                                    if (!imagesUrl) return [3 /*break*/, 4];
                                    return [4 /*yield*/, createAdCreative(imagesUrl.hash)];
                                case 2:
                                    creativeAdId = _a.sent();
                                    return [4 /*yield*/, ScheduleDelivery(creative_ID)];
                                case 3:
                                    setDelivery = _a.sent();
                                    creative_ID.push(creativeAdId);
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    formData = {
                        name: $audienceData.name,
                        campaign_id: $audienceData.campaign_id,
                        billing_event: 'IMPRESSIONS',
                        optimization_goal: 'REACH',
                        start_time: convertToISOFormat(selectedStartDate),
                        end_time: convertToISOFormat(selectedEndDate),
                        bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
                        status: 'PAUSED',
                        targeting: {
                            age_min: parseInt($audienceData.age_min),
                            age_max: parseInt($audienceData.age_max),
                            geo_locations: {
                                cities: locationIDs.map(function (location) { return ({
                                    key: parseInt(location.id)
                                }); })
                            }
                        }
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/adsets", {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                Authorization: "Bearer " + envVariables_1.Token
                            },
                            body: JSON.stringify(formData)
                        })];
                case 3:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, response.json()];
                case 4:
                    errorData = _a.sent();
                    throw new Error(errorData.error.message);
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    responseData = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.error('Error creating ad set:', error_3);
                    console.log(error_3);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.createAdSetForShared = createAdSetForShared;
function createAdCreative(imageHash) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, response, errorData, adCreativeData, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append('name', 'Sample Creative');
                    formData.append('object_story_spec', JSON.stringify({
                        page_id: envVariables_1.PAGE_ID,
                        link_data: {
                            image_hash: imageHash,
                            link: "https://facebook.com/" + envVariables_1.PAGE_ID,
                            message: 'try it out'
                        }
                    }));
                    formData.append('degrees_of_freedom_spec', JSON.stringify({
                        creative_features_spec: {
                            standard_enhancements: {
                                enroll_status: 'OPT_IN'
                            }
                        }
                    }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/adcreatives", {
                            method: 'POST',
                            body: formData,
                            headers: {
                                Authorization: "Bearer " + envVariables_1.T_TOKEN
                            }
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.error.message);
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    adCreativeData = _a.sent();
                    notification_1.notification.success('Ad creative created successfully !', 3000);
                    return [2 /*return*/, adCreativeData.id];
                case 6:
                    error_4 = _a.sent();
                    notification_1.notification.danger(error_4, 3000);
                    console.error('Error creating ad creative:', error_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.createAdCreative = createAdCreative;
//--------- get id of interest ------------
function getInterestIds(interests) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, interests_1, interest, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, interests_1 = interests;
                    _a.label = 1;
                case 1:
                    if (!(_i < interests_1.length)) return [3 /*break*/, 5];
                    interest = interests_1[_i];
                    return [4 /*yield*/, fetch("https://graph.facebook.com/v11.0/search?type=adinterest&q=[" + interest + "]&access_token=" + envVariables_1.T_TOKEN)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getLocationIDs(locationNames) {
    return __awaiter(this, void 0, void 0, function () {
        var locationIDs, _i, locationNames_1, locationName, cityName, response, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    locationIDs = [];
                    _i = 0, locationNames_1 = locationNames;
                    _a.label = 1;
                case 1:
                    if (!(_i < locationNames_1.length)) return [3 /*break*/, 5];
                    locationName = locationNames_1[_i];
                    cityName = locationName.split(',')[0].trim();
                    return [4 /*yield*/, fetch("https://graph.facebook.com/v12.0/search?type=adgeolocation&location_types=['city']&q=" + encodeURIComponent(cityName) + "&access_token=" + envVariables_1.T_TOKEN)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.error) {
                        throw new Error(data.error.message);
                    }
                    if (data.data.length > 0) {
                        locationIDs.push({ name: cityName, id: data.data[0].key });
                    }
                    else {
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, locationIDs];
                case 6:
                    error_5 = _a.sent();
                    console.error('Error fetching location IDs:', error_5.message);
                    throw new Error('Error fetching location IDs');
                case 7: return [2 /*return*/];
            }
        });
    });
}
function getLocationIDsForShared(locationNames) {
    return __awaiter(this, void 0, void 0, function () {
        var locationIDs, response, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    locationIDs = [];
                    return [4 /*yield*/, fetch("https://graph.facebook.com/v12.0/search?type=adgeolocation&location_types=['city']&q=" + encodeURIComponent(locationNames) + "&access_token=" + envVariables_1.T_TOKEN)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.error) {
                        throw new Error(data.error.message);
                    }
                    if (data.data.length > 0) {
                        locationIDs.push({ name: locationNames, id: data.data[0].key });
                    }
                    else {
                    }
                    return [2 /*return*/, locationIDs];
                case 3:
                    error_6 = _a.sent();
                    console.error('Error fetching location IDs:', error_6.message);
                    throw new Error('Error fetching location IDs');
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Upload the Image
function uploadImage(imageUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var response, blob, file, formData, uploadResponse, errorData, imageData, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!imageUrl) {
                        console.error('No image URL provided');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, fetch(imageUrl)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch image');
                    }
                    return [4 /*yield*/, response.blob()];
                case 3:
                    blob = _a.sent();
                    file = new File([blob], imageUrl, { type: blob.type });
                    formData = new FormData();
                    formData.append('file', file);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/adimages?access_token=" + envVariables_1.T_TOKEN, {
                            method: 'POST',
                            body: formData
                        })];
                case 4:
                    uploadResponse = _a.sent();
                    if (!!uploadResponse.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, uploadResponse.json()];
                case 5:
                    errorData = _a.sent();
                    console.error('Upload failed with response:', errorData);
                    throw new Error(errorData.error.message);
                case 6: return [4 /*yield*/, uploadResponse.json()];
                case 7:
                    imageData = _a.sent();
                    return [2 /*return*/, imageData.images['test-image.png']];
                case 8:
                    error_7 = _a.sent();
                    console.error('Error uploading image:', error_7);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.uploadImage = uploadImage;
function verifyAdCreative(adCreativeId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, adCreativeDetails, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "}/" + envVariables_1.ADCREATIVE_ID + "?fields=object_story_spec&access_token=" + envVariables_1.T_TOKEN, {
                            method: 'GET'
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    throw new Error(errorData.error.message);
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    adCreativeDetails = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_8 = _a.sent();
                    console.error('Error verifying ad creative:', error_8);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.verifyAdCreative = verifyAdCreative;
function ScheduleDelivery(creativeAdId) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, response, errorData, responseData, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = {
                        name: 'My Ad',
                        adset_id: '120200530069980577',
                        creative: {
                            creative_id: creativeAdId
                        },
                        status: 'PAUSED',
                        campaign_id: '120213408679270679'
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/ads", {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                Authorization: "Bearer " + envVariables_1.Token
                            },
                            body: JSON.stringify(payload)
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.error.message);
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    responseData = _a.sent();
                    notification_1.notification.success('ScheduleDelivery successfully !', 3000);
                    return [3 /*break*/, 7];
                case 6:
                    error_9 = _a.sent();
                    notification_1.notification.danger(error_9, 3000);
                    console.error('Error creating ad set:', error_9);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.ScheduleDelivery = ScheduleDelivery;
function searchCountries() {
    return __awaiter(this, void 0, Promise, function () {
        var query, response, errorData, countries, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'united';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/search?location_types=[\"country\"]&type=adgeolocation&q=" + query + "&access_token=" + envVariables_1.T_TOKEN, {
                            method: 'GET'
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.error.message);
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    countries = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_10 = _a.sent();
                    console.error('Error searching for countries:', error_10);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.searchCountries = searchCountries;
function searchInterests() {
    return __awaiter(this, void 0, Promise, function () {
        var query, response, errorData, interests, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'movie';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/search?type=adinterest&q=" + query + "&access_token=" + envVariables_1.T_TOKEN, {
                            method: 'GET'
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.error.message);
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    interests = _a.sent();
                    return [2 /*return*/, interests];
                case 6:
                    error_11 = _a.sent();
                    console.error('Error searching for interests:', error_11);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.searchInterests = searchInterests;
function getAllCampaigns() {
    return __awaiter(this, void 0, Promise, function () {
        var neededFields, fbURL, response, fbGraphResponse, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    neededFields = 'name, objective, daily_budget, status, start_time, stop_time';
                    fbURL = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/act_1338359276753508/campaigns?fields=" + neededFields;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(fbURL, {
                            headers: {
                                Authorization: "Bearer " + envVariables_1.T_TOKEN
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    fbGraphResponse = _a.sent();
                    return [2 /*return*/, fbGraphResponse];
                case 4:
                    error_12 = _a.sent();
                    console.log('GetAllCampaigns error:', error_12);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllCampaigns = getAllCampaigns;
function GetAdsPreviews() {
    return __awaiter(this, void 0, void 0, function () {
        var fields, url, response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = "\n        account_id,\n        campaign_id,\n        adset_id,\n        name,\n        status,\n        created_time,\n        updated_time,\n        effective_status,\n        bid_amount,\n        budget_rebalance_flag,\n        configured_status,\n        insights,\n        creative{\n            id,\n            name,\n            object_story_spec{\n                link_data{\n                    image_hash,\n                    description\n                }\n            }\n        },\n        optimization_goal,\n        scheduled_publish_time\n      ";
                    url = "https://graph.facebook.com/v18.0/act_1338359276753508/ads?fields=" + fields + "&access_token=" + envVariables_1.Token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        console.error('Error response from API:', data);
                        return [2 /*return*/, data];
                    }
                    return [2 /*return*/, data.data];
                case 4:
                    err_1 = _a.sent();
                    console.error('Fetch error:', err_1);
                    return [2 /*return*/, err_1.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetAdsPreviews = GetAdsPreviews;
function GetpostPreviews() {
    return __awaiter(this, void 0, void 0, function () {
        var fields, token, url, response, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = "message,created_time,full_picture,scheduled_publish_time,is_published,status_type,permalink_url";
                    token = 'EAATyloueTgYBOxgKWtGx1wAebfH1OPYsQjmd3QC3vMLQB4WGMnswIesVtFvwAt6mDVceiKqKiaNwV7WgwqZBFZCvfuS9r7Eji9f50kUZAtSVL6vZAXQtCllsO0sxP6ckcZCZBvQYrw6sIFxbiG9JC3xinBHFgg1FNx1K67KLMgjkjfcYP8nEaC2bO0cdQ1K4wK8Ux6E7jVZBThib0cZD';
                    url = "https://graph.facebook.com/110690242132648/posts?fields=" + fields + "&access_token=" + token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    //const data = [];
                    return [2 /*return*/, data.data];
                case 4:
                    err_2 = _a.sent();
                    return [2 /*return*/, err_2.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetpostPreviews = GetpostPreviews;
function getAdsPreviewData() {
    return __awaiter(this, void 0, void 0, function () {
        var fields, url, response, data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = 'campaign,name,status,full_picture,creative,adset,effective_status';
                    url = "https://graph.facebook.com/v13.0/" + envVariables_1.AD_ACCOUNT_ID_1 + "/ads?fields=" + fields + "&access_token=" + envVariables_1.T_TOKEN;
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
                    err_3 = _a.sent();
                    return [2 /*return*/, err_3.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAdsPreviewData = getAdsPreviewData;
//export async function getAdsPreviewData() {
//  const fields = 'campaign,name,status,full_picture,adset_id';
//  const token =
//    'EAATyloueTgYBOzt4Vidq4BnSfjLZB39Bmy3VmuZBTAjBh3jPcPbLpqIUlfNTUs0QSG158vJMpg5WM6A1nXzTP88PqrbFrZCt0ejmpPBmsEsGrdgX5iPDO0GWP450GIH4NGEwCQwNTNZA9oNZCC83O0oFq6uSQHpchqE4Bv7tAZACOuo4s52ZBoHVxEjwcZAWb0TjAgj4o5a66ataVG0ZD';
//
//  const adsUrl = `https://graph.facebook.com/v20.0/${AD_ACCOUNT_ID_2}/ads?fields=${fields}&access_token=${token}`;
//
//  try {
//    const adsResponse = await fetch(adsUrl);
//
//    const adsData = await adsResponse.json();
//    if (!adsData || !adsData.data) {
//      //  throw new Error('Invalid response structure');
//    }
//    console.log('adData+++++++', adsData);
//    const adsetPromises = adsData?.data?.map(async (ad: any) => {
//      if (!ad.adset_id) {
//        throw new Error('Ad does not have an adset_id');
//      }
//      const adsetUrl = `https://graph.facebook.com/v20.0/${ad.adset_id}?fields=name,status,optimization_goal,billing_event,daily_budget&access_token=${token}`;
//      const adsetResponse = await fetch(adsetUrl);
//      if (!adsetResponse.ok) {
//        throw new Error(`Error fetching adset+++++++: ${adsetResponse.json()}`);
//      }
//
//      const adsetData = await adsetResponse.json();
//      return {
//        ...ad,
//        adset: adsetData,
//      };
//    });
//
//    const adsWithAdsets = await Promise.all(adsetPromises);
//    return adsWithAdsets;
//  } catch (err: any) {
//    return { error: err.message };
//  }
//}
function Previews() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ID + "/previews", {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer " + envVariables_1.T_TOKEN
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_13 = _a.sent();
                    console.error('Error:', error_13);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.Previews = Previews;
function PreviewsADCREATIVEID() {
    return __awaiter(this, void 0, void 0, function () {
        var addFormate, formData, response, data, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addFormate = '<AD_FORMAT>';
                    formData = new FormData();
                    formData.append('name', addFormate);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.ADCREATIVE_ID + "/previews\n          ", {
                            method: 'GET',
                            body: formData,
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer " + envVariables_1.T_TOKEN
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_14 = _a.sent();
                    console.error('Error:', error_14);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.PreviewsADCREATIVEID = PreviewsADCREATIVEID;
function Get_Ad_Archive() {
    return __awaiter(this, void 0, void 0, function () {
        var searchTerms, adType, adReachedCountries, url, response, data, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchTerms = 'california';
                    adType = 'POLITICAL_AND_ISSUE_ADS';
                    adReachedCountries = ['US'];
                    url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/ads_archive?search_terms=" + encodeURIComponent(searchTerms) + "&ad_type=" + encodeURIComponent(adType) + "&ad_reached_countries=" + encodeURIComponent(JSON.stringify(adReachedCountries));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer " + envVariables_1.FB_token
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data];
                case 4:
                    error_15 = _a.sent();
                    console.error('Error:', error_15);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.Get_Ad_Archive = Get_Ad_Archive;
function Get_All_Ad_Archive() {
    return __awaiter(this, void 0, void 0, function () {
        var fields, search_terms, ad_type, ad_reached_countries, url, response, data, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = "\n      ad_creation_time,\n      ad_delivery_start_time,\n      ad_delivery_stop_time,\n      ad_snapshot_url,\n      currency,\n      demographic_distribution,\n      impressions,\n      page_id,\n      page_name,\n      spend\n    ";
                    search_terms = 'california';
                    ad_type = 'POLITICAL_AND_ISSUE_ADS';
                    ad_reached_countries = 'US';
                    url = "https://graph.facebook.com/v18.0/ads_archive?search_terms=" + search_terms + "&ad_type=" + ad_type + "&ad_reached_countries=" + ad_reached_countries + "&fields=" + fields + "&access_token=" + envVariables_1.FB_token;
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
                    err_4 = _a.sent();
                    return [2 /*return*/, err_4.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.Get_All_Ad_Archive = Get_All_Ad_Archive;
function getCreativeById() {
    return __awaiter(this, void 0, void 0, function () {
        var fields, url, response, data, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = "\n    name,status,thumbnail_url,effective_object_story_id,object_story_spec,account_id,adlabels,asset_feed_spec,body,call_to_action_type,effective_instagram_story_id,image_url,link_url,title\n    ";
                    url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.creativeId + "?fields=" + fields + "&access_token=" + envVariables_1.FB_token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    err_5 = _a.sent();
                    return [2 /*return*/, err_5.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getCreativeById = getCreativeById;
function getAdSetById() {
    return __awaiter(this, void 0, void 0, function () {
        var fields, access_token, url, response, data, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = "\n    name,status,effective_status,campaign_id,configured_status,created_time,updated_time,budget_remaining,campaign,targeting,insights,bid_amount\n      ";
                    access_token = 'EAATyloueTgYBO47AEMOskgkWcEKWuWYWEpx7ccZASzlr0G9xZB6P4F9O8kHKg0vvjgKF9l86SrLcJFTkzmTOiMiQxBapyFKTM9fqDJAxZB31rz1iPcCSKwjASSWGYYRcNZBwjJZBFs8SzqzuR8d43vZBZAdKH09HlzZAbpFclZAK7yNcyRe9b7PzZAlTU2rIrOROugMZCO5uQVc';
                    url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.adSetId + "?fields=" + fields + "&access_token=" + access_token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    err_6 = _a.sent();
                    return [2 /*return*/, err_6.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAdSetById = getAdSetById;
function getLocation() {
    return __awaiter(this, void 0, void 0, function () {
        var API_Version, locationType, type, access_token, url, response, data, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    API_Version = 'v19.0';
                    locationType = ['country'];
                    type = 'adgeolocation';
                    access_token = 'EAATyloueTgYBO47AEMOskgkWcEKWuWYWEpx7ccZASzlr0G9xZB6P4F9O8kHKg0vvjgKF9l86SrLcJFTkzmTOiMiQxBapyFKTM9fqDJAxZB31rz1iPcCSKwjASSWGYYRcNZBwjJZBFs8SzqzuR8d43vZBZAdKH09HlzZAbpFclZAK7yNcyRe9b7PzZAlTU2rIrOROugMZCO5uQVc';
                    url = "https://graph.facebook.com/" + API_Version + "/search?location_types=" + locationType + "&type=" + type + "&q=united&access_token=" + access_token;
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
                    err_7 = _a.sent();
                    return [2 /*return*/, err_7.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getLocation = getLocation;
function Get_Ad_Draft() {
    return __awaiter(this, void 0, void 0, function () {
        var fields, url, response, data, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = 'name,status,creative,adset_id,effective_status,campaign_id,configured_status,created_time,updated_time,tracking_specs';
                    url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.AD_ACCOUNT_ID + "/ads?status=DRAFT&access_token=" + envVariables_1.FB_token + "&fields=" + fields;
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
                    err_8 = _a.sent();
                    return [2 /*return*/, err_8.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.Get_Ad_Draft = Get_Ad_Draft;
function deletePost(page_post_id) {
    return __awaiter(this, void 0, void 0, function () {
        var accessToken, FB_API_VERSION, url, response, error, error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accessToken = 'EAATyloueTgYBOyP4NcxRoscmDio8iFFY8lZA1Cow0VoHj1uQVI0wj3RygtnicHXXUjpSkkwW8IXd4kBdiIIi9BLyaBDvXpdzQQvIPOQBZAKErY3CD43oTdVhybxSqEXQm1ZCsXfgZBXh55FrUnpdzMc04z7HM8vTpsIQdNZAX5ctCRStfPo0XmsoYbeuZCty4XXZAdL6KDCbtNp0ocZD';
                    FB_API_VERSION = 'v18.0';
                    url = "https://graph.facebook.com/" + FB_API_VERSION + "/" + page_post_id + "?access_token=" + accessToken;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'DELETE'
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    error = _a.sent();
                    console.error('Failed to delete post:', error);
                    throw new Error(error.error.message);
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_16 = _a.sent();
                    console.error('Error deleting post:', error_16);
                    throw error_16;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.deletePost = deletePost;
function GetInterestsData() {
    return __awaiter(this, void 0, void 0, function () {
        var FB_API_VERSION, url, response, data, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    FB_API_VERSION = 'v11.0';
                    url = "https://graph.facebook.com/" + FB_API_VERSION + "/search?type=adinterest&q=baseball&access_token=" + envVariables_1.FB_token;
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
                    err_9 = _a.sent();
                    return [2 /*return*/, err_9.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetInterestsData = GetInterestsData;
function GetBehaviorsData() {
    return __awaiter(this, void 0, void 0, function () {
        var FB_API_VERSION, url, response, data, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    FB_API_VERSION = 'v11.0';
                    url = "https://graph.facebook.com/" + FB_API_VERSION + "/search?type=adTargetingCategory&class=behaviors&access_token=" + envVariables_1.FB_token;
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
                    err_10 = _a.sent();
                    return [2 /*return*/, err_10.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GetBehaviorsData = GetBehaviorsData;
function getCreativeDetails(creativeId) {
    return __awaiter(this, void 0, void 0, function () {
        var fields, token, url, response, data, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = 'thumbnail_url';
                    token = 'EAATyloueTgYBOzt4Vidq4BnSfjLZB39Bmy3VmuZBTAjBh3jPcPbLpqIUlfNTUs0QSG158vJMpg5WM6A1nXzTP88PqrbFrZCt0ejmpPBmsEsGrdgX5iPDO0GWP450GIH4NGEwCQwNTNZA9oNZCC83O0oFq6uSQHpchqE4Bv7tAZACOuo4s52ZBoHVxEjwcZAWb0TjAgj4o5a66ataVG0ZD';
                    url = "https://graph.facebook.com/v13.0/" + creativeId + "?fields=" + fields + "&access_token=" + token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    err_11 = _a.sent();
                    return [2 /*return*/, err_11.message];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getCreativeDetails = getCreativeDetails;
// for create new post APIs
function schedulePost(Details) {
    return __awaiter(this, void 0, void 0, function () {
        var imageUploadPromises, imageIds, attachedMedia, url, payload, response, responseData_1, responseData, error_17;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    imageUploadPromises = Details.media.map(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, uploadPhoto('/images/' + res.src)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(imageUploadPromises)];
                case 1:
                    imageIds = _a.sent();
                    if (imageIds.some(function (id) { return !id; })) {
                        throw new Error('One or more image uploads failed, received invalid image ID.');
                    }
                    attachedMedia = imageIds.map(function (id) { return ({ media_fbid: id.id }); });
                    url = "https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.PAGE_ID + "/feed";
                    payload = {
                        message: Details.fb_message,
                        link: Details.link,
                        published: 'false',
                        scheduled_publish_time: Math.floor(Details.dateTime / 1000) + 3600,
                        targeting: {
                            geo_locations: {
                                countries: ['US'],
                                cities: [{ key: '296875' }]
                            }
                        },
                        attached_media: attachedMedia
                    };
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer " + envVariables_1.P_PAGE_TOKEN
                            },
                            body: JSON.stringify(payload)
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseData_1 = _a.sent();
                    console.error('API Error Response:', responseData_1);
                    throw new Error("HTTP error! Status: " + response.status);
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    responseData = _a.sent();
                    notification_1.notification.success('Post ScheduleDelivery successfully !', 3000);
                    return [2 /*return*/, responseData];
                case 6:
                    error_17 = _a.sent();
                    console.error('Error scheduling post:', error_17);
                    notification_1.notification.danger('Error scheduling post', 3000);
                    throw error_17;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.schedulePost = schedulePost;
function uploadPhoto(imageUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var response, blob, file, formData, uploadResponse, errorData, imageData, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!imageUrl) {
                        console.error('No image URL provided');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, fetch(imageUrl)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch image');
                    }
                    return [4 /*yield*/, response.blob()];
                case 3:
                    blob = _a.sent();
                    file = new File([blob], imageUrl, { type: blob.type });
                    formData = new FormData();
                    formData.append('source', file);
                    formData.append('published', 'false');
                    return [4 /*yield*/, fetch("https://graph.facebook.com/" + envVariables_1.FB_API_VERSION + "/" + envVariables_1.PAGE_ID + "/photos?access_token=" + envVariables_1.P_PAGE_TOKEN, {
                            method: 'POST',
                            body: formData
                        })];
                case 4:
                    uploadResponse = _a.sent();
                    if (!!uploadResponse.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, uploadResponse.json()];
                case 5:
                    errorData = _a.sent();
                    console.error('Upload failed with response:', errorData);
                    throw new Error(errorData.error.message);
                case 6: return [4 /*yield*/, uploadResponse.json()];
                case 7:
                    imageData = _a.sent();
                    return [2 /*return*/, imageData];
                case 8:
                    error_18 = _a.sent();
                    console.error('Error uploading image:', error_18);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.uploadPhoto = uploadPhoto;
function getAdEngagementData(adId) {
    return __awaiter(this, void 0, void 0, function () {
        var fields, url, response, _a, _b, data, err_12;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fields = 'impressions,reach,clicks,actions';
                    url = "https://graph.facebook.com/v20.0/" + adId + "/insights?fields=" + fields + "&access_token=" + envVariables_1.T_TOKEN;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _c.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    _a = Error.bind;
                    _b = "Error fetching ad engagement data: ";
                    return [4 /*yield*/, response.json()];
                case 3: throw new (_a.apply(Error, [void 0, _b + (_c.sent())]))();
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _c.sent();
                    return [2 /*return*/, data.data]; // Typically, insights data is within the 'data' array
                case 6:
                    err_12 = _c.sent();
                    return [2 /*return*/, { error: err_12.message }];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getAdEngagementData = getAdEngagementData;
