


document.addEventListener('DOMContentLoaded', function () 
{
   
    var btn = document.getElementById('next');
    
    btn.addEventListener('click', function() 
    {
        
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let currUrl = tabs[0].url;
        
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

            var newUrl = "https://prehraj.to/hledej/" + series + "%20s" + season + "e" + episode;

            chrome.tabs.update(null, {url:newUrl}, function()
            {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['load.js']
                });
            });

            
        });   
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

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
        }); 

       
         
        //chrome.tabs.update(null, {url:"https://prehraj.to/hledej/devs%20s01e03"});
      
    });
});