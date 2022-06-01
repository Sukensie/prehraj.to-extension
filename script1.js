//open new episode from query
var video = document.querySelector('.columns');
if(video != undefined && video.children.length > 0)
{
    var link = video.children[0].children[0].href + "?plugin=1";
    window.location.href = link;
}
else
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
    window.location.href = newUrl;
}
