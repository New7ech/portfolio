/*!
 * Portfolio de SINARE Mohamed - Développeur d'Applications
 * Fichier JavaScript principal - Nettoyé et commenté en français
 * 
 * Ce fichier contient toutes les fonctionnalités interactives du portfolio :
 * - Animation de frappe (typed.js)
 * - Navigation fluide
 * - Filtres du portfolio
 * - Carrousels et animations
 */

!(function($) {
  "use strict";

  // ========================================
  // Animation de frappe pour le texte d'accueil
  // ========================================
  if ($('.typed').length) {
    // Récupération des chaînes de caractères à animer
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(','); // Conversion en tableau
    
    // Initialisation de l'animation de frappe
    new Typed('.typed', {
      strings: typed_strings, // Tableau des textes à afficher
      loop: true, // Répétition infinie
      typeSpeed: 100, // Vitesse de frappe (ms)
      backSpeed: 50, // Vitesse d'effacement (ms)
      backDelay: 2000 // Délai avant effacement (ms)
    });
  }

  // ========================================
  // Navigation fluide (smooth scroll)
  // ========================================
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    // Vérification que le lien est sur la même page
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault(); // Empêche le comportement par défaut
      var target = $(this.hash); // Cible de l'ancre
      
      if (target.length) {
        // Calcul de la position de défilement
        var scrollto = target.offset().top;

        // Animation de défilement fluide
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        // Mise à jour de l'état actif du menu
        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        // Fermeture du menu mobile après clic
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // ========================================
  // Défilement automatique au chargement de la page
  // ========================================
  $(document).ready(function() {
    // Vérification de la présence d'une ancre dans l'URL
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        // Défilement vers l'élément ciblé
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // ========================================
  // Gestion du menu mobile
  // ========================================
  $(document).on('click', '.mobile-nav-toggle', function(e) {
    // Basculement de l'état du menu mobile
    $('body').toggleClass('mobile-nav-active');
    // Changement de l'icône (hamburger ↔ croix)
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  // Fermeture du menu mobile en cliquant à l'extérieur
  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    // Vérification que le clic n'est pas sur le bouton du menu
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // ========================================
  // Mise à jour de l'état actif du menu lors du défilement
  // ========================================
  var nav_sections = $('section'); // Toutes les sections de la page
  var main_nav = $('.nav-menu, .mobile-nav'); // Menu de navigation

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200; // Position actuelle + offset

    // Parcours de toutes les sections
    nav_sections.each(function() {
      var top = $(this).offset().top, // Position du haut de la section
        bottom = top + $(this).outerHeight(); // Position du bas de la section

      // Vérification si la section est visible
      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active'); // Suppression de l'état actif
        }
        // Ajout de l'état actif au lien correspondant
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      // État actif par défaut pour la première section
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // ========================================
  // Bouton de retour en haut de page
  // ========================================
  $(window).scroll(function() {
    // Affichage/masquage du bouton selon la position de défilement
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow'); // Affichage avec animation
    } else {
      $('.back-to-top').fadeOut('slow'); // Masquage avec animation
    }
  });

  // Fonctionnalité du bouton de retour en haut
  $('.back-to-top').click(function() {
    // Animation de défilement vers le haut
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false; // Empêche le comportement par défaut
  });

  // ========================================
  // Animation des compteurs (statistiques)
  // ========================================
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10, // Délai entre chaque incrément (ms)
    time: 1000 // Durée totale de l'animation (ms)
  });

  // ========================================
  // Animation des barres de compétences
  // ========================================
  $('.skills-content').waypoint(function() {
    // Animation des barres de progression au scroll
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%' // Déclenchement à 80% de la hauteur de l'élément
  });

  // ========================================
  // Filtres du portfolio (Isotope)
  // ========================================
  $(window).on('load', function() {
    // Initialisation d'Isotope pour la grille du portfolio
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item', // Sélecteur des éléments
      layoutMode: 'fitRows' // Mode de disposition
    });

    // Gestion des clics sur les filtres
    $('#portfolio-flters li').on('click', function() {
      // Suppression de la classe active sur tous les filtres
      $("#portfolio-flters li").removeClass('filter-active');
      // Ajout de la classe active sur le filtre cliqué
      $(this).addClass('filter-active');

      // Filtrage des éléments du portfolio
      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      // Réinitialisation des animations AOS
      aos_init();
    });

    // Initialisation de Venobox (lightbox pour les images)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // ========================================
  // Carrousel des témoignages (Owl Carousel)
  // ========================================
  $(".testimonials-carousel").owlCarousel({
    autoplay: true, // Lecture automatique
    dots: true, // Affichage des points de navigation
    loop: true, // Boucle infinie
    responsive: { // Configuration responsive
      0: {
        items: 1 // 1 élément sur mobile
      },
      768: {
        items: 2 // 2 éléments sur tablette
      },
      900: {
        items: 2 // 2 éléments sur desktop
      }
    }
  });

  // ========================================
  // Carrousel des détails du portfolio
  // ========================================
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true, // Lecture automatique
    dots: true, // Affichage des points de navigation
    loop: true, // Boucle infinie
    items: 1 // 1 élément à la fois
  });

  // ========================================
  // Initialisation des animations AOS (Animate On Scroll)
  // ========================================
  function aos_init() {
    AOS.init({
      duration: 1000, // Durée de l'animation (ms)
      easing: "ease-in-out-back", // Type d'animation
      once: true // Animation une seule fois
    });
  }
  
  // Initialisation au chargement de la page
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

// ========================================
// Message de console personnalisé
// ========================================
console.log(
  `%c                       
                                ___________________________________________
                                ___________________________________________
                                < Portfolio SINARE Mohamed - Code propre 😀>
                                -------------------------------------------
                                -------------------------------------------                                                                                                                  
 __       __            __              _______                                 __                                         
/  |  _  /  |          /  |            /       \                               /  |                                        
$$ | / \ $$ |  ______  $$ |____        $$$$$$$  |  ______   __     __  ______  $$ |  ______    ______    ______    ______  
$$ |/$  \$$ | /      \ $$      \       $$ |  $$ | /      \ /  \   /  |/      \ $$ | /      \  /      \  /      \  /      \ 
$$ /$$$  $$ |/$$$$$$  |$$$$$$$  |      $$ |  $$ |/$$$$$$  |$$  \ /$$//$$$$$$  |$$ |/$$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |
$$ $$/$$ $$ |$$    $$ |$$ |  $$ |      $$ |  $$ |$$    $$ | $$  /$$/ $$    $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$ |  $$/ 
$$$$/  $$$$ |$$$$$$$$/ $$ |__$$ |      $$ |__$$ |$$$$$$$$/   $$ $$/  $$$$$$$$/ $$ |$$ \__$$ |$$ |__$$ |$$$$$$$$/ $$ |      
$$$/    $$$ |$$       |$$    $$/       $$    $$/ $$       |   $$$/   $$       |$$ |$$    $$/ $$    $$/ $$       |$$ |      
$$/      $$/  $$$$$$$/ $$$$$$$/        $$$$$$$/   $$$$$$$/     $/     $$$$$$$/ $$/  $$$$$$/  $$$$$$$/   $$$$$$$/ $$/       
                                                                                             $$ |                          
                                                                                             $$ |                          
                                                                                             $$/                           
           
                                                                                        
                                                                                        
                                                                                        
                                                                               `,
  "font-family:monospace"
);
