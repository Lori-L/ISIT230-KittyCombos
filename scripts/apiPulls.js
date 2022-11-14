// VARIABLES
let imageArray = new Array(5);

// FUNCTIONS
function isOnline() {
    return window.navigator.onLine;
}

function fetchJSON(url) {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.url)
            return data.url;
        });
}

function loadImages() {
    for (let i = 0; i < 5; i++) {
        if (isOnline() != true) {
            console.log("User is not connected...");
            console.log("Loading Default Image...");
            imageArray[i] = ("./images/defaultCat" + i + ".jpg");
            console.log("Image loaded from " + ("./images/defaultCat" + i + ".jpg"));
            console.log("---");
        }
        else {
            console.log("User is connected...");
            console.log("Accessing cataas API...");
            let s = fetchJSON('https://cataas.com/cat?json=true&type=sq').then((data) => {
                s = data;
            });
            console.log("Image loaded from " + s);
            console.log("---");
        }
    }
    return imageArray;
}

function getImage(n) {
    return imageArray[n];
}