console.log('Hello world!');

// 1. Create the button
var button = document.createElement("button");
button.innerHTML = "Next episode";
button.className = "next-btn"; 

// 2. Append somewhere
var body = document.querySelector(".jw-media"); //button uvnitř videa
//var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

// 3. Add event handler
button.addEventListener ("click", function() {

    let currUrl = window.location.href; 
    var seasonEpisode = currUrl.match(/s[0-9]*[0-9]e[0-9]*[0-9]/); //returns an array
    var episode = seasonEpisode[0].split('e')[1];
    var season = seasonEpisode[0].split('e')[0].substring(1);

    //increment episode number
    var tmpEpisode = parseInt(episode) + 1;
    tmpEpisode = tmpEpisode.toString();
    while(tmpEpisode.length < episode.length)
    {
        tmpEpisode = 0 + tmpEpisode;
    }
    episode = tmpEpisode;
    

    //get series name
    var series = currUrl.replace('https://prehraj.to/', '');
    var series = series.substring(0, series.indexOf('-s'));

    var newUrl = "https://prehraj.to/hledej/" + series + "%20s" + season + "e" + episode + "?plugin=1&query=1";
    console.log(newUrl);
    window.location.href = newUrl;
    //window.open(newUrl, '_blank');
});