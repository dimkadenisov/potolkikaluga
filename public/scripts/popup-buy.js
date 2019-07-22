"use strict";

//popup-buy scripts start
var popupBuyCardsSwiper = new Swiper('.popup-buy-cards', {
  loop: false,
  slideClass: 'popup-buy-cards-item',
  slidesPerView: 3,
  spaceBetween: 24,
  grabCursor: false,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  simulateTouch: false,
  centeredSlides: true,
  navigation: {
    nextEl: '.popup-buy-cards-button-next',
    prevEl: '.popup-buy-cards-button-prev'
  },
  keyboard: {
    enabled: true
  },
  breakpoints: {
    // 1575: {
    //   slidesPerView: 3,
    // },
    // 1199: {
    //   slidesPerView: 3,
    // },
    991: {
      slidesPerView: 2
    },
    767: {
      slidesPerView: 1
    }
  }
});
$('[data-fancybox="popup-buy"]').click(function (e) {
  e.preventDefault();

  if ($('.popup-buy-step.d-block').attr('data-index') === '7') {
    changeGradientPositionLeft();
    goPrevPopupBuyStep();
  }

  $.fancybox.open({
    src: '#popup-buy',
    slideClass: 'popup-buy-slide',
    touch: false,
    smallBtn: false,
    buttons: []
  });
});
$('[data-fancybox="popup-buy-courier"]').click(function (e) {
  e.preventDefault();
  $.fancybox.open({
    src: '#popup-buy-courier',
    slideClass: 'popup-buy-slide',
    touch: false,
    smallBtn: false,
    buttons: []
  });
  $('#popup-buy-courier .popup-buy-step').addClass('d-block');
});
$('[data-fancybox="popup-buy-office"]').click(function (e) {
  e.preventDefault();
  $.fancybox.open({
    src: '#popup-buy-office',
    slideClass: 'popup-buy-slide',
    touch: false,
    smallBtn: false,
    buttons: []
  });
  $('#popup-buy-office .popup-buy-step').addClass('d-block');
});

var changeGradientPositionRight = function changeGradientPositionRight() {
  var gradient = $('.popup-buy-progress-gradient');
  var gradientValue = gradient.css('background-position');
  var trolley = $('.popup-buy-progress-trolley');
  var trolleyLeft = trolley.attr('style') ? trolley.attr('style') : trolley.css('left');
  gradientValue = +gradientValue.match(/\d+/);
  trolleyLeft = +trolleyLeft.match(/\d+/);
  gradientValue += 16;
  gradient.css('background-position', "-".concat(gradientValue, "%"));
  trolleyLeft += 16;
  trolley.css('left', "".concat(trolleyLeft, "%"));
};

var changeGradientPositionLeft = function changeGradientPositionLeft() {
  var gradient = $('.popup-buy-progress-gradient');
  var gradientValue = gradient.css('background-position');
  var trolley = $('.popup-buy-progress-trolley');
  var trolleyLeft = trolley.attr('style') ? trolley.attr('style') : trolley.css('left');
  gradientValue = +gradientValue.match(/\d+/);
  trolleyLeft = +trolleyLeft.match(/\d+/);
  gradientValue -= 16;
  gradient.css('background-position', "-".concat(gradientValue, "%"));
  trolleyLeft -= 16;
  trolley.css('left', "".concat(trolleyLeft, "%"));
};

var goNextPopupBuyStep = function goNextPopupBuyStep() {
  var popupBuyStep = document.querySelectorAll('.popup-buy-step');

  var currentIndex = function () {
    for (var i = 0; i < popupBuyStep.length; i++) {
      if (popupBuyStep[i].classList.contains('d-block')) {
        return i;
      }
    }
  }();

  var nextIndex = currentIndex + 1;

  for (var i = 0; i < popupBuyStep.length; i++) {
    popupBuyStep[i].classList.remove('d-block');
  }

  ;
  popupBuyStep[nextIndex].classList.add('d-block');
  return currentIndex - 2;
};

var goPrevPopupBuyStep = function goPrevPopupBuyStep() {
  var popupBuyStep = document.querySelectorAll('.popup-buy-step');

  var currentIndex = function () {
    for (var i = 0; i < popupBuyStep.length; i++) {
      if (popupBuyStep[i].classList.contains('d-block')) {
        return i;
      }
    }
  }();

  var prevIndex = currentIndex - 1;

  for (var i = 0; i < popupBuyStep.length; i++) {
    popupBuyStep[i].classList.remove('d-block');
  }

  ;
  popupBuyStep[prevIndex].classList.add('d-block');
  return prevIndex - 3;
};

var popupBuyHeadStepTexts = ['Шаг 1', 'Шаг 2', 'Шаг 2', 'Шаг 3', 'Шаг 4', 'Шаг 4'];
var popupBuyHeadDescriptionBig = ['Укажите', 'Укажите освещение', 'Укажите освещение', 'Выбор даты и времени', 'Оформление', 'Оплата заказа'];
var popupBuyHeadDescriptionSmall = ['параметры вашего потолка', 'и встроенные элементы', 'и встроенные элементы', 'монтажа', 'заказа и оплата', '№12345'];

var changePopupBuyHead = function changePopupBuyHead(currentIndex) {
  $('.popup-buy-head-step').text(popupBuyHeadStepTexts[currentIndex]);
  $('.popup-buy-head-description-big').text(popupBuyHeadDescriptionBig[currentIndex]);
  $('.popup-buy-head-description-small').text(popupBuyHeadDescriptionSmall[currentIndex]);
};

var generateCards = function generateCards() {
  var cardsContainer = $('.popup-buy-cards > .swiper-wrapper');
  var cardsAmount = +$('.popup-buy-field-input input').val();
  var pseudoCard = cardsContainer.find('.popup-buy-cards-item-add');

  for (var i = 1; i <= cardsAmount; i++) {
    pseudoCard.before("<fieldset class=\"popup-buy-cards-item popup-buy-cards-item-card\">\n    <div class=\"popup-buy-cards-item-background\" style=\"background-image: url(assets/img/popup-buy-card-bg.png)\"></div>\n    <div class=\"popup-buy-cards-item-number\">".concat(i, "</div><button class=\"popup-buy-cards-item-remove\" type=\"button\"></button>\n    <div class=\"popup-buy-cards-item-body\">\n    <label for=\"length-").concat(i, "\">\n      \u0414\u043B\u0438\u043D\u0430, \u0441\u043C\n      <span>\u043E\u0442 50\u0441\u043C \u0434\u043E 990\u0441\u043C</span>\n    </label>\n        <a class=\"popup-buy-cards-item-calc\" href=\"#\" disabled>-</a><input id =\"length-").concat(i, "\" type=\"number\" value=\"300\" min=\"50\" max=\"990\" data-step=\"5\" disabled><a class=\"popup-buy-cards-item-calc\" href=\"#\" data-increment=\"data-increment\" disabled>+</a>\n        <label for=\"width-").concat(i, "\">\n          \u0428\u0438\u0440\u0438\u043D\u0430, \u0441\u043C\n          <span>\u043E\u0442 50\u0441\u043C \u0434\u043E 550\u0441\u043C</span>\n        </label>\n        <a class=\"popup-buy-cards-item-calc\" href=\"#\" disabled>-</a><input id=\"width-").concat(i, "\" type=\"number\" value=\"300\" min=\"50\" max=\"550\" data-step=\"5\" disabled><a class=\"popup-buy-cards-item-calc\" href=\"#\" data-increment=\"data-increment\" disabled>+</a>\n        <label for=\"room-type-").concat(i, "\" data-line-height=\"data-line-height\">\u0422\u0438\u043F \u043F\u043E\u043C\u0435\u0449\u0435\u043D\u0438\u044F</label>\n        <div class=\"popup-buy-cards-item-select-wrapper\">\n          <select id=\"room-type-").concat(i, "\" disabled>\n            <option selected=\"selected\" disabled=\"disabled\">\u0412\u044B\u0431\u0440\u0430\u0442\u044C</option>\n            <option value=\"\u0416\u0438\u043B\u0430\u044F \u043A\u043E\u043C\u043D\u0430\u0442\u0430\">\u0416\u0438\u043B\u0430\u044F \u043A\u043E\u043C\u043D\u0430\u0442\u0430</option>\n            <option value=\"\u0413\u043E\u0441\u0442\u0438\u043D\u0430\u044F\">\u0413\u043E\u0441\u0442\u0438\u043D\u0430\u044F</option>\n            <option value=\"\u041A\u0443\u0445\u043D\u044F\">\u041A\u0443\u0445\u043D\u044F</option>\n            <option value=\"\u0412\u0430\u043D\u043D\u0430\u044F\">\u0412\u0430\u043D\u043D\u0430\u044F</option>\n            <option value=\"\u0422\u0443\u0430\u043B\u0435\u0442\">\u0422\u0443\u0430\u043B\u0435\u0442</option>\n            <option value=\"\u041A\u043E\u0440\u0438\u0434\u043E\u0440\">\u041A\u043E\u0440\u0438\u0434\u043E\u0440</option>\n            <option value=\"\u041B\u043E\u0434\u0436\u0438\u044F\">\u041B\u043E\u0434\u0436\u0438\u044F</option>\n            <option value=\"\u041A\u043B\u0430\u0434\u043E\u0432\u0430\u044F\">\u041A\u043B\u0430\u0434\u043E\u0432\u0430\u044F</option>\n            <option value=\"\u0413\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u043D\u0430\u044F\">\u0413\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u043D\u0430\u044F</option>\n            <option value=\"\u0414\u0440\u0443\u0433\u043E\u0435\">\u0414\u0440\u0443\u0433\u043E\u0435</option>\n          </select>\n        </div>\n        <label for=\"facture-").concat(i, "\">\u0424\u0430\u043A\u0442\u0443\u0440\u0430</label>\n        <div class=\"popup-buy-cards-item-select-wrapper\">\n          <select id=\"facture-").concat(i, "\" disabled>\n            <option selected=\"selected\" disabled=\"disabled\">\u0412\u044B\u0431\u0440\u0430\u0442\u044C</option>\n            <option value=\"mate\">\u041C\u0430\u0442\u043E\u0432\u0430\u044F</option>\n            <option value=\"glossy\">\u0413\u043B\u044F\u043D\u0446\u0435\u0432\u0430\u044F</option>\n            <option value=\"satin\">\u0421\u0430\u0442\u0438\u043D\u043E\u0432\u0430\u044F</option>\n          </select>\n        </div>\n        <p class=\"popup-buy-cards-item-notice\">\u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440\u044B \u043A\u043E\u043C\u043D\u0430\u0442\u044B\n            <a href=\"https://youtu.be/puXzhrGhCEo\" data-fancybox=\"how-to-do-1\">\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043E</a></p>\n        <div class=\"popup-buy-cards-item-images\">\n            <div class=\"popup-buy-cards-item-images-item\" style=\"background-image: url(assets/img/baseline-logo.png)\"></div>\n            <div class=\"popup-buy-cards-item-images-item\" style=\"background-image: url(assets/img/exploitation.png)\"></div>\n            <div class=\"popup-buy-cards-item-images-item\" style=\"background-image: url(assets/img/ghost.png)\"></div>\n            <div class=\"popup-buy-cards-item-images-item\" style=\"background-image: url(assets/img/white-color.png)\"></div>\n        </div><button class=\"popup-buy-cards-item-ready\" type=\"button\" disabled>\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button>\n      </div>\n    </fieldset>"));
  }

  ;
  activateCard($('.popup-buy-cards-item-card:first'));
  $('.popup-buy-cards-item:first').addClass('popup-buy-cards-item-colored');
  $('.popup-buy-cards-item-remove').on('click', function (event) {
    if ($('.popup-buy-cards-item-card').length == 1) {
      alert('Необходимо заполнить минимум одну карточку');
      return;
    }

    ;

    if ($(event.currentTarget).parent().find('.popup-buy-cards-item-number').text() == '1') {
      activateCard($(event.currentTarget).parent().next());
      $(event.currentTarget).parent().next().addClass('popup-buy-cards-item-colored');
    }

    ;
    var card = removeCard(event);
    changeCardsIndexes(card);
    addPseudoCard();
    var validCardsAmount = $('.popup-buy-cards-item-ready-valid').length;
    var totalCardsAmount = $('.popup-buy-cards-item-card').length;
    var isCurrentCardValid = $(event.currentTarget).parent().find('.popup-buy-cards-item-ready-valid').length;

    if (totalCardsAmount - validCardsAmount == 1 && !isCurrentCardValid) {
      calculateSum();
      $('.calculate-corners-amount').removeAttr('disabled');
    }

    ;

    if (card.prev().find('.popup-buy-cards-item-ready').hasClass('popup-buy-cards-item-ready-valid')) {
      card.next().addClass('popup-buy-cards-item-colored');
      activateCard(card.next());
    }

    ;
    setInterval(setViget, 350);
  });
  $('input[id^=length]').on('mouseover', hidePlaceholder);
  $('input[id^=width]').on('mouseover', hidePlaceholder);
  $('input[id^=length]').on('mouseleave', setPlaceholder);
  $('input[id^=width]').on('mouseleave', setPlaceholder);
  $('input[id^=length]').on('change', setReadyButtonState);
  $('input[id^=width]').on('change', setReadyButtonState);
  $('.popup-buy-cards-item-calc').on('click', function (event) {
    event.preventDefault();
    incrementDecrementValue(this);
    updateCardState(this);
    var input = $(this).prev().val() ? $(this).prev() : $(this).next();
    setReadyButtonState.call(input);
  });
  $('.popup-buy-cards-item-card select').on('click', function () {
    updateCardState(this);
  });
  $('.popup-buy-cards-item-card select').on('change', setReadyButtonState);
  $('.popup-buy-cards-item-ready').on('click', function () {
    if (checkCardDataValidity.apply(this)) {
      activateCard($(this).parent().parent().next());
      var inputs = $(this).closest('.popup-buy-cards-item-card').find('input[type="number"]');
      var selects = $(this).closest('.popup-buy-cards-item-card').find('select');
      inputs.each(function () {
        $(this).attr('disabled', 'disabled');
      });
      selects.each(function () {
        $(this).attr('disabled', 'disabled');
      });
    }
  });
  $('.calculate-corners-amount').attr('disabled', 'disabled');
  if (cardsAmount == 10) pseudoCard.remove();
};

var addCard = function addCard(event) {
  var pseudoCard = $(event.currentTarget);
  var i = +pseudoCard.prev().find('.popup-buy-cards-item-number').text();
  ++i;
  pseudoCard.before("<fieldset class=\"popup-buy-cards-item popup-buy-cards-item-card\">\n    <div class=\"popup-buy-cards-item-background\" style=\"background-image: url(assets/img/popup-buy-card-bg.png)\"></div>\n    <div class=\"popup-buy-cards-item-number\">".concat(i, "</div><button class=\"popup-buy-cards-item-remove\" type=\"button\"></button>\n    <div class=\"popup-buy-cards-item-body\">\n    <label for=\"length-").concat(i, "\">\n      \u0414\u043B\u0438\u043D\u0430, \u0441\u043C\n      <span>\u043E\u0442 50\u0441\u043C \u0434\u043E 990\u0441\u043C</span>\n    </label>\n        <a class=\"popup-buy-cards-item-calc\" href=\"#\" disabled>-</a><input id =\"length-").concat(i, "\" type=\"number\" value=\"300\" min=\"50\" max=\"990\" data-step=\"5\" disabled><a class=\"popup-buy-cards-item-calc\" href=\"#\" data-increment=\"data-increment\" disabled>+</a>\n        <label for=\"width-").concat(i, "\">\n          \u0428\u0438\u0440\u0438\u043D\u0430, \u0441\u043C\n          <span>\u043E\u0442 50\u0441\u043C \u0434\u043E 550\u0441\u043C</span>\n        </label>\n        <a class=\"popup-buy-cards-item-calc\" href=\"#\" disabled>-</a><input id=\"width-").concat(i, "\" type=\"number\" value=\"300\" min=\"50\" max=\"550\" data-step=\"5\" disabled><a class=\"popup-buy-cards-item-calc\" href=\"#\" data-increment=\"data-increment\" disabled>+</a>\n        <label for=\"room-type-").concat(i, "\" data-line-height=\"data-line-height\">\u0422\u0438\u043F \u043F\u043E\u043C\u0435\u0449\u0435\u043D\u0438\u044F</label>\n        <div class=\"popup-buy-cards-item-select-wrapper\">\n          <select id=\"room-type-").concat(i, "\" disabled>\n            <option selected=\"selected\" disabled=\"disabled\">\u0412\u044B\u0431\u0440\u0430\u0442\u044C</option>\n            <option value=\"\u0416\u0438\u043B\u0430\u044F \u043A\u043E\u043C\u043D\u0430\u0442\u0430\">\u0416\u0438\u043B\u0430\u044F \u043A\u043E\u043C\u043D\u0430\u0442\u0430</option>\n            <option value=\"\u0413\u043E\u0441\u0442\u0438\u043D\u0430\u044F\">\u0413\u043E\u0441\u0442\u0438\u043D\u0430\u044F</option>\n            <option value=\"\u041A\u0443\u0445\u043D\u044F\">\u041A\u0443\u0445\u043D\u044F</option>\n            <option value=\"\u0412\u0430\u043D\u043D\u0430\u044F\">\u0412\u0430\u043D\u043D\u0430\u044F</option>\n            <option value=\"\u0422\u0443\u0430\u043B\u0435\u0442\">\u0422\u0443\u0430\u043B\u0435\u0442</option>\n            <option value=\"\u041A\u043E\u0440\u0438\u0434\u043E\u0440\">\u041A\u043E\u0440\u0438\u0434\u043E\u0440</option>\n            <option value=\"\u041B\u043E\u0434\u0436\u0438\u044F\">\u041B\u043E\u0434\u0436\u0438\u044F</option>\n            <option value=\"\u041A\u043B\u0430\u0434\u043E\u0432\u0430\u044F\">\u041A\u043B\u0430\u0434\u043E\u0432\u0430\u044F</option>\n            <option value=\"\u0413\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u043D\u0430\u044F\">\u0413\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u043D\u0430\u044F</option>\n            <option value=\"\u0414\u0440\u0443\u0433\u043E\u0435\">\u0414\u0440\u0443\u0433\u043E\u0435</option>\n          </select>\n        </div>\n        <label for=\"facture-").concat(i, "\">\u0424\u0430\u043A\u0442\u0443\u0440\u0430</label>\n        <div class=\"popup-buy-cards-item-select-wrapper\">\n          <select id=\"facture-").concat(i, "\" disabled>\n            <option selected=\"selected\" disabled=\"disabled\">\u0412\u044B\u0431\u0440\u0430\u0442\u044C</option>\n            <option value=\"mate\">\u041C\u0430\u0442\u043E\u0432\u0430\u044F</option>\n            <option value=\"glossy\">\u0413\u043B\u044F\u043D\u0446\u0435\u0432\u0430\u044F</option>\n            <option value=\"satin\">\u0421\u0430\u0442\u0438\u043D\u043E\u0432\u0430\u044F</option>\n          </select>\n        </div>\n        <p class=\"popup-buy-cards-item-notice\">\u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440\u044B \u043A\u043E\u043C\u043D\u0430\u0442\u044B\n            <a href=\"https://youtu.be/puXzhrGhCEo\" data-fancybox=\"how-to-do-1\">\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043E</a></p>\n        <div class=\"popup-buy-cards-item-images\">\n            <div class=\"popup-buy-cards-item-images-item\" style=\"background-image: url(assets/img/baseline-logo.png)\"></div>\n            <div class=\"popup-buy-cards-item-images-item\" style=\"background-image: url(assets/img/exploitation.png)\"></div>\n            <div class=\"popup-buy-cards-item-images-item\" style=\"background-image: url(assets/img/ghost.png)\"></div>\n            <div class=\"popup-buy-cards-item-images-item\" style=\"background-image: url(assets/img/white-color.png)\"></div>\n        </div><button class=\"popup-buy-cards-item-ready\" type=\"button\" disabled>\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button>\n      </div>\n    </fieldset>"));
  $('.popup-buy-cards-item-remove:last').on('click', function (event) {
    if ($('.popup-buy-cards-item-card').length == 1) {
      alert('Необходимо заполнить минимум одну карточку');
      return;
    }

    ;

    if ($(event.currentTarget).parent().find('.popup-buy-cards-item-number').text() == '1') {
      activateCard($(event.currentTarget).parent().next());
      $(event.currentTarget).parent().next().addClass('popup-buy-cards-item-colored');
    }

    ;
    var card = removeCard(event);
    changeCardsIndexes(card);
    addPseudoCard();
    var validCardsAmount = $('.popup-buy-cards-item-ready-valid').length;
    var totalCardsAmount = $('.popup-buy-cards-item-card').length;
    var isCurrentCardValid = $(event.currentTarget).parent().find('.popup-buy-cards-item-ready-valid').length;

    if (totalCardsAmount - validCardsAmount == 1 && !isCurrentCardValid) {
      calculateSum();
      $('.calculate-corners-amount').removeAttr('disabled');
    }

    ;

    if (card.prev().find('.popup-buy-cards-item-ready').hasClass('popup-buy-cards-item-ready-valid')) {
      card.next().addClass('popup-buy-cards-item-colored');
      activateCard(card.next());
    }

    ;
    setInterval(setViget, 350);
  });
  $('input[id^=length]:last').on('mouseover', hidePlaceholder);
  $('input[id^=width]:last').on('mouseover', hidePlaceholder);
  $('input[id^=length]:last').on('mouseleave', setPlaceholder);
  $('input[id^=width]:last').on('mouseleave', setPlaceholder);
  var lastCard = $('.popup-buy-cards-item-card:last');
  var calcButtons = lastCard.find('.popup-buy-cards-item-calc');
  var cardInputs = lastCard.find('input[type="number"]');
  var cardSelects = lastCard.find('select');
  calcButtons.on('click', function (event) {
    event.preventDefault();
    incrementDecrementValue(this);
    updateCardState(this);
  });
  cardInputs.on('change', setReadyButtonState);
  cardSelects.on('change', setReadyButtonState);
  $('.popup-buy-cards-item-card:last select').on('click', function () {
    updateCardState(this);
  });
  $('.popup-buy-cards-item-ready:last').on('click', function () {
    if (checkCardDataValidity.apply(this)) {
      activateCard($(this).parent().parent().next());
      var inputs = $(this).closest('.popup-buy-cards-item-card').find('input[type="number"]');
      var selects = $(this).closest('.popup-buy-cards-item-card').find('select');
      inputs.each(function () {
        $(this).attr('disabled', 'disabled');
      });
      selects.each(function () {
        $(this).attr('disabled', 'disabled');
      });
    }
  });
  $('.calculate-corners-amount').attr('disabled', 'disabled');
  if (i == 10) pseudoCard.remove();
};

var checkInput = function checkInput() {
  var input = $('.popup-buy-field-input input');
  var inputValue = +input.val();
  var maxValue = +$('.popup-buy-field-input input').attr('max');
  var minValue = +$('.popup-buy-field-input input').attr('min');

  if (inputValue > maxValue) {
    alert("\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E = ".concat(maxValue));
    input.val(maxValue);
    return false;
  }

  ;

  if (inputValue < minValue) {
    alert("\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E = ".concat(minValue));
    input.val(minValue);
    return false;
  }

  ;

  if (!inputValue) {
    alert('Для ввода допустимы только целые числа');
    input.val(maxValue);
    return false;
  }

  ;
  return true;
};

var addPseudoCard = function addPseudoCard() {
  if ($('.popup-buy-cards-item-add').length == 0) {
    var cardsContainer = $('.popup-buy-cards > .swiper-wrapper');
    cardsContainer.append('<div class="popup-buy-cards-item popup-buy-cards-item-add"></div>');
    $('.popup-buy-cards-item-add').on('click', function (event) {
      if ($(event.currentTarget).prev().find('.popup-buy-cards-item-ready').hasClass('popup-buy-cards-item-ready-valid')) {
        addCard(event);
        $(event.currentTarget).prev().addClass('popup-buy-cards-item-colored');
        activateCard($(event.currentTarget).prev());
      } else {
        addCard(event);
      } // setInterval(setViget, 350);


      setViget();
    });
  }

  ;
};

var removeCard = function removeCard(event) {
  var card = $(event.currentTarget).parent();
  card.fadeOut(300);
  setTimeout(function () {
    card.remove();
  }.bind(card), 310);
  setTimeout(function () {
    calculateSum();
  }, 320);

  if ($('.popup-buy-cards-item-ready').length == 1) {
    $('.calculate-corners-amount').attr('disabled', 'disabled');
  }

  return card;
};

var changeCardsIndexes = function changeCardsIndexes(card) {
  var startIndex = $(card).find('.popup-buy-cards-item-number').text();
  var cards = $('.popup-buy-cards-item-card');

  for (var i = +startIndex; i < cards.length; i++) {
    var _card = cards[i];
    var cardNumber = $(_card).find('.popup-buy-cards-item-number');
    var lengthLabel = $(_card).find('label[for^=length]');
    var lengthInput = $(_card).find('input[id^=length]');
    var widthLabel = $(_card).find('label[for^=width]');
    var widthInput = $(_card).find('input[id^=width]');
    var roomTypeLabel = $(_card).find('label[for^=room-type]');
    var roomTypeSelect = $(_card).find('select[id^=room-type]');
    var factureLabel = $(_card).find('label[for^=facture]');
    var factureSelect = $(_card).find('select[id^=facture]');
    cardNumber.text(i);
    lengthLabel.attr('for', "length-".concat(i));
    lengthInput.attr('id', "length-".concat(i));
    widthLabel.attr('for', "width-".concat(i));
    widthInput.attr('id', "width-".concat(i));
    roomTypeLabel.attr('for', "room-type-".concat(i));
    roomTypeSelect.attr('id', "room-type-".concat(i));
    factureLabel.attr('for', "facture-".concat(i));
    factureSelect.attr('id', "facture-".concat(i));
  }

  ;
};

var calculateCornersAmount = function calculateCornersAmount() {
  var cardsLength = $('.popup-buy-cards-item-card').length;
  $('#corners-amount').val(4 * cardsLength);
  $('#corners-amount').attr('min', 4 * cardsLength);
  $('#corners-amount').parent().find('.popup-buy-additions-item-block-calc-output').text(0);
};

var hidePlaceholder = function hidePlaceholder() {
  if (!$(this).attr('disabled')) {
    $(this).attr('value', '');
  }
};

var setPlaceholder = function setPlaceholder() {
  if (this.value === '') $(this).attr('value', '300');
};

var incrementDecrementValue = function incrementDecrementValue(context) {
  if ($(context).attr('disabled')) return;
  var el = $(context);

  if (el.attr('data-increment')) {
    var value = +el.prev().val();
    var maxValue = +el.prev().attr('max');
    var step = el.prev().attr('data-step') ? +el.prev().attr('data-step') : 1;

    if (value >= maxValue) {
      el.prev().val(maxValue);
    } else {
      el.prev().val(+value + step);
    }
  } else {
    var _value = +el.next().val();

    var minValue = +el.next().attr('min');

    var _step = el.next().attr('data-step') ? +el.next().attr('data-step') : 1;

    if (_value <= minValue) {
      el.next().val(minValue);
    } else {
      el.next().val(+_value - _step);
    }
  }

  ;
};

var checkCardDataValidity = function checkCardDataValidity() {
  if (!$(this).parent().find('input[type="number"]')[0].validity.valid) {
    alert('Длина должна располагаться в диапазоне от 50см до 990см');
    return false;
  } else if (!$(this).parent().find('input[type="number"]')[1].validity.valid) {
    alert('Ширина должна располагаться в диапазоне от 50см до 550см');
    return false;
  } else if ($(this).parent().find('select')[0].selectedIndex == 0) {
    alert('Выберите тип помещения');
    return false;
  } else if ($(this).parent().find('select')[1].selectedIndex == 0) {
    alert('Выберите фактуру');
    return false;
  } else {
    $(this).closest('.popup-buy-cards-item-card').addClass('popup-buy-cards-item-colored');
    $(this).text('Готово');
    $(this).addClass('popup-buy-cards-item-ready-valid');

    if ($(this).parent().parent().hasClass('swiper-slide-active')) {
      popupBuyCardsSwiper.slideNext();
    }

    ;
    $(this).closest('.popup-buy-cards-item-card').next().addClass('popup-buy-cards-item-colored');
    var validity = 0;
    var readyButtons = $('.popup-buy-cards-item-ready');

    for (var i = 0; i < readyButtons.length; i++) {
      if (readyButtons[i].classList.contains('popup-buy-cards-item-ready-valid')) {
        validity++;
      }

      ;
    }

    ;
    $(this).closest('.popup-buy-cards-item-card').addClass('popup-buy-cards-item-card-valid');
    calculateSum();

    if (validity == readyButtons.length && readyButtons.length > 0) {
      $('.calculate-corners-amount').removeAttr('disabled');
    }

    ;
    return true;
  }

  ;
};

var setReadyButtonState = function setReadyButtonState() {
  var inputs = $(this).parent().find('input[type="number"]');
  var inputsValidity = 0;
  var selects = $(this).parent().find('select');
  var selectsValidity = 0;
  inputs.each(function () {
    inputsValidity += this.validity.valid ? 1 : 0;
  });
  selects.each(function () {
    selectsValidity += this.selectedIndex > 0 ? 1 : 0;
  });

  if (inputsValidity === inputs.length && selectsValidity === selects.length) {
    $(this).parent().find('.popup-buy-cards-item-ready').addClass('popup-buy-cards-item-ready-magenta');
  } else {
    $(this).parent().find('.popup-buy-cards-item-ready').removeClass('popup-buy-cards-item-ready-magenta');
  }
};

var calculateSum = function calculateSum() {
  var lengthInputs = $('.popup-buy-cards-item-card-valid input[id^="length"]');
  var widthInputs = $('.popup-buy-cards-item-card-valid input[id^="width"]');
  var lengths = [];
  var widths = [];
  var areas = [];
  var perimetrs = [];
  var prices = [];
  var sumAmount = 0;
  var sumOutput = $('.popup-buy-step.d-block .popup-buy-sum b');

  for (var i = 0; i < lengthInputs.length; i++) {
    lengths.push(lengthInputs[i].value);
  }

  ;

  for (var _i = 0; _i < widthInputs.length; _i++) {
    widths.push(widthInputs[_i].value);
  }

  ;

  for (var _i2 = 0; _i2 < widths.length; _i2++) {
    areas.push(+widths[_i2] * +lengths[_i2] * 400 / 10000);
    perimetrs.push((+widths[_i2] + +lengths[_i2]) * 6);
  }

  ;
  prices.push.apply(prices, areas);
  prices.push.apply(prices, perimetrs);

  for (var _i3 = 0; _i3 < prices.length; _i3++) {
    var price = prices[_i3];
    sumAmount += price;
  }

  ;
  sumOutput.text("".concat(sumAmount.toLocaleString(), " \u20BD"));
};

var calculateAdditions = function calculateAdditions(context) {
  var input = $(context).parent().find('input');
  var inputValue = input.val();
  var multiplierValue = $(context).parent().find('.popup-buy-additions-item-block-calc-multiplier').text();
  var outputSpan = $(context).parent().find('.popup-buy-additions-item-block-calc-output');

  if (input[0].id == 'corners-amount') {
    var cornersAmount = $('.popup-buy-cards-item-card').length * 4;
    outputSpan.text((+inputValue - +cornersAmount) * +multiplierValue);
  } else outputSpan.text(+inputValue * +multiplierValue);
};

var setSecondSumInitialValue = function setSecondSumInitialValue(context) {
  var initialValue = $(context).parent().find('.popup-buy-sum b').text();
  initialValue = parseInt(initialValue.replace(/\s/g, ''));
  var nextSumOutput = $(context).parent().next().find('.popup-buy-sum b');
  var additionsFields = $('.popup-buy-additions-item-block-calc-output');

  for (var i = 0; i < additionsFields.length; i++) {
    var value = +$(additionsFields[i]).text();
    initialValue += value;
  }

  ;
  nextSumOutput.text(initialValue.toLocaleString() + ' ₽');
  nextSumOutput.attr('data-initial-value', initialValue);
};

var setViget = function setViget() {
  var cardsAmount = $('.popup-buy-cards-item-card').length;

  if ($('.screen-1-popup-opener-circle').find('.screen-1-popup-opener-counter').length) {
    $('.screen-1-popup-opener-counter').text(cardsAmount);
  } else {
    $('.screen-1-popup-opener-circle').append("<span class=\"screen-1-popup-opener-counter\">".concat(cardsAmount, "</span>"));
  }
};

var updateNextSumValue = function updateNextSumValue(context) {
  var sumNode = $(context).closest('.popup-buy-step').find('.popup-buy-sum b');
  var initialValue = +sumNode.attr('data-initial-value');
  var addends = $(context).closest('.popup-buy-step').find('.popup-buy-additions-item-block-calc-output').length ? $(context).closest('.popup-buy-step').find('.popup-buy-additions-item-block-calc-output') : $(context).closest('.popup-buy-step').find('.popup-buy-additions-item-block-sum b');
  addends.each(function () {
    initialValue += parseInt($(this).text().replace(/\s/g));
  });
  sumNode.text(initialValue.toLocaleString() + ' ₽');
};

var additionInputTimeout;
$('.popup-buy-additions-item-block-calc input').on('input', function (e) {
  if (additionInputTimeout) clearTimeout(additionInputTimeout);
  additionInputTimeout = setTimeout(function (context) {
    if (!context.validity.valid) {
      if (+context.value > +context.max) context.value = context.max;else context.value = context.min;
    }

    calculateAdditions(context);
    updateNextSumValue(context);
  }, 1000, this);
});

var activateCard = function activateCard(card) {
  card.find('input').each(function () {
    $(this).removeAttr('disabled');
  });
  card.find('select').each(function () {
    $(this).removeAttr('disabled');
  });
  card.find('.popup-buy-cards-item-calc').each(function () {
    $(this).removeAttr('disabled');
  });
  card.find('.popup-buy-cards-item-ready').each(function () {
    $(this).removeAttr('disabled');
  });
};

var setThirdSumInitialValue = function setThirdSumInitialValue() {
  var prevSum = parseInt($(this).parent().find('.popup-buy-sum b').text().replace(/\s/g, ''));
  var additionsFields = $(this).parent().next().find('.popup-buy-additions-item-block-sum');
  var outputNode = $(this).parent().next().find('.popup-buy-sum b');
  additionsFields.each(function () {
    prevSum += parseInt($(this).text().replace(/\s/g, ''));
  });
  outputNode.text(prevSum.toLocaleString() + ' ₽');
  outputNode.attr('data-initial-value', prevSum);
};

var checkAdditionsInputValidity = function checkAdditionsInputValidity() {
  var inputs = $(this).parent().find('.popup-buy-additions-item-block-calc input');
  var invalidities = ['Неверно введено количество углов', 'Неверно введено количестов труб', 'Неверно введено количество люстр', 'Неверно введено количество точечных светильников', ' Неверно введено сколько люстр нужно снять'];
  var currentInvalidities = [];

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];

    if (!input.validity.valid) {
      currentInvalidities.push(invalidities[i]);
    }
  }

  ;

  if (currentInvalidities.length) {
    alert(currentInvalidities.join(';\n'));
    return false;
  } else return true;
};

var checkRoomTypes = function checkRoomTypes() {
  var roomTypesSelects = $('.popup-buy-cards-item-card select[id^=room-type-]');
  $('#kitchen').attr('disabled', 'disabled');
  $('#bathroom').attr('disabled', 'disabled');
  $('#wc').attr('disabled', 'disabled');
  kitchen.checked = false;
  bathroom.checked = false;
  wc.checked = false;
  roomTypesSelects.each(function () {
    switch (+this.selectedIndex) {
      case 3:
        $('#kitchen').removeAttr('disabled');
        break;

      case 4:
        $('#bathroom').removeAttr('disabled');
        break;

      case 5:
        $('#wc').removeAttr('disabled');
        break;
    }
  });
};

var setTilePrice = function setTilePrice() {
  var checkbox = $(this).find('input[type="checkbox"]');
  setTimeout(function () {
    var cards = $('.popup-buy-cards-item-card');
    var findSelectedIndex = 0;
    var workPrice = 0;

    if (checkbox.attr('id') == 'kitchen') {
      findSelectedIndex = 3;
    } else if (checkbox.attr('id') == 'bathroom') {
      findSelectedIndex = 4;
    } else if (checkbox.attr('id') == 'wc') {
      findSelectedIndex = 5;
    }

    cards.each(function () {
      var roomTypeSelect = $(this).find('select[id^="room-type-"]');

      if (roomTypeSelect[0].selectedIndex == findSelectedIndex) {
        var length = +$(this).find('input[id^="length-"]').val();
        var width = +$(this).find('input[id^="width-"]').val();
        workPrice += (length + width) / 2;
      }
    });
    var outputNode = checkbox.closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b');
    var outputNodeValue = parseInt(outputNode.text().replace(/\s/g));

    if (checkbox[0].checked) {
      outputNodeValue = outputNodeValue + workPrice;
    } else {
      if (outputNodeValue != 0) {
        outputNodeValue = outputNodeValue - workPrice;
      }
    }

    outputNode.text(outputNodeValue + ' ₽');
    updateNextSumValue(checkbox);
  }, 300);
};

var clearTileState = function clearTileState() {
  kitchen.checked = false;
  bathroom.checked = false;
  wc.checked = false;
  var tilePriceNode = $(this).closest('.popup-buy-step').find('#wc').closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b');
  var tilePriceNodeValue = parseInt(tilePriceNode.text().replace(/\s/g));
  var sumNode = $(this).closest('.popup-buy-step').find('.popup-buy-sum b');
  var sumNodeValue = parseInt(sumNode.text().replace(/\s/g));
  sumNode.text(sumNodeValue - tilePriceNodeValue + ' ₽');
  tilePriceNode.text('0 ₽');
};

var updateCardState = function updateCardState(context) {
  var validButton = $(context).parent().find('.popup-buy-cards-item-ready-valid');

  if (validButton.length) {
    validButton.removeClass('popup-buy-cards-item-ready-valid');
    $('.calculate-corners-amount').attr('disabled', 'disabled');
  }
};

var addCeilingHeight = function addCeilingHeight() {
  if (this.checked) {
    // let sumNode = $(this).closest('.popup-buy-step').find('.popup-buy-sum b');
    // let text = parseInt(sumNode.text().replace(/\s/g, ''));
    if (this.id == 'more-then-3' && !$(this).attr('data-added')) {
      $(this).attr('data-added', 'data-added');
      $(this).closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b').text('1000 ₽');
      $(this).attr('data-add', 'data-add'); // sumNode.text((text + 1000) + ' ₽');
    } else if (this.id == 'less-then-3') {
      $('#more-then-3').removeAttr('data-added');
      $(this).closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b').text('0 ₽'); // if($('#more-then-3').attr('data-add')) {
      //   sumNode.text((text - 1000) + ' ₽');
      //   $('#more-then-3').removeAttr('data-add');
      // }
    }
  }

  updateNextSumValue(this);
};

var addTousend = function addTousend() {
  if (this.checked) {
    if (!$(this).attr('data-add')) {
      $(this).closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b').text('1000 ₽'); // let sumNode = $(this).closest('.popup-buy-step').find('.popup-buy-sum b');
      // let text = parseInt(sumNode.text().replace(/\s/g, ''));
      // sumNode.text((text + 1000) + ' ₽');

      $(this).attr('data-add', 'data-add');
    }
  } else {
    if ($(this).attr('data-add')) {
      $(this).closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b').text('0 ₽'); // let sumNode = $(this).closest('.popup-buy-step').find('.popup-buy-sum b');
      // let text = parseInt(sumNode.text().replace(/\s/g, ''));
      // sumNode.text((text - 1000) + ' ₽');

      $(this).removeAttr('data-add');
    }
  }

  updateNextSumValue(this);
};

var calculateTotalAmountAndDiscount = function calculateTotalAmountAndDiscount() {
  var onlineDiscountCheckbox = document.querySelector('#give-online-discount');
  var totalValue = parseInt($(this).parent().find('.popup-buy-sum b').text().replace(/\s/g, ''));
  var totalValueToSetNode = $('#total-amount-without-discount');
  var onlineDiscountNode = $('#online-discount');
  var totalValueWithDiscountNode = $('#total-amount-with-discount');
  var prepaymentNode = $('#prepayment');
  var onlineDiscountValue = onlineDiscountCheckbox.checked ? Math.floor(totalValue / 10) : 0;
  var totalValueWithDiscountValue = Math.round(totalValue - onlineDiscountValue);
  var prepaymentValue = Math.round(totalValueWithDiscountValue / 4);
  totalValueToSetNode.text(totalValue + ' ₽');
  onlineDiscountNode.text(onlineDiscountValue + ' ₽');
  totalValueWithDiscountNode.text(totalValueWithDiscountValue + ' ₽');
  prepaymentNode.text(prepaymentValue + ' ₽');
};

var checkOnlineDisount = function checkOnlineDisount() {
  var totalValueNode = $('#total-amount-without-discount');
  var onlineDiscountNode = $('#online-discount');
  var totalValueWithDiscountNode = $('#total-amount-with-discount');
  var prepaymentNode = $('#prepayment');
  var totalValue = parseInt(totalValueNode.text().replace(/\s/g, ''));
  var onlineDiscountValue = this.checked ? Math.floor(totalValue / 10) : 0;
  var totalValueWithDiscountValue = Math.round(totalValue - onlineDiscountValue);
  var prepaymentValue = Math.round(totalValueWithDiscountValue / 4);
  onlineDiscountNode.text(onlineDiscountValue + ' ₽');
  totalValueWithDiscountNode.text(totalValueWithDiscountValue + ' ₽');
  prepaymentNode.text(prepaymentValue + ' ₽');
};

var checkPersonalData = function checkPersonalData() {
  var personalDataInputs = $('.popup-buy-contacts input');
  var message = [];
  var invalidMessages = ['адрес', 'телефон', 'ФИО', 'дату'];

  for (var i = 0; i < personalDataInputs.length; i++) {
    var element = personalDataInputs[i];

    if (!element.validity.valid || !element.value) {
      message.push(invalidMessages[i]);
    }
  }

  if (message.length) {
    alert('Введите ' + message.join(', ') + '.');
  } else {
    changeGradientPositionRight();
    changePopupBuyHead(goNextPopupBuyStep());
  }
};

var setDateAdress = function setDateAdress() {
  var date = $('#montage-date-input').val();
  var adress = $('#montage-adress-input').val();
  $('#montage-date-output').text(date);
  $('#montage-adress-output').text(adress);
  $('.popup-buy-inner-window-adress').val(adress);
  $('.popup-buy-inner-window-date').val(date);
};

var clearInput = function clearInput(input) {
  input.val('');
  input.focus();
};

var setPaymentOptions = function setPaymentOptions() {
  var value = $('#total-amount-with-discount').text();
  $('#total-sum').text(value);
  value = parseInt(value.replace(/\s/g));
  $('#total-prepayment').attr('min', Math.round(value / 4));
  $('#total-prepayment').attr('max', value);
  $('#total-prepayment').attr('value', Math.round(value / 4));
};

var totalPrepaymentTimeout;
$('#total-prepayment').on('input', function (e) {
  if (totalPrepaymentTimeout) clearTimeout(totalPrepaymentTimeout);
  totalPrepaymentTimeout = setTimeout(function (context) {
    if (!context.validity.valid) {
      if (+context.value > +context.max) context.value = context.max;else context.value = context.min;
    }
  }, 1000, this);
});
$('.popup-buy-field button').on('click', function () {
  if (checkInput()) {
    generateCards();
    setViget();
    changeGradientPositionRight();
    changePopupBuyHead(goNextPopupBuyStep());
  }
});
$('.popup-buy-button.popup-buy-button-left').on('click', function () {
  changeGradientPositionLeft();
  var prevIndex = goPrevPopupBuyStep();
  changePopupBuyHead(prevIndex);
});
$('.popup-buy-field a').on('click', function (event) {
  event.preventDefault();
  incrementDecrementValue(this);
});
$('.popup-buy-additions-item-block-calc button').on('click', function (event) {
  event.preventDefault();
  incrementDecrementValue(this);
  calculateAdditions(this);
  updateNextSumValue(this);
});
$('.popup-buy-cards-item-add').on('click', function (event) {
  if ($(event.currentTarget).prev().find('.popup-buy-cards-item-ready').hasClass('popup-buy-cards-item-ready-valid')) {
    addCard(event);
    $(event.currentTarget).prev().addClass('popup-buy-cards-item-colored');
    activateCard($(event.currentTarget).prev());
  } else {
    addCard(event);
  }

  setViget();
});
$('.calculate-corners-amount').on('click', function () {
  setViget();
  changeGradientPositionRight();
  changePopupBuyHead(goNextPopupBuyStep());
  calculateCornersAmount();
  setSecondSumInitialValue(this);
  checkRoomTypes();
});
$('.set-value').on('click', function () {
  if (checkAdditionsInputValidity.apply(this)) {
    changeGradientPositionRight();
    changePopupBuyHead(goNextPopupBuyStep());
    setThirdSumInitialValue.apply(this);
  }
});
$('input[name="ceiling height"]').on('click', addCeilingHeight);
$('.roomtype-checkbox-label').on('click', setTilePrice);
$('.clear-tile-state ').on('click', clearTileState);
$('input#conditioner').on('click', addTousend);
$('input#closet').on('click', addTousend);
$('.calculate-total-amount').on('click', function () {
  changeGradientPositionRight();
  changePopupBuyHead(goNextPopupBuyStep());
  calculateTotalAmountAndDiscount.apply(this);
});
$('.popup-buy-total-field-name input[type="checkbox"]').on('click', checkOnlineDisount);
$('.check-personal-data').on('click', function () {
  checkPersonalData();
  setDateAdress();
});
$('.go-to-payment').on('click', function () {
  setPaymentOptions();
  changeGradientPositionRight();
  changePopupBuyHead(goNextPopupBuyStep());
});
$('.popup-buy-go-back').on('click', function () {
  changeGradientPositionLeft();
  var prevIndex = goPrevPopupBuyStep();
  changePopupBuyHead(prevIndex);
});
$('.close-popup-buy ').on('click', function () {
  var inputs = $(this).closest('.popup-buy-step').find('input[type="text"]');
  var condition = false;
  inputs.each(function () {
    if (this.value && this.validity.valid) condition = true;else condition = false;
  });

  if (condition) {
    $.fancybox.close(true);
    $('#popup-buy-office .popup-buy-step').removeClass('d-block');
    changeGradientPositionLeft();
    goPrevPopupBuyStep();
  } else alert('Проверьте введенные данные.');
});
$('.popup-buy-inner-window-link').on('click', function () {
  clearInput($('.popup-buy-inner-window-adress'));
});
$('.popup-buy-inner-window-hours-choice button').on('click', function () {
  incrementDecrementValue(this);
}); //popup-buy scripts end