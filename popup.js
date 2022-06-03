function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs)
    {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"}, function(response)
        {
            var history = JSON.parse(response.cookies);
            console.log(history);

            //generate buttons
            for (var i = 0; i < history.length; i++) 
            {
                var btn = document.createElement("a");

                var detail = history[i].split(" ");


                var tmpEpisode = parseInt((detail[2].substring(1))) + 1;
                tmpEpisode = tmpEpisode.toString();
                while(tmpEpisode.length < detail[2].length -1)
                {
                    tmpEpisode = 0 + tmpEpisode;
                }
                detail[2] = "e"+tmpEpisode;


                //detail[0] = series, detail[1] = seasson, detail[2] = episode
                var newUrl = "https://prehraj.to/hledej/" + detail[0] + "%20" + detail[1] + detail[2] + "?plugin=1&query=1";
                detail[0] = detail[0].replaceAll("-", " ");
                console.log(detail[0]);

                var t = document.createTextNode(detail[0]);
                var span = document.createElement("span");
                var s = document.createTextNode(detail[1] + " " + detail[2]);
                span.appendChild(s);

                btn.title = detail[0] + " " + detail[1] + detail[2];
                btn.href = newUrl;
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
        });
   });
}

document.addEventListener("DOMContentLoaded", function() {
  popup();
});