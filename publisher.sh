#!/bin/bash
echo "--- Starting script"

if [ $(dpkg-query -W -f='${Status}' zip 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
    echo "--- Installing dependencies"

    sudo apt install zip;

    echo "--- Dependencies installed"
fi


# Define the files you want to zip
button="button.css"
index="index.html"
popup="popup.js"
manifest="manifest.json"
contentScript="content-script.js"
queryScript="query-script.js"
serviceWorker="service-worker.js"
icon="icon48.png"

# Set output file name
if [[ "$1" == "-v" && -n "$2" ]];
    then
        version="$2"
    else
        version="public"
fi   

mkdir -p public
output_zip="public/$version.zip"

# Zip the defined files
zip -r "$output_zip" "$button" "$index" "$popup" "$manifest" "$contentScript" "$queryScript" "$serviceWorker" "$icon"


echo "--- Files zipped to $output_zip"