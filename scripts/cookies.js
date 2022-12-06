//Creates a cookie with the provided name and value
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";" +  "path=/";
}

//Locates and returns the specified cookie's value, if it exists
function getCookie(cname) {
  let name = cname + "=";

  //Creates a cookie array by using ; as a breaking point for each value
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  //Searches the cookie array for the goal cookie
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];

    //Removes any extra spaces at the beginning of the string
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    
    //Returns the value of the goal cookie if it is found
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  //Returns an empty value if the goal cookie is not found
  return "";
}

//Checks if a value exists for the specified cookie. If it doesn't, assigns the cookie to a default value
function checkCookie(cname, defaultVal) {
  let cookie = getCookie(cname);

  //Returns true if there is a preexisting cookie
  if (cookie != "") {
  return true;
  } 
  //Sets the cookie to the default value and returns false if there is no preexisting cookie
  else {
    setCookie(cname, defaultVal);
    return false;
  }
}