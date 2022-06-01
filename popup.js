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
                var newUrl = "https://prehraj.to/hledej/" + detail[0] + "%20" + detail[1] + detail[2] + "?plugin=1&query=1";
                detail[0] = detail[0].replace("-", " ");

                var t = document.createTextNode(detail[0]);
                var span = document.createElement("span");
                var s = document.createTextNode(detail[1] + " " + detail[2]);
                span.appendChild(s);

                btn.title = history[i];
                btn.href = newUrl;
                btn.appendChild(t);
                btn.appendChild(span);
                document.body.appendChild(btn);


                btn.addEventListener("click",function()
                {
                    window.location.href = newUrl;
                });
            }
        });
   });
}

document.addEventListener("DOMContentLoaded", function() {
  popup();
});