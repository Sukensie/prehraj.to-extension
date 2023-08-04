//enable usage of session storage for content scripts
chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    
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

    //set recently seen series
    if (message.setting === "setRecentlySeen") {
        chrome.storage.sync.set({ recentlySeen: message.value }, function () {
        });
    }

    //get recently seen series
    if (message.setting === "getRecentlySeen") {
        chrome.storage.sync.get("recentlySeen", function (data) {
            sendResponse({ recentlySeen: data.recentlySeen });
        });
    }

    if (message.recentySeen) {
        console.log("service rcntly seen");
        console.log(message.recentySeen);
    }

    // Return true to indicate that the response is sent asynchronously
    return true;
});
