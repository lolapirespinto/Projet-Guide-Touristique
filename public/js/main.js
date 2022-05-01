 /* Fonction pour la barre de recherche */
const searchinput = document.getElementById('searchbar');

if(searchinput) {
   searchinput.addEventListener('keyup',function(){
     
       
     var div = document.getElementById('suggestions');
     while(div.firstChild)
       div.removeChild(div.firstChild);  
     const input = searchinput.value;
     const data = JSON.parse(document.getElementById('data').textContent);
     const result = data.filter(iterator => iterator.Nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
     let suggestion = document.getElementById('suggestions');

     if(input != '') {
     
       result.forEach(resultIterator => {
         let div_suggestion = document.createElement("div");
         div_suggestion.setAttribute("id",resultIterator.ActivitesId);
         div_suggestion.setAttribute("class","suggestions");
         link = document.createElement("a");
         link.innerHTML = resultIterator.Nom;
         link.setAttribute("href",`activites/${resultIterator.ActivitesId}`);
         div_suggestion.appendChild(link);
         suggestion.appendChild(div_suggestion);
       })
     }
     else {
       var div = document.getElementById('suggestions');
       while(div.firstChild)
         div.removeChild(div.firstChild);
       }
     }
)}

/* Fonction pour charger la carte google maps */
function initCarte() {

    //coordonnées pour notre ville Paris 
    var lat = 48.8737673; 
    var lon = 2.2954441;

    const location = {lat: 48.8737673, lng: 2.2954441};

    map = new google.maps.Map(document.getElementById("carte"), {

        //centre la carte à la position donnée
        center: new google.maps.LatLng(lat, lon), 

        //définit le zoom 
        zoom:15, 

        //pour afficher que un seul endroit
        scrollwheel: false, 
        
        //définit comme les options se placent (ici à l'horizontal)
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR 
        },

        // Activation des options de navigation dans la carte (zoom...)
        navigationControl: true, 
        navigationControlOptions: {

        // Définit comment les options doivent s'afficher
         style: google.maps.NavigationControlStyle.ZOOM_PAN
        }
    });
}

/* Fonction qui charge la carte centré sur la position de l'utilisateur. */
function cartePosition(position) {

  /*---------Géolocalisation--------------------- */
  const location = {lat: position.coords.latitude, lng: position.coords.longitude};
  
  /*---------TEST LOCALISATION À PARIS-----------*/
  //const location3 = {lat: 48.873725, lng: 2.294289};

  map = new google.maps.Map(document.getElementById("carte"), {

    //centre la carte à la position donnée
    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
    //center: new google.maps.LatLng(48.873725, 2.294289), 

    //définit le zoom 
    zoom:15, 

    //pour afficher que un seul endroit
    scrollwheel: false, 
    
    //définit comme les options se placent (ici à l'horizontal)
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR 
    },

    // Activation des options de navigation dans la carte (zoom...)
    navigationControl: true, 
    navigationControlOptions: {

    // Définit comment les options doivent s'afficher
     style: google.maps.NavigationControlStyle.ZOOM_PAN
  }
  });

  //MARQUEUR GÉOLOCALISATION
  new google.maps.Marker({
    position : location,
    map: map,
  });

  //TEST LOCALISATION À PARIS
  /*new google.maps.Marker({
      position : location3,
      map: map,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
      }
  });*/

  const data = JSON.parse(document.getElementById('data').textContent)

  for (const iterator in data) {
    var location2 = {lat: data[iterator].Latitude, lng: data[iterator].Longitude};
    let marker = new google.maps.Marker({
      position : location2,
      map: map,
    });
    google.maps.event.addListener(marker,'click',function() {
      let id = data[iterator].ActivitesId;
      window.location.href = "activites/"+id+"";
    });
  }

  //centre la carte sur localisation de l'utilisateur
  map.panTo(location);
}

/* Fonction qui retourne la localisation de l'utilisateur.*/
function maposition() {

  //si la localisation fonctionne 
  const success = (position) => {
    var latitude = position.coords.latitude; 
    var longitude = position.coords.longitude; 
    cartePosition(position)
  }

  //s'il y'a une erreur pour localiser l'utilisateur
  const error = (erreur) => {
    var msg;
    switch(erreur.code){
      case erreur.TIMEOUT:
        msg = "Le temps de la requête à expiré!";
      break;
      case erreur.UNKNOWN_ERROR:
        msg = "Erreur inconnue.";
      break;
      case erreur.POSITION_UNVAILABLE:
        msg = "Impossible de trouver la localisation.";
      break;
      case erreur.PERMISSION_DENIED:
        msg = "Vous avez refusé la géolocalisation";
      break;
    }
    alert(msg);
    console.log("Géolocalisation non accessible.")
  }
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success,error);
  }
  else {
    console.log("API géolocalisation non accessible.");
  }
}

if (typeof window !== "undefined") {
  window.onload = function(){
    initCarte(); 
 };
}

(function() {
  "use strict";

  /* selector helper function*/

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /*event listener function */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /*  on scroll event listener */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /*Scroll avec les boutons du navbar */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /* Changer l'élement du header apres scroll  */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /* header fixe */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /* Back to top button */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  
  /* activities  and filter */
  window.addEventListener('load', () => {
    let activitiesContainer = select('.activities-container');
    if (activitiesContainer) {
      let activitiesIsotope = new Isotope(activitiesContainer, {
        itemSelector: '.activities-item',
        layoutMode: 'fitRows'
      });

      let activitiesFilters = select('#activities-flters li', true);

      on('click', '#activities-flters li', function(e) {
        e.preventDefault();
        activitiesFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        activitiesIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        activitiesIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /* Initiate activities lightbox */
  const activitiesLightbox = GLightbox({
    selector: '.activities-lightbox'
  });

  /* activities details slide*/
  new Swiper('.activities-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  
  /* Animation on scroll */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

