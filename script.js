console.log('Hello world!');

document.cookie = "history=" + "stranger things" + ";" + "expires="+ new Date(new Date().getTime()+60*60*1000*24*7).toGMTString()+";path=/"; //cookie will dissappear after 7 days (not quite truth, cause it will probably reset after each load :/ )

//kind of pointless... it is read-only
function getAllCookies ()
{
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, ...value] = current.split('=');
        prev[name] = value.join('=');
        return prev;
      }, {});
}

function getCookie(name)
{
    var object = getAllCookies();
    return object[name];
}

function deleteCookie(name) {
    document.cookie = name +"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function cookieExists(name)
{
    var index = document.cookie.indexOf(name);
    return (index == -1 ? false : true);
}

function isInArray(array, substring)
{
    const index = array.findIndex(element => {
        if (element.includes(substring)) {
          return true;
        }
      });

    return index;
    
}

//initialize cookies history
if(!cookieExists('recentlySeen'))
{
    //encode array
    var arr = [];
    var json_str = JSON.stringify(arr);
    //createCookie('mycookie', json_str);
    document.cookie = "recentlySeen=" + json_str + ";" + "expires="+ new Date(new Date().getTime()+60*60*1000*24*31).toGMTString()+";path=/";
}

var cookies = getCookie('recentlySeen');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse({cookies: cookies});
    }
  );


/*
//decode array
json_str = getCookie('mycookie');
arr = JSON.parse(json_str);
console.log(arr);
console.log(json_str);*/


// 1. Create the button
var button = document.createElement("button");
button.innerHTML = "Next episode";
button.className = "next-btn"; 

// 2. Append somewhere
var body = document.querySelector(".jw-media"); //button uvnitř videa
//var body = document.getElementsByTagName("body")[0];
if(body != undefined)
{
    body.appendChild(button);
}


// 3. Add event handler
button.addEventListener ("click", function() {

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
    
    var newUrl = "https://prehraj.to/hledej/" + series + "%20s" + season + "e" + episode + "?plugin=1&query=1";


    //decode array
    json_str = getCookie('recentlySeen');
    var history = JSON.parse(json_str);


    var index = isInArray(history, series);
    if(index != -1)
    {
        //move already existing series to first index and update seasson and episode
        history.splice(index,1);
        history.unshift(series + " s" + season + " e" + episode);
    }
    else
    {
        history.unshift(series + " s" + season + " e" + episode);//akorát chci číslo epizody o 1 větší //unshift = prepend
    }
    while(history.length > 5)
    {
        history.pop();
    }
    console.log(history);

    


    //encode array
    var json_str = JSON.stringify(history);
    document.cookie = "recentlySeen=" + json_str + ";" + "expires="+ new Date(new Date().getTime()+60*60*1000*24*31).toGMTString()+";path=/";


    

    console.log(newUrl);
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