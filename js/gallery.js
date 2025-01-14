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
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(GalleryImage) {
	return function(e) {
		GalleryImage.img = e.target;
		mImages.push(GalleryImage);
	}
}


	function iterateJson() {
		mJson.images.forEach(creategalleryImageObjects);
		function creategalleryImageObjects(){
		let galleryImageObjects = new GalleryImage(imgLocation, description, date, imgPath);
		console.log(galleryImageObjects);
	}
	mImages.JSON(galleryImageObjects);
};

 // var mImages= ["imgPath", "imgLocation", "description", "date"];

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

function iterateJSON() {
	const GalleryImage = [location, description, date, img];
	mJson.forEach(GalleryImage(mImages));
};

function fetchJSON() {

mRequest.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200)
	mJson = JSON.parse(mRequest.responseText);
	console.log(mJson);
	console.log(mJson.images[0])
	iterateJSON();
};
mRequest.open("GET", mUrl, true);
mRequest.send();
	}



window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(location, description, date, img) {
	this.location = location;
	this.description = description;
	this.date = date;
	this.img = img;
}