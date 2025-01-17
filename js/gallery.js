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
	if(mCurrentIndex >= mImages.length)
		{
		  mCurrentIndex = 0;
		}
	   
		console.log('swap photo');

		$("#photo").attr('src', mImages[mCurrentIndex].img);
		$(".location").text("Location: " + mImages[mCurrentIndex].location);
		$(".description").text("Description: " + mImages[mCurrentIndex].description);
		$(".date").text("Date: " + mImages[mCurrentIndex].date);
		mCurrentIndex++;
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
	mJson.images.forEach(element => {
	let galleryImageObjects = new GalleryImage(
		element.imgLocation,
		element.description,
		element.date,
		element.imgPath
	);

	mImages.push(galleryImageObjects);
	});
	
}

function fetchJSON() {
mRequest.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200)
	mJson = JSON.parse(mRequest.responseText);
	iterateJson();
};
mRequest.open("GET", mUrl, true);
mRequest.send();
	}

	$(document).ready( function() {
	
		// This initially hides the photos' metadata information
		$('.details').eq(0).hide();
		fetchJSON();
		
	});

	window.addEventListener('load', function() {
	
	}, false);

	class GalleryImage {
	constructor(location, description, date, img) {

		this.location = location;
		this.description = description;
		this.date = date;
		this.img = img;
	}
}