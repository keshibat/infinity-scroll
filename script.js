const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

 let ready = false;
 let imagesLoaded = 0;
 let totalImages = 0;
 let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let count = 5;
const apiKey = 'b7eb7ef2ff093deccf3f56085373fe2c4265695a2a88dc6fd92d63c94011504f';
const  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function updateAPIURLWithNewCount () {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count= 30;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key,attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhoto () {
   imagesLoaded = 0;
   totalImages = photosArray.length;
   // Run function for each object in photosArray
   photosArray.forEach((photo) => {
     // Create <a> to link to Unsplash
     const item = document.createElement('a');
    //  item.setAttribute('href', photo.links.html);
    //  item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })
    // Create <img> for photo
     const img = document.createElement('img');
    //  img.setAttribute('src', photo.urls.regular);
    //  img.setAttribute('alt', photo.alt_descripiton);
    //  img.setAttribute('title', photo.alt_descripiton);
      setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_descripiton,
      title: photo.alt_descripiton,
    })
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
     // Put <img> inside <a>, then put both inside imageContainer Element
     item.appendChild(img);
     imageContainer.appendChild(item);
   })
}

// GET photos from Unsplash API
async function getPhotos () {
  try {
    const response = await fetch(apiUrl);
     photosArray = await response.json();
     displayPhoto();
     if (isInitialLoad) {
       updateAPIURLWithNewCount(30);
       isInitialLoad = false;
     }
  } catch (error) {
    console.log(error);
  }
}

// check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();
