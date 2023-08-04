//check if series are in array of recently seen series
function isInArray(array, seriesName)
{
    const index = array.findIndex(element => {
        if ((element.series).includes(seriesName)) {
          return true;
        }
      });

    return index;
    
}

// Function to send a message to the background script requesting the saved setting
function getSavedSetting(settingName) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ setting: settingName }, function (response) {
            if (response) {
                if (response.autoPlay) {
                    let video = document.querySelector('video');
                    if (video !== null) {
                        video.play();
                    }
                }
                if (response.recentlySeen) {
                    console.log("recently seen from service worker123");
                    console.log(response.recentlySeen);
                    resolve(response.recentlySeen);
                }
                //TODO other settings

                resolve(true);
            }
        });
    });
}

//load all settings from service worker
async function init() {
    await getSavedSetting("getAutoPlay");
    await getSavedSetting("getRecentlySeen").then((setting) => {
        recentlySeen = setting;
    });
}

//global variables
var recentlySeen;


//init script logic
init();


// 1. Create the button
var button = document.createElement("button");
button.innerHTML = "Next episode";
button.id = "next-btn"; 

// 2. Append somewhere
var videoContainer = document.querySelector("video");
videoContainer = (videoContainer ? videoContainer.parentNode : null); //button inside of video

if(videoContainer)
{
    videoContainer.appendChild(button);
}


// 3. Add event handler
button.addEventListener("click", function() {

    let currUrl = window.location.href; 
    var seasonEpisode = currUrl.match(/s[0-9]*[0-9]e[0-9]*[0-9]/); //returns an array --works only for s01e02 not 01x02
    var match = /[0-9]/.exec(currUrl); //index
    if (match) {
        console.log("match found at " + match.index);
        console.log(currUrl.substring(0,match.index));
    }
    console.log(match.index);
    if(seasonEpisode == null)
    {
        seasonEpisode = currUrl.match(/[0-9]*[0-9]x[0-9]*[0-9]/); //returns an array --works only for s01e02 not 01x02
        var splitChar = 'x';
        match.index -= 1; 
    }
    else
    {
        var splitChar = 'e';
        match.index -= 2; 
    }
    console.log(match.index);

    var episode = seasonEpisode[0].split(splitChar)[1];
    var season = seasonEpisode[0].split(splitChar)[0].substring(1);
    

    //increment episode number
    var tmpEpisode = parseInt(episode) + 1;
    tmpEpisode = tmpEpisode.toString();
    while(tmpEpisode.length < episode.length)
    {
        tmpEpisode = 0 + tmpEpisode;
    }
    episode = tmpEpisode;


    //get series name
    var series = currUrl.substring(0, match.index);
    series = series.replace('https://prehraj.to/', '');
    
    var newUrl = "https://prehraj.to/hledej/" + series.replace('-', '%20') + "%20s" + season + "e" + episode + "?plugin=1&query=1";
    
    series = series.replace('-', ' ');


    var index = isInArray(recentlySeen, series);
    if(index != -1)
    {
        //delete already present series from array so that it could be later moved to first index
        recentlySeen.splice(index,1);  
    }

    //prepend series to the beginning of recentlySeen array
    recentlySeen.unshift({series: series, season: season, episode: episode});

    while(recentlySeen.length > 5)
    {
        recentlySeen.pop();
    }

    //save new recently seen episodes array
    chrome.runtime.sendMessage({ setting: "setRecentlySeen", value: recentlySeen });


    //send compare string to script1.js to find the most accurate video name
    chrome.storage.session.set({ compareString: document.querySelector('h1 span').innerText });


    window.location.href = newUrl;
    //window.open(newUrl, '_blank');
});

function mousemove(event){
    //console.log("pageX: ",event.pageX,     "pageY: ", event.pageY,     "clientX: ", event.clientX,     "clientY:", event.clientY)

    if(event.pageX > (window.screen.width * 0.9) && event.pageY > (window.screen.height * 0.6) && event.pageY < (window.screen.height * 0.95))
    {
        button.classList.add('show');
    }
    else
    {
        if(button.classList.contains('show'))
             button.classList.remove('show');
    }
}

window.addEventListener('mousemove', mousemove);