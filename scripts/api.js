async function fetchJSON(url) {
  var image = {  // Default image values
      "img0": './images/defaultCat0.jpg',
      "img1": './images/defaultCat1.jpg',
      "img2": './images/defaultCat2.jpg',
      "img3": './images/defaultCat3.jpg',
      "img4": './images/defaultCat4.jpg',
  }

  if (window.navigator.onLine == true) { // If Online
      let i = 0;
      do {
          res = await fetch(url); // Wait for api
          imageData = await res.json(); // Wait for JSON
          console.log(i + ' https://cataas.com' + imageData.url); // Log loaded url
          if (imageData.mimetype != 'image/gif') { // If image is not a gif
              switch(i) { // Set each image based on iteration
                  case 0:
                      image.img0 = 'https://cataas.com' + imageData.url;
                      break;
                  case 1:
                      image.img1 = 'https://cataas.com' + imageData.url;
                      break;
                  case 2:
                      image.img2 = 'https://cataas.com' + imageData.url;
                      break;
                  case 3:
                      image.img3 = 'https://cataas.com' + imageData.url;
                      break;
                  case 4:
                      image.img4 = 'https://cataas.com' + imageData.url;
                      break;
              }
              i++; // Iterate
          }
      }
      while (i < 5 && window.navigator.onLine == true); // While there are less than 5 images and user remains online
  }
  // Return image object
  return image;
}