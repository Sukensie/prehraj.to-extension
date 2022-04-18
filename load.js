document.addEventListener('DOMContentLoaded', function () 
{
    //open new episode from query
    var video = document.querySelector('.columns');
    if(video != undefined)
    {
        var link = video.children[0].children[0].href;

        chrome.tabs.update(null, {url:link});
    }
    
    alert("devka");
});