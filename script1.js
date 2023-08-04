//open new episode from query
var videosArr = document.querySelectorAll('.video__title');

if(videosArr != undefined && videosArr.length > 0)
{   
    chrome.storage.session.get(["compareString"]).then((result) => {
        console.log("Value currently is " + result.compareString);

        let compareString = result.compareString || "";
        let maxSimilarity = 0;
        let correctIndex = 0;

        for(let i = 0; i < videosArr.length; i++) {
            let currSimilarity = similarity(compareString.toLowerCase().trim(), videosArr[i].innerText.toLowerCase().trim());

            if( currSimilarity > maxSimilarity) {
                maxSimilarity = currSimilarity;
                correctIndex = i;
            }
        }

        window.location.href = videosArr[correctIndex].parentElement.parentElement.href + "?plugin=1";
    });
}
else //if no video was found - probably last episode of season => increment season number
{
    let currUrl = window.location.href; 
    var seasonEpisode = currUrl.match(/s[0-9]*[0-9]e[0-9]*[0-9]/); //returns an array
    var episode = seasonEpisode[0].split('e')[1];
    var season = seasonEpisode[0].split('e')[0].substring(1);

    //increment season number
    var tmpSeason = parseInt(season) + 1;
    season = tmpSeason.toString();

    //add leading 0, if season is in range 1-9
    if(season.length < 2)
    {
        season = "0" + season;
    }

    //set episode number to 1
    episode = "01";
    

    //get series name
    var series = currUrl.replace('https://prehraj.to/hledej', '');
    var series = series.substring(0, series.indexOf('%20s'));

    var newUrl = "https://prehraj.to/hledej/" + series + "%20s" + season + "e" + episode + "?plugin=1&query=1";
    console.log(newUrl);
    
    
    if((currUrl.match(/\//g) || []).length <= 4) {
        //window.location.href = newUrl;
    }
}


   
function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}
  
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                        costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}