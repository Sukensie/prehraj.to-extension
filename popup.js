document.addEventListener("DOMContentLoaded", function() {
    popup();

    //auto play checkbox
    const autoPlay = document.querySelector('#autoplay');

    //set chechbox UI to be checked/unchecked
    chrome.runtime.sendMessage({ setting: "getAutoPlay" }, function (response) {
        if (response && response.autoPlay) {
            autoPlay.checked = response.autoPlay;
        }
    });

    //if auto play checkbox changes value, send message to background service worker that will save it to chrome storage
    autoPlay.addEventListener("change", function () {
        chrome.runtime.sendMessage({ setting: "setAutoPlay", value: autoPlay.checked });
        //window.close();
    });
});

function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs)
    {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"}, function(response)
        {
            chrome.runtime.sendMessage({ setting: "getRecentlySeen" }, function (response) {
                if (response && response.recentlySeen) { 

                    //generate buttons
                    for(let item of response.recentlySeen) {

                        var btn = document.createElement("a");


                        /*var tmpEpisode = parseInt(((item.episode).substring(1))) + 1;
                        tmpEpisode = tmpEpisode.toString();
                        while(tmpEpisode.length < (item.episode).length - 1)
                        {
                            tmpEpisode = 0 + tmpEpisode;
                        }*/


                        var newUrl = "https://prehraj.to/hledej/" + item.series + "%20s" + item.season + "e" + item.episode + "?plugin=1";

                        var span = document.createElement("span");
                        var s = document.createTextNode("s" + item.season + " e" + item.episode);
                        span.appendChild(s);

                        btn.title = item.series + " s" + item.season + "e" + item.episode;
                        btn.href = newUrl;
                    
                        var t = document.createTextNode(item.series);
                        btn.appendChild(t);
                        btn.appendChild(span);
                        document.body.appendChild(btn);


                        btn.addEventListener("click",function(e)
                        {
                            var href = e.target.href;
                            chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                                    chrome.tabs.update(tab.id, {url: href});
                            });
                            window.close();
                        });
                    }
                }
            });
        });
   });
}