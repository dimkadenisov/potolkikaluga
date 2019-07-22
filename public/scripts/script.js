"use strict";

$(document).ready(function () {
  var phoneInputs = $('.add-phone-mask');

  if (phoneInputs.length !== 0) {
    phoneInputs.inputmask("+7 (999) 999 99 99", {
      "clearIncomplete": true
    });
  }

  ; //header scroll start

  $(window).on('scroll', function () {
    if ($(window).width() >= '768') {
      var header = $('.bottom-line-wrapper');
      var desktopLogo = $('.bottom-line-logo > img:first-child');
      var mobileLogo = $('.bottom-line-logo > img:last-child');

      if (header[0].getBoundingClientRect().top <= -35) {
        header.addClass('bottom-line-wrapper-scroll');
        desktopLogo.removeClass('d-md-block');
        mobileLogo.removeClass('d-md-none');
        mobileLogo.addClass('d-block');
      } else if (window.pageYOffset == 0) {
        header.removeClass('bottom-line-wrapper-scroll');
        desktopLogo.addClass('d-md-block');
        mobileLogo.addClass('d-md-none');
        mobileLogo.removeClass('d-block');
      }
    }
  }); //header scroll end
  //mobile header start

  var burger = $('.burger');
  var dropdown = $('.dropdown');
  var dropdownMenuLink = $('.dropdown-menu-link:not(:only-child)');
  var dropdownSubmenuBack = $('.dropdown-submenu-back');
  var cityChoiceWrapper = $('.top-line-city-choice-wrapper');
  burger.on('click', function () {
    if (dropdown.hasClass('dropdown-show')) {
      $('body').removeClass('overflow-hidden');
      dropdown.removeClass('dropdown-show');
      cityChoiceWrapper.removeClass('top-line-city-choice-wrapper-show');
      $('.dropdown-submenu').removeClass('dropdown-submenu-show');
      $('.overlay').addClass('d-none');
      $('.burger').find('.burger-close').addClass('d-none');
      $('.burger').find('.burger-open').removeClass('d-none');
    } else {
      $('body').addClass('overflow-hidden');
      $('.overlay').removeClass('d-none');
      dropdown.addClass('dropdown-show');
      cityChoiceWrapper.addClass('top-line-city-choice-wrapper-show');
      $('.burger').find('.burger-open').addClass('d-none');
      $('.burger').find('.burger-close').removeClass('d-none');
    }
  });
  dropdownMenuLink.on('click', function (e) {
    e.preventDefault();
    $(this).next('.dropdown-submenu').toggleClass('dropdown-submenu-show');
    cityChoiceWrapper.removeClass('top-line-city-choice-wrapper-show');
  });
  dropdownSubmenuBack.on('click', function (e) {
    e.preventDefault();
    $('.dropdown-submenu').removeClass('dropdown-submenu-show');
    cityChoiceWrapper.addClass('top-line-city-choice-wrapper-show');
  });

  (function () {
    var time;

    window.onresize = function (e) {
      if (time) clearTimeout(time);
      time = setTimeout(function () {
        if (document.documentElement.clientWidth > 767) {
          cityChoiceWrapper.removeClass('top-line-city-choice-wrapper-show');
          dropdown.fadeOut(200);
          dropdown.removeClass('dropdown-show');
          $('.burger-open').removeClass('d-none');
          $('.burger-close').addClass('d-none');
          $('.dropdown-submenu').removeClass('dropdown-submenu-show');
          $('body').removeClass('overflow-hidden');
          $('.overlay').addClass('d-none');
        }
      }, 5);
    };
  })(); //mobile header end
  //calculator scripts start


  $('#area-input').on('change', function (e) {
    var val = e.target.value;
    $('#area-range').val(val).change();
  });
  $('#amount-input').on('change', function (e) {
    var val = e.target.value;
    $('#amount-range').val(val).change();
  });
  $('.calculator-fieldset a').on('click', function (e) {
    e.preventDefault();
    if ($(this).attr('disabled')) return;
    var el = $(this);

    if (el.attr('data-increment')) {
      var input = el.prev();
      var value = +input.val();
      var maxValue = +el.prev().attr('max');
      var step = el.prev().attr('data-step') ? +el.prev().attr('data-step') : 1;
      var rangeInput = $(this).parent().prev().find('[data-rangeslider]');

      if (value >= maxValue) {
        el.prev().val(maxValue);
        rangeInput.val(maxValue).change();
        if (input.attr('id') === 'area-input') calculateRates(maxValue);
      } else {
        el.prev().val(+value + step);
        rangeInput.val(+value + step).change();
        if (input.attr('id') === 'area-input') calculateRates(+value + step);
      }
    } else {
      var _input = el.next();

      var _value = +_input.val();

      var minValue = +el.next().attr('min');

      var _step = el.next().attr('data-step') ? +el.next().attr('data-step') : 1;

      var _rangeInput = $(this).parent().prev().find('[data-rangeslider]');

      if (_value <= minValue) {
        el.next().val(minValue);

        _rangeInput.val(minValue).change();

        if (_input.attr('id') === 'area-input') calculateRates(minValue);
      } else {
        el.next().val(+_value - _step);

        _rangeInput.val(+_value - _step).change();

        if (_input.attr('id') === 'area-input') calculateRates(+_value - _step);
      }
    }

    ;
  });
  var rangeInputs = $('input[type="range"]');

  if (rangeInputs.length !== 0) {
    rangeInputs.rangeslider({
      polyfill: false,
      rangeClass: 'rangeslider',
      disabledClass: 'rangeslider--disabled',
      horizontalClass: 'rangeslider--horizontal',
      verticalClass: 'rangeslider--vertical',
      fillClass: 'rangeslider__fill',
      handleClass: 'rangeslider__handle',
      onSlide: function onSlide() {
        this.$element[0].parentElement.parentElement.querySelector('input[type="number"]').value = this.value;
      },
      onSlideEnd: function onSlideEnd(value) {
        calculateRates(inputArea.val());
      }
    });
  }

  ; //calculator scripts end
  // swipers start

  (function () {
    var breakpoint = window.matchMedia('(max-width: 1200px)');
    var catalogSwiper1;
    var catalogSwiper2;
    var catalogSwiper3;
    var catalogSwiper4;
    var catalogSwiper5;
    var catalogSwiper6;
    var catalogSwiper7;

    var breakpointChecker = function breakpointChecker() {
      if (breakpoint.matches) {
        if (catalogSwiper1 !== undefined) {
          catalogSwiper1.destroy(true, true);
          catalogSwiper2.destroy(true, true);
          catalogSwiper3.destroy(true, true);
          catalogSwiper4.destroy(true, true);
          catalogSwiper5.destroy(true, true);
          catalogSwiper6.destroy(true, true);
          catalogSwiper7.destroy(true, true);
        }

        return enableSmallSwiper();
      } else if (!breakpoint.matches) {
        return enableBigSwiper();
      }
    };

    var enableBigSwiper = function enableBigSwiper() {
      var catalogThumbs1 = new Swiper('.ct1', {
        loop: false,
        slideClass: 'catalog-thumbs-thumb',
        slideActiveClass: 'catalog-thumbs-thumb-active',
        slidesPerView: 6,
        spaceBetween: 24,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        breakpoints: {
          1579: {
            spaceBetween: 14
          }
        }
      });
      catalogSwiper1 = new Swiper('.cs1', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        thumbs: {
          swiper: catalogThumbs1,
          slideThumbActiveClass: 'catalog-thumbs-thumb-active'
        },
        on: {
          init: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      var catalogThumbs2 = new Swiper('.ct2', {
        loop: false,
        slideClass: 'catalog-thumbs-thumb',
        slideActiveClass: 'catalog-thumbs-thumb-active',
        slidesPerView: 6,
        spaceBetween: 24,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        breakpoints: {
          1579: {
            spaceBetween: 14
          }
        }
      });
      catalogSwiper2 = new Swiper('.cs2', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        thumbs: {
          swiper: catalogThumbs2,
          slideThumbActiveClass: 'catalog-thumbs-thumb-active'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      var catalogThumbs3 = new Swiper('.ct3', {
        loop: false,
        slideClass: 'catalog-thumbs-thumb',
        slideActiveClass: 'catalog-thumbs-thumb-active',
        slidesPerView: 6,
        spaceBetween: 24,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        breakpoints: {
          1579: {
            spaceBetween: 14
          }
        }
      });
      catalogSwiper3 = new Swiper('.cs3', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        thumbs: {
          swiper: catalogThumbs3,
          slideThumbActiveClass: 'catalog-thumbs-thumb-active'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      var catalogThumbs4 = new Swiper('.ct4', {
        loop: false,
        slideClass: 'catalog-thumbs-thumb',
        slideActiveClass: 'catalog-thumbs-thumb-active',
        slidesPerView: 6,
        spaceBetween: 24,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        breakpoints: {
          1579: {
            spaceBetween: 14
          }
        }
      });
      catalogSwiper4 = new Swiper('.cs4', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        thumbs: {
          swiper: catalogThumbs4,
          slideThumbActiveClass: 'catalog-thumbs-thumb-active'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      var catalogThumbs5 = new Swiper('.ct5', {
        loop: false,
        slideClass: 'catalog-thumbs-thumb',
        slideActiveClass: 'catalog-thumbs-thumb-active',
        slidesPerView: 6,
        spaceBetween: 24,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        breakpoints: {
          1579: {
            spaceBetween: 14
          }
        }
      });
      catalogSwiper5 = new Swiper('.cs5', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        thumbs: {
          swiper: catalogThumbs5,
          slideThumbActiveClass: 'catalog-thumbs-thumb-active'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      var catalogThumbs6 = new Swiper('.ct6', {
        loop: false,
        slideClass: 'catalog-thumbs-thumb',
        slideActiveClass: 'catalog-thumbs-thumb-active',
        slidesPerView: 6,
        spaceBetween: 24,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        breakpoints: {
          1579: {
            spaceBetween: 14
          }
        }
      });
      catalogSwiper6 = new Swiper('.cs6', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        thumbs: {
          swiper: catalogThumbs6,
          slideThumbActiveClass: 'catalog-thumbs-thumb-active'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      var catalogThumbs7 = new Swiper('.ct7', {
        loop: false,
        slideClass: 'catalog-thumbs-thumb',
        slideActiveClass: 'catalog-thumbs-thumb-active',
        slidesPerView: 6,
        spaceBetween: 24,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        breakpoints: {
          1579: {
            spaceBetween: 14
          }
        }
      });
      catalogSwiper7 = new Swiper('.cs7', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        thumbs: {
          swiper: catalogThumbs7,
          slideThumbActiveClass: 'catalog-thumbs-thumb-active'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
    };

    var enableSmallSwiper = function enableSmallSwiper() {
      catalogSwiper1 = new Swiper('.cs1', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        on: {
          init: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      catalogSwiper2 = new Swiper('.cs2', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      catalogSwiper3 = new Swiper('.cs3', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      catalogSwiper4 = new Swiper('.cs4', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      catalogSwiper5 = new Swiper('.cs5', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      catalogSwiper6 = new Swiper('.cs6', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
      catalogSwiper7 = new Swiper('.cs7', {
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true
        },
        loop: false,
        slideClass: 'catalog-swiper-slide',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.catalog-swiper-button-next',
          prevEl: '.catalog-swiper-button-prev'
        },
        on: {
          reachBeginning: getCatalogInfo,
          slideChangeTransitionStart: getCatalogInfo
        }
      });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })(); /////////////////////////////////////////////////


  (function () {
    var breakpoint = window.matchMedia('(min-width: 1200px)');
    var feedbackItemsSwiper;

    var breakpointChecker = function breakpointChecker() {
      if (breakpoint.matches === true) {
        if (feedbackItemsSwiper !== undefined) feedbackItemsSwiper.destroy(true, true);
        return;
      } else if (breakpoint.matches === false) {
        return enableSwiper();
      }
    };

    var enableSwiper = function enableSwiper() {
      feedbackItemsSwiper = new Swiper('.feedback-items-swiper', {
        loop: false,
        slideClass: 'feedback-item-wrapper',
        slidesPerView: 1,
        centeredSlides: true,
        allowTouchMove: false,
        pagination: {
          el: '.feedback-items-swiper-pagination',
          type: 'bullets',
          clickable: 'true'
        },
        navigation: {
          nextEl: '.feedback-items-swiper-button-next',
          prevEl: '.feedback-items-swiper-button-prev'
        }
      });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })();

  var feedbackThumbs1 = new Swiper('.t1', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper1 = new Swiper('.s1', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs1
    }
  });
  var feedbackThumbs2 = new Swiper('.t2', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper2 = new Swiper('.s2', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs2
    }
  });
  var feedbackThumbs3 = new Swiper('.t3', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper3 = new Swiper('.s3', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs3
    }
  });
  var feedbackThumbs4 = new Swiper('.t4', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper4 = new Swiper('.s4', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs4
    }
  });
  var feedbackThumbs5 = new Swiper('.t5', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper5 = new Swiper('.s5', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs5
    }
  });
  var feedbackThumbs6 = new Swiper('.t6', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper6 = new Swiper('.s6', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs6
    }
  });
  var feedbackThumbs7 = new Swiper('.t7', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper7 = new Swiper('.s7', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs7
    }
  });
  var feedbackThumbs8 = new Swiper('.t8', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper8 = new Swiper('.s8', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs8
    }
  });
  var feedbackThumbs9 = new Swiper('.t9', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper9 = new Swiper('.s9', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs9
    }
  });
  var feedbackThumbs10 = new Swiper('.t10', {
    loop: false,
    slideClass: 'feedback-thumbs-thumb',
    slidesPerView: 4,
    spaceBetween: 5,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      767: {
        slidesPerView: 3
      }
    }
  });
  var feedbackSwiper10 = new Swiper('.s10', {
    loop: false,
    slideClass: 'feedback-swiper-slide',
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    thumbs: {
      swiper: feedbackThumbs10
    }
  }); /////////////////////////////////////////////////

  var diamondSwiper1 = new Swiper('.ds1', {
    loop: false,
    slideClass: 'diamond-blocks-image-swiper-slide',
    navigation: {
      prevEl: '.diamond-blocks-image-swiper-button-prev',
      nextEl: '.diamond-blocks-image-swiper-button-next',
      disabledClass: 'd-none'
    }
  });
  var diamondSwiper2 = new Swiper('.ds2', {
    loop: false,
    slideClass: 'diamond-blocks-image-swiper-slide',
    navigation: {
      prevEl: '.diamond-blocks-image-swiper-button-prev',
      nextEl: '.diamond-blocks-image-swiper-button-next',
      disabledClass: 'd-none'
    }
  });
  var diamondSwiper3 = new Swiper('.ds3', {
    loop: false,
    slideClass: 'diamond-blocks-image-swiper-slide',
    navigation: {
      prevEl: '.diamond-blocks-image-swiper-button-prev',
      nextEl: '.diamond-blocks-image-swiper-button-next',
      disabledClass: 'd-none'
    }
  }); /////////////////////////////////////////////////

  var certificatesSwiper = new Swiper('.certificates-blanks-swiper', {
    loop: true,
    slideClass: 'certificates-blanks-img-wrapper',
    autoplay: {
      delay: 1500
    },
    slidesPerView: 5
  });
  var readySolutionsSwiper = new Swiper('.ready-solutions-grid', {
    loop: false,
    slideClass: 'ready-solutions-grid-item',
    spaceBetween: 70,
    slidesPerView: 2,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    navigation: {
      prevEl: '.ready-solutions-grid-button-prev',
      nextEl: '.ready-solutions-grid-button-next'
    },
    breakpoints: {
      1579: {
        spaceBetween: 40,
        slidesPerView: 2,
        slidesPerColumn: 1
      },
      991: {
        slidesPerView: 1,
        slidesPerColumn: 1
      }
    }
  });

  (function () {
    var breakpoints = [window.matchMedia('(max-width: 1579px)'), window.matchMedia('(max-width: 991px)')];
    var readySolutionsSwiper;

    var breakpointChecker = function breakpointChecker() {
      for (var i = 0; i < breakpoints.length; i++) {
        var breakpoint = breakpoints[i];

        if (breakpoint.matches === true) {
          if (readySolutionsSwiper !== undefined) readySolutionsSwiper.destroy(true, true);
          return;
        } else if (breakpoint.matches === false) {
          return enableSwiper();
        }
      }
    };

    var enableSwiper = function enableSwiper() {
      readySolutionsSwiper = new Swiper('.ready-solutions-grid', {
        loop: false,
        slideClass: 'ready-solutions-grid-item',
        spaceBetween: 70,
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          prevEl: '.ready-solutions-grid-button-prev',
          nextEl: '.ready-solutions-grid-button-next'
        },
        breakpoints: {
          1579: {
            spaceBetween: 40,
            slidesPerView: 2,
            slidesPerColumn: 1
          },
          991: {
            slidesPerView: 1,
            slidesPerColumn: 1
          }
        }
      });
    };

    for (var i = 0; i < breakpoints.length; i++) {
      var breakpoint = breakpoints[i];
      breakpoint.addListener(breakpointChecker);
    }

    breakpointChecker();
  })();

  var gallerySwiper = new Swiper('.gallery-grid', {
    breakpoints: {
      575: {
        loop: false,
        slideClass: 'gallery-grid-item',
        spaceBetween: 0,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          prevEl: '.ready-solutions-grid-button-prev',
          nextEl: '.ready-solutions-grid-button-next'
        }
      }
    }
  }); // swipers end
  //diamond block scripts

  var buttonLeft = $('.diamond-button-left');
  var buttonRight = $('.diamond-button-right');
  var diamond = $('.diamond-achievements');
  var leftBlocks = $('.diamond-blocks-item-left');
  var rightBlocks = $('.diamond-blocks-item-right');
  var nameLeft = $('.diamond-blocks-name-left');
  var nameRight = $('.diamond-blocks-name-right');

  var toggleStateLeft = function toggleStateLeft() {
    if (buttonLeft.is(':visible')) {
      buttonLeft.toggleClass('diamond-button-hide');
      diamond.toggleClass('diamond-achievements-move-right');
      buttonRight.toggleClass('diamond-button-hide-text');
      nameLeft.toggleClass('diamond-blocks-name-left-show');
      leftBlocks.toggleClass('diamond-blocks-item-left-show');
    }

    buttonRight.removeClass('diamond-button-hide');
    diamond.removeClass('diamond-achievements-move-left');
    buttonLeft.removeClass('diamond-button-hide-text');
    nameRight.removeClass('diamond-blocks-name-right-show');
    rightBlocks.removeClass('diamond-blocks-item-right-show');
  };

  var toggleStateRight = function toggleStateRight() {
    if (buttonRight.is(':visible')) {
      buttonRight.toggleClass('diamond-button-hide');
      diamond.toggleClass('diamond-achievements-move-left');
      buttonLeft.toggleClass('diamond-button-hide-text');
      nameRight.toggleClass('diamond-blocks-name-right-show');
      rightBlocks.toggleClass('diamond-blocks-item-right-show');
    }

    buttonLeft.removeClass('diamond-button-hide');
    diamond.removeClass('diamond-achievements-move-right');
    buttonRight.removeClass('diamond-button-hide-text');
    nameLeft.removeClass('diamond-blocks-name-left-show');
    leftBlocks.removeClass('diamond-blocks-item-left-show');
  };

  leftBlocks.on('mouseleave', function (event) {
    var firstBlockOffsetLeft = leftBlocks[0].getBoundingClientRect().left + leftBlocks[0].clientWidth;
    var firstBlockOffsetTop = leftBlocks[0].getBoundingClientRect().top;
    var firstBlockOffsetBottom = leftBlocks[0].getBoundingClientRect().bottom;

    if (+event.clientX > +firstBlockOffsetLeft || +firstBlockOffsetTop > +event.clientY || +firstBlockOffsetBottom < +event.clientY) {
      toggleStateLeft();
    }
  });
  rightBlocks.on('mouseleave', function (event) {
    var firstBlockOffsetLeft = rightBlocks[0].getBoundingClientRect().left;
    var firstBlockOffsetTop = rightBlocks[0].getBoundingClientRect().top;
    var firstBlockOffsetBottom = rightBlocks[0].getBoundingClientRect().bottom;

    if (+event.clientX < +firstBlockOffsetLeft || +firstBlockOffsetTop > +event.clientY || +firstBlockOffsetBottom < +event.clientY) {
      toggleStateRight();
    }
  });
  buttonLeft.on('mouseenter click', function (e) {
    e.preventDefault();
    toggleStateLeft();
  });
  buttonRight.on('mouseenter click', function (e) {
    e.preventDefault();
    toggleStateRight();
  });

  (function () {
    var breakpoint = window.matchMedia('(max-width: 1199px)');
    var diamondSwiperGlobal;

    var breakpointChecker = function breakpointChecker() {
      if (breakpoint.matches) {
        $('.diamond-content').addClass('swiper-wrapper'); //хз

        toggleStateLeft();
        toggleStateRight(); //хз

        return diamondSwiperGlobalInit();
      } else {
        $('.diamond-content').removeClass('swiper-wrapper');
        if (diamondSwiperGlobal !== undefined) diamondSwiperGlobal.destroy(true, true);
        return;
      }
    };

    var diamondSwiperGlobalInit = function diamondSwiperGlobalInit() {
      diamondSwiperGlobal = new Swiper('.diamond-content-wrapper', {
        loop: false,
        slideClass: 'diamond-blocks-item',
        observer: true,
        observeParents: true,
        navigation: {
          prevEl: '.diamond-content-wrapper-button-prev',
          nextEl: '.diamond-content-wrapper-button-next',
          disabledClass: 'd-none'
        },
        breakpoints: {
          767: {
            navigation: {
              prevEl: null,
              nextEl: null
            }
          }
        },
        on: {
          transitionEnd: function transitionEnd() {
            var headingLeft = document.querySelector('.diamond-headings-item-left');
            var headingRight = document.querySelector('.diamond-headings-item-right');

            if (leftBlocks[0].classList.contains('swiper-slide-prev')) {
              headingLeft.classList.add('d-none');
              headingRight.classList.remove('d-none');
            } else if (leftBlocks[0].classList.contains('swiper-slide-active')) {
              headingLeft.classList.remove('d-none');
              headingRight.classList.add('d-none');
            }
          }
        }
      });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })(); //diamond block scripts end
  //feedback scrpts start


  var included = $('.feedback-item-options-prev');
  included.on('click', function () {
    if ($(window).width() < '768') {
      var spans = $(this).parent().find('span:nth-child(n + 2)');
      spans.toggleClass('d-block');
    }
  }); //feedback scrpts end
  //wow.js start

  var wow = new WOW({
    offset: 200,
    mobile: false
  });
  wow.init(); //wow.js end
  //parallax(rellax.js) start

  var rellaxElements = $('.rellax');
  setTimeout(function () {
    var rellax = rellaxElements.length ? new Rellax('.rellax') : 0;
  }, 400); //parallax(rellax.js) end
  //animations start

  var service = $('.top-line-service-item:first-of-type');
  var credit = $('.top-line-service-item:last-of-type');
  var stateChecker = 1;

  var toggleServiceStateAnimation = function toggleServiceStateAnimation() {
    if (window.pageYOffset <= 50 && document.documentElement.clientWidth >= 768) {
      if (stateChecker % 2 == 0) {
        $.when(service.fadeOut(450)).done(function () {
          credit.fadeIn(450);
          stateChecker = 1;
        });
      } else {
        $.when(credit.fadeOut(450)).done(function () {
          service.fadeIn(450);
          stateChecker = 2;
        });
      }
    }
  };

  var animationInterval = setInterval(toggleServiceStateAnimation, 3000); //animations end

  var redLine = $('.steps-progress-bar-line-red');

  var startStepsAnimation = function startStepsAnimation() {
    if ($(window).width() >= '768') {
      var dots = $('.steps-progress-bar-dot-border');
      var stepsCounts = $('.steps-counter > div');
      var stepsTexts = $('.steps-text > span');
      var stepsDescriptions = $('.steps-description > span');
      dots.toggleClass('grow-up');
      stepsCounts.toggleClass('fadeInLeft-custom');
      stepsCounts.removeClass('steps-opacity');
      stepsTexts.toggleClass('fadeInLeft-custom');
      stepsTexts.removeClass('steps-opacity');
      stepsDescriptions.toggleClass('fadeInRight-custom');
      stepsDescriptions.removeClass('steps-opacity');
    }
  };

  redLine.on('animationstart', startStepsAnimation);
  redLine.on('webkitAnimationStart', startStepsAnimation);
  $(window).on('scroll', function () {
    var directorVideo = document.querySelector('#main-personal-warranty-video');

    if (directorVideo !== undefined && directorVideo !== null) {
      if (directorVideo.getBoundingClientRect().bottom <= document.documentElement.clientHeight && directorVideo.getBoundingClientRect().bottom >= document.documentElement.clientHeight / 2 && !directorVideo.classList.contains('played')) {
        directorVideo.play();
        directorVideo.volume = 0.5;
        directorVideo.classList.add('played');
      } else if (directorVideo.getBoundingClientRect().bottom < 0 || directorVideo.getBoundingClientRect().top > document.documentElement.clientHeight) {
        directorVideo.pause();
      }
    }
  });

  var getCatalogInfo = function getCatalogInfo() {
    var activeImage = this.el.querySelector('.catalog-swiper-slide.swiper-slide-active > a > img');
    var catalogSlideDescription = this.el.querySelector('.catalog-swiper-slide-description .catalog-swiper-slide-description-description'); // console.log(catalogSlideDescription)

    catalogSlideDescription.removeChild(catalogSlideDescription.childNodes[0]); // catalogSlideDescription.innerHTML('');

    var text = document.createTextNode(activeImage.getAttribute('alt'));
    catalogSlideDescription.appendChild(text);
  };

  var catalogCategories = $('.catalog-categories > li > a');
  catalogCategories.on('click', function (e) {
    e.preventDefault();
    catalogCategories.each(function () {
      $(this).removeClass('active');
    });
    $(this).addClass('active');
    catalogCategories.each(function (index) {
      if ($(this).hasClass('active')) {
        var catalogSwipers = $('.catalog-swiper').parent();
        catalogSwipers.each(function () {
          $(this).fadeOut();
        });

        var showCatalogSwiper = function showCatalogSwiper(index) {
          catalogSwipers.eq(index).fadeIn();
        };

        setTimeout(showCatalogSwiper, 400, index);
      }
    });
  });

  var showFirstCatalogSwiper = function showFirstCatalogSwiper() {
    var catalogSwipers = $('.catalog-swiper').parent();
    catalogSwipers.each(function (index) {
      if (index != 0) {
        $(this).css('display', 'none');
      }
    });
  };

  showFirstCatalogSwiper();
  var likeButton = $('.feedback-button-like');
  likeButton.on('click', function (e) {
    e.preventDefault();

    if (!this.classList.contains('liked')) {
      var number = +this.querySelector('span').innerText + 1;
      this.querySelector('span').removeChild(this.querySelector('span').childNodes[0]);
      var text = document.createTextNode(number);
      this.querySelector('span').appendChild(text);
      this.classList.add('liked');
    } else {
      var _number = +this.querySelector('span').innerText - 1;

      this.querySelector('span').removeChild(this.querySelector('span').childNodes[0]);

      var _text = document.createTextNode(_number);

      this.querySelector('span').appendChild(_text);
      this.classList.remove('liked');
    }
  });
  var hideTabs;

  window.onresize = function () {
    if (hideTabs) clearTimeout(hideTabs);
    hideTabs = setTimeout(function () {
      if ($(document).width() < 768) {
        $('#tab-1').click();
      }
    }, 50);
  };
});