/* Fonction pour connecter la bdd au site web*/
/*------------ C'est ici que ca fonctionne pas : il ne reconnait pas le "require"-------------*/
/*
var mysql = require('mysql');
const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database:'guide_touristique',
  port: '8889'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});*/

/* Fonction pour charger la carte google maps */
function initMap() {

    //coordonnées pour notre ville Paris 
    var lat = 48.852969; 
    var lon = 2.349903;

    const location = {lat: 48.85315254679746, lng: 2.3500532037030104};

    map = new google.maps.Map(document.getElementById("carte"), {

        center: new google.maps.LatLng(lat, lon), 
        zoom:15, 
        //pour afficher que un seul endroit
        scrollwheel: false, 
        mapTypeControlOptions: {
            // Cette option sert à définir comment les options se placent
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR 
        },
        // Activation des options de navigation dans la carte (zoom...)
        navigationControl: true, 
        navigationControlOptions: {
            // Comment ces options doivent-elles s'afficher
         style: google.maps.NavigationControlStyle.ZOOM_PAN
        }
    });
    new google.maps.Marker({
      position : location,
      map: map 
    });
}

window.onload = function(){
    // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
   initMap(); 
};

(function() {
  "use strict";

  //Fonction qui cherche la localisation de l'utilisateur.
  /*const trouveMaPosition = () => {

    //const status = document.querySelector('.carte ');

    const success = (position) => {
      console.log(position) 
    }

    const error = () => {
      console.log("Problème")
    }

    navigator.geolocation.getCurrentPosition(success,error);

  }*/

//AIzaSyBi3tzwp-NeXzn1VssiiooacnFLlata9Y0

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