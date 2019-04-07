// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	$("#photo").attr("src", mImages[0].img);
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;


/*
Start of XMLHttpRequest
*/

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = []; 

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mURL = "images.json"
mRequest.onreadystatechange = function() {
// Do something interesting if file is opened successfully
if (mRequest.readyState == 4 && mRequest.status == 200) {
try {
// Let’s try and see if we can parse JSON (see next slide)
mJson = JSON.parse(mRequest.responseText);

// LOOP THROUGH the mJSON array here and fill up the
// mImages array with GalleryImage objects
for (var i=0; i<mJson.images.length; i++){
	mImages.push(new GalleryImage(mJson.images[i]["location"],mJson.images[i]["description"],mJson.images[i]["date"],mJson.images[i]["img"]));	
	
	
}

// Let’s print out the JSON; It will likely show as “obj”
console.log(mJson);


} catch(err) {
console.log(err.message)
}
}
};
mRequest.open("GET",'images-short.json', true);
mRequest.send();

/*
END OF XMLHttpRequest
*/


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}
$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});



window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

//javascript object to hold data of the images

function GalleryImage(location, description, date, img) {
this.location = location;
this.description = description;
this.date = date;
this.img = img;
}; 


