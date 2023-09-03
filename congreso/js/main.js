jQuery(document).ready(function ($) {
  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $("#intro").css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $(".venobox").venobox({
    bgcolor: "",
    overlayColor: "rgba(6, 12, 34, 0.85)",
    closeBackground: "",
    closeColor: "#fff",
  });

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-fixed")) {
            top_space = top_space - 20;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: { items: 1 },
      768: { items: 3 },
      992: { items: 4 },
      1200: { items: 5 },
    },
  });

  // Buy tickets select the ticket type on click
  $("#buy-ticket-modal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data("ticket-type");
    var modal = $(this);
    modal.find("#ticket-type").val(ticketType);
  });

  // custom code

  /*------------------
        CountDown
    --------------------*/

  // Use this for real timer date
  var timerdate = "2023/10/26 18:00:00"; // Cambia la hora a la hora de inicio del evento

  $("#countdown").countdown(timerdate, function (event) {
    $(this).html(
      event.strftime(
        "<div class='cd-item'><span>%D</span> <p>Days</p> </div>" +
          "<div class='cd-item'><span>%H</span> <p>Hrs</p> </div>" +
          "<div class='cd-item'><span>%M</span> <p>Mins</p> </div>" +
          "<div class='cd-item'><span>%S</span> <p>Secs</p> </div>"
      )
    );
  });

  // Función para previsualizar la imagen seleccionada
  function previewImage() {
    var preview = document.querySelector("#imagen-preview");
    var fileInput = document.querySelector("#imagen");

    fileInput.addEventListener("change", function () {
      var file = fileInput.files[0];
      var reader = new FileReader();

      reader.onload = function () {
        preview.src = reader.result;
        preview.classList.remove("d-none"); // Muestra la imagen
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
        preview.classList.add("d-none"); // Oculta la imagen si no hay selección
      }
    });
  }

  // Llama a la función de previsualización al cargar la página
  window.onload = function () {
    previewImage();
  };

  function validarFormulario() {
    // Validación de campos (agrega tus validaciones aquí)
    var nombre = document.getElementById("nombre").value;
    var cedula = document.getElementById("cedula").value;
    var telefono = document.getElementById("telefono").value;
    var correo = document.getElementById("correo").value;
    var monto = document.getElementById("monto").value;

    if (!nombre || !cedula || !telefono || !correo || !monto) {
      alert("Por favor, complete todos los campos.");
      return false;
    }

    // Recolectar los datos del formulario
    var formData = new FormData(document.getElementById("registration-form"));

    // Realizar la petición AJAX
    $.ajax({
      type: "POST",
      url: "api/data",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        // Manejar la respuesta del servidor aquí (por ejemplo, mostrar un mensaje de éxito)
        alert("Formulario enviado correctamente.");
      },
      error: function (error) {
        // Manejar errores si la petición falla
        alert("Error al enviar el formulario. Por favor, inténtelo de nuevo.");
      },
    });

    // Evitar que el formulario se envíe automáticamente
    return false;
  }
});
