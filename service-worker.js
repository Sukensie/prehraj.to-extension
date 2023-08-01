
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("message service");
    console.log(message.value);

    //set auto play setting
    if (message.setting === "setAutoPlay") {
        chrome.storage.sync.set({ autoPlay: message.value }, function () {
        });
    }

    //get auto play setting
    if (message.setting === "getAutoPlay") {
        chrome.storage.sync.get("autoPlay", function (data) {
            const settingValue = data.autoPlay || false;
            sendResponse({ autoPlay: settingValue });
        });
    }

    // Return true to indicate that the response is sent asynchronously
    return true;
});
