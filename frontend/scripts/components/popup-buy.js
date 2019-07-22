//popup-buy scripts start

let popupBuyCardsSwiper = new Swiper ('.popup-buy-cards', {
  loop: false,
  slideClass: 'popup-buy-cards-item',
  slidesPerView: 3,
  spaceBetween: 24,
  grabCursor: false,

  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  simulateTouch:false,

  centeredSlides: true,

  navigation: {
    nextEl: '.popup-buy-cards-button-next',
    prevEl: '.popup-buy-cards-button-prev',
  },

  keyboard: {
    enabled: true,
  },

  breakpoints: {
    // 1575: {
    //   slidesPerView: 3,
    // },

    // 1199: {
    //   slidesPerView: 3,
    // },

    991: {
      slidesPerView: 2,
    },

    767: {
      slidesPerView: 1,
    },
  }
});

$('[data-fancybox="popup-buy"]').click(function (e) {
  e.preventDefault();

  if($('.popup-buy-step.d-block').attr('data-index') === '7') {
    changeGradientPositionLeft();
    goPrevPopupBuyStep();
  }

  $.fancybox.open({
    src  : '#popup-buy',
    slideClass: 'popup-buy-slide',
    touch: false,
    smallBtn: false,
    buttons: [],
  });
});

$('[data-fancybox="popup-buy-courier"]').click(function (e) {
  e.preventDefault();

  $.fancybox.open({
    src  : '#popup-buy-courier',
    slideClass: 'popup-buy-slide',
    touch: false,
    smallBtn: false,
    buttons: [],
  });

  $('#popup-buy-courier .popup-buy-step').addClass('d-block');
});

$('[data-fancybox="popup-buy-office"]').click(function (e) {
  e.preventDefault();

  $.fancybox.open({
    src  : '#popup-buy-office',
    slideClass: 'popup-buy-slide',
    touch: false,
    smallBtn: false,
    buttons: [],
  });

  $('#popup-buy-office .popup-buy-step').addClass('d-block');
});

let changeGradientPositionRight = () => {
  let gradient = $('.popup-buy-progress-gradient');
  let gradientValue = gradient.css('background-position');

  let trolley = $('.popup-buy-progress-trolley');
  let trolleyLeft = trolley.attr('style') ? trolley.attr('style') : trolley.css('left');

  gradientValue = +gradientValue.match(/\d+/);
  trolleyLeft = +trolleyLeft.match(/\d+/);

  gradientValue += 16;
  gradient.css('background-position', `-${gradientValue}%`);

  trolleyLeft += 16;
  trolley.css('left', `${trolleyLeft}%`);
};

let changeGradientPositionLeft = () => {
  let gradient = $('.popup-buy-progress-gradient');
  let gradientValue = gradient.css('background-position');

  let trolley = $('.popup-buy-progress-trolley');
  let trolleyLeft = trolley.attr('style') ? trolley.attr('style') : trolley.css('left');

  gradientValue = +gradientValue.match(/\d+/);
  trolleyLeft = +trolleyLeft.match(/\d+/);

  gradientValue -= 16;
  gradient.css('background-position', `-${gradientValue}%`);

  trolleyLeft -= 16;
  trolley.css('left', `${trolleyLeft}%`);
};

let goNextPopupBuyStep = () => {
  let popupBuyStep = document.querySelectorAll('.popup-buy-step');

  let currentIndex = (() => {
    for (let i = 0; i < popupBuyStep.length; i++) {
      if (popupBuyStep[i].classList.contains('d-block')) {
        return i;
      }
    }
  })();

  let nextIndex = currentIndex+1;

  for (let i = 0; i < popupBuyStep.length; i++) {
    popupBuyStep[i].classList.remove('d-block');
  };
  popupBuyStep[nextIndex].classList.add('d-block');

  return currentIndex - 2;
};

let goPrevPopupBuyStep = () => {
  let popupBuyStep = document.querySelectorAll('.popup-buy-step');

  let currentIndex = (() => {
    for (let i = 0; i < popupBuyStep.length; i++) {
      if (popupBuyStep[i].classList.contains('d-block')) {
        return i;
      }
    }
  })();

  let prevIndex = currentIndex-1;

  for (let i = 0; i < popupBuyStep.length; i++) {
    popupBuyStep[i].classList.remove('d-block');
  };
  popupBuyStep[prevIndex].classList.add('d-block');

  return prevIndex-3;
}

let popupBuyHeadStepTexts = ['Шаг 1', 'Шаг 2', 'Шаг 2', 'Шаг 3', 'Шаг 4', 'Шаг 4',];
let popupBuyHeadDescriptionBig = ['Укажите', 'Укажите освещение', 'Укажите освещение', 'Выбор даты и времени', 'Оформление', 'Оплата заказа',]
let popupBuyHeadDescriptionSmall = ['параметры вашего потолка', 'и встроенные элементы', 'и встроенные элементы', 'монтажа', 'заказа и оплата', '№12345',];

const changePopupBuyHead = (currentIndex) => {
  $('.popup-buy-head-step').text(popupBuyHeadStepTexts[currentIndex]);
  $('.popup-buy-head-description-big').text(popupBuyHeadDescriptionBig[currentIndex]);
  $('.popup-buy-head-description-small').text(popupBuyHeadDescriptionSmall[currentIndex]);
}

const generateCards = () => {

  let cardsContainer = $('.popup-buy-cards > .swiper-wrapper');
  let cardsAmount = +$('.popup-buy-field-input input').val();
  let pseudoCard = cardsContainer.find('.popup-buy-cards-item-add');

  for (let i = 1; i <= cardsAmount; i++) {
    pseudoCard.before(`<fieldset class="popup-buy-cards-item popup-buy-cards-item-card">
    <div class="popup-buy-cards-item-background" style="background-image: url(assets/img/popup-buy-card-bg.png)"></div>
    <div class="popup-buy-cards-item-number">${i}</div><button class="popup-buy-cards-item-remove" type="button"></button>
    <div class="popup-buy-cards-item-body">
    <label for="length-${i}">
      Длина, см
      <span>от 50см до 990см</span>
    </label>
        <a class="popup-buy-cards-item-calc" href="#" disabled>-</a><input id ="length-${i}" type="number" value="300" min="50" max="990" data-step="5" disabled><a class="popup-buy-cards-item-calc" href="#" data-increment="data-increment" disabled>+</a>
        <label for="width-${i}">
          Ширина, см
          <span>от 50см до 550см</span>
        </label>
        <a class="popup-buy-cards-item-calc" href="#" disabled>-</a><input id="width-${i}" type="number" value="300" min="50" max="550" data-step="5" disabled><a class="popup-buy-cards-item-calc" href="#" data-increment="data-increment" disabled>+</a>
        <label for="room-type-${i}" data-line-height="data-line-height">Тип помещения</label>
        <div class="popup-buy-cards-item-select-wrapper">
          <select id="room-type-${i}" disabled>
            <option selected="selected" disabled="disabled">Выбрать</option>
            <option value="Жилая комната">Жилая комната</option>
            <option value="Гостиная">Гостиная</option>
            <option value="Кухня">Кухня</option>
            <option value="Ванная">Ванная</option>
            <option value="Туалет">Туалет</option>
            <option value="Коридор">Коридор</option>
            <option value="Лоджия">Лоджия</option>
            <option value="Кладовая">Кладовая</option>
            <option value="Гардеробная">Гардеробная</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
        <label for="facture-${i}">Фактура</label>
        <div class="popup-buy-cards-item-select-wrapper">
          <select id="facture-${i}" disabled>
            <option selected="selected" disabled="disabled">Выбрать</option>
            <option value="mate">Матовая</option>
            <option value="glossy">Глянцевая</option>
            <option value="satin">Сатиновая</option>
          </select>
        </div>
        <p class="popup-buy-cards-item-notice">Как правильно указать размеры комнаты
            <a href="https://youtu.be/puXzhrGhCEo" data-fancybox="how-to-do-1">смотрите видео</a></p>
        <div class="popup-buy-cards-item-images">
            <div class="popup-buy-cards-item-images-item" style="background-image: url(assets/img/baseline-logo.png)"></div>
            <div class="popup-buy-cards-item-images-item" style="background-image: url(assets/img/exploitation.png)"></div>
            <div class="popup-buy-cards-item-images-item" style="background-image: url(assets/img/ghost.png)"></div>
            <div class="popup-buy-cards-item-images-item" style="background-image: url(assets/img/white-color.png)"></div>
        </div><button class="popup-buy-cards-item-ready" type="button" disabled>Подтвердить</button>
      </div>
    </fieldset>`);
  };

  activateCard($('.popup-buy-cards-item-card:first'));

  $('.popup-buy-cards-item:first').addClass('popup-buy-cards-item-colored');

  $('.popup-buy-cards-item-remove').on('click', (event) => {

    if ($('.popup-buy-cards-item-card').length == 1) {
      alert('Необходимо заполнить минимум одну карточку')
      return
    };

    if ($(event.currentTarget).parent().find('.popup-buy-cards-item-number').text() == '1') {
      activateCard($(event.currentTarget).parent().next());
      $(event.currentTarget).parent().next().addClass('popup-buy-cards-item-colored');
    };

    let card = removeCard(event);
    changeCardsIndexes(card);
    addPseudoCard();

    let validCardsAmount = $('.popup-buy-cards-item-ready-valid').length;
    let totalCardsAmount = $('.popup-buy-cards-item-card').length;
    let isCurrentCardValid = $(event.currentTarget).parent().find('.popup-buy-cards-item-ready-valid').length;

    if ( (totalCardsAmount - validCardsAmount == 1) &&  !isCurrentCardValid) {
      calculateSum();
      $('.calculate-corners-amount').removeAttr('disabled');
    };

    if(card.prev().find('.popup-buy-cards-item-ready').hasClass('popup-buy-cards-item-ready-valid')) {
      card.next().addClass('popup-buy-cards-item-colored');
      activateCard(card.next());
    };
    setInterval(setViget, 350);

  });

  $('input[id^=length]').on('mouseover', hidePlaceholder);
  $('input[id^=width]').on('mouseover', hidePlaceholder);

  $('input[id^=length]').on('mouseleave', setPlaceholder);
  $('input[id^=width]').on('mouseleave', setPlaceholder);

  $('input[id^=length]').on('change', setReadyButtonState);
  $('input[id^=width]').on('change', setReadyButtonState);

  $('.popup-buy-cards-item-calc').on('click', function(event) {
    event.preventDefault();
    incrementDecrementValue(this);
    updateCardState(this);
    let input = $(this).prev().val() ? $(this).prev() : $(this).next();
    setReadyButtonState.call(input);
  });

  $('.popup-buy-cards-item-card select').on('click', function() {
    updateCardState(this);
  });

  $('.popup-buy-cards-item-card select').on('change', setReadyButtonState);

  $('.popup-buy-cards-item-ready').on('click', function() {
    if (checkCardDataValidity.apply(this)) {
      activateCard($(this).parent().parent().next());

      let inputs = $(this).closest('.popup-buy-cards-item-card').find('input[type="number"]');
      let selects = $(this).closest('.popup-buy-cards-item-card').find('select');

      inputs.each(function() {
        $(this).attr('disabled', 'disabled');
      });

      selects.each(function() {
        $(this).attr('disabled', 'disabled');
      });
    }
  });

  $('.calculate-corners-amount').attr('disabled', 'disabled');

  if (cardsAmount == 10) pseudoCard.remove();

};

const addCard = (event) => {

  let pseudoCard = $(event.currentTarget);

  let i = +pseudoCard.prev().find('.popup-buy-cards-item-number').text();
  ++i;

  pseudoCard.before(`<fieldset class="popup-buy-cards-item popup-buy-cards-item-card">
    <div class="popup-buy-cards-item-background" style="background-image: url(assets/img/popup-buy-card-bg.png)"></div>
    <div class="popup-buy-cards-item-number">${i}</div><button class="popup-buy-cards-item-remove" type="button"></button>
    <div class="popup-buy-cards-item-body">
    <label for="length-${i}">
      Длина, см
      <span>от 50см до 990см</span>
    </label>
        <a class="popup-buy-cards-item-calc" href="#" disabled>-</a><input id ="length-${i}" type="number" value="300" min="50" max="990" data-step="5" disabled><a class="popup-buy-cards-item-calc" href="#" data-increment="data-increment" disabled>+</a>
        <label for="width-${i}">
          Ширина, см
          <span>от 50см до 550см</span>
        </label>
        <a class="popup-buy-cards-item-calc" href="#" disabled>-</a><input id="width-${i}" type="number" value="300" min="50" max="550" data-step="5" disabled><a class="popup-buy-cards-item-calc" href="#" data-increment="data-increment" disabled>+</a>
        <label for="room-type-${i}" data-line-height="data-line-height">Тип помещения</label>
        <div class="popup-buy-cards-item-select-wrapper">
          <select id="room-type-${i}" disabled>
            <option selected="selected" disabled="disabled">Выбрать</option>
            <option value="Жилая комната">Жилая комната</option>
            <option value="Гостиная">Гостиная</option>
            <option value="Кухня">Кухня</option>
            <option value="Ванная">Ванная</option>
            <option value="Туалет">Туалет</option>
            <option value="Коридор">Коридор</option>
            <option value="Лоджия">Лоджия</option>
            <option value="Кладовая">Кладовая</option>
            <option value="Гардеробная">Гардеробная</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
        <label for="facture-${i}">Фактура</label>
        <div class="popup-buy-cards-item-select-wrapper">
          <select id="facture-${i}" disabled>
            <option selected="selected" disabled="disabled">Выбрать</option>
            <option value="mate">Матовая</option>
            <option value="glossy">Глянцевая</option>
            <option value="satin">Сатиновая</option>
          </select>
        </div>
        <p class="popup-buy-cards-item-notice">Как правильно указать размеры комнаты
            <a href="https://youtu.be/puXzhrGhCEo" data-fancybox="how-to-do-1">смотрите видео</a></p>
        <div class="popup-buy-cards-item-images">
            <div class="popup-buy-cards-item-images-item" style="background-image: url(assets/img/baseline-logo.png)"></div>
            <div class="popup-buy-cards-item-images-item" style="background-image: url(assets/img/exploitation.png)"></div>
            <div class="popup-buy-cards-item-images-item" style="background-image: url(assets/img/ghost.png)"></div>
            <div class="popup-buy-cards-item-images-item" style="background-image: url(assets/img/white-color.png)"></div>
        </div><button class="popup-buy-cards-item-ready" type="button" disabled>Подтвердить</button>
      </div>
    </fieldset>`);

  $('.popup-buy-cards-item-remove:last').on('click', (event) => {

    if ($('.popup-buy-cards-item-card').length == 1) {
      alert('Необходимо заполнить минимум одну карточку')
      return
    };

    if ($(event.currentTarget).parent().find('.popup-buy-cards-item-number').text() == '1') {
      activateCard($(event.currentTarget).parent().next());
      $(event.currentTarget).parent().next().addClass('popup-buy-cards-item-colored');
    };

    let card = removeCard(event);
    changeCardsIndexes(card);
    addPseudoCard();

    let validCardsAmount = $('.popup-buy-cards-item-ready-valid').length;
    let totalCardsAmount = $('.popup-buy-cards-item-card').length;
    let isCurrentCardValid = $(event.currentTarget).parent().find('.popup-buy-cards-item-ready-valid').length;

    if ( (totalCardsAmount - validCardsAmount == 1) &&  !isCurrentCardValid) {
      calculateSum();
      $('.calculate-corners-amount').removeAttr('disabled');
    };

    if(card.prev().find('.popup-buy-cards-item-ready').hasClass('popup-buy-cards-item-ready-valid')) {
      card.next().addClass('popup-buy-cards-item-colored');
      activateCard(card.next());
    };
    setInterval(setViget, 350);

  });

  $('input[id^=length]:last').on('mouseover', hidePlaceholder);
  $('input[id^=width]:last').on('mouseover', hidePlaceholder);

  $('input[id^=length]:last').on('mouseleave', setPlaceholder);
  $('input[id^=width]:last').on('mouseleave', setPlaceholder);


  let lastCard = $('.popup-buy-cards-item-card:last');
  let calcButtons = lastCard.find('.popup-buy-cards-item-calc');
  let cardInputs = lastCard.find('input[type="number"]');
  let cardSelects = lastCard.find('select');


  calcButtons.on('click', function(event) {
    event.preventDefault();
    incrementDecrementValue(this);
    updateCardState(this);
  });

  cardInputs.on('change', setReadyButtonState);
  cardSelects.on('change', setReadyButtonState);


  $('.popup-buy-cards-item-card:last select').on('click', function() {
    updateCardState(this);
  });

  $('.popup-buy-cards-item-ready:last').on('click', function() {
    if (checkCardDataValidity.apply(this)) {
      activateCard($(this).parent().parent().next());

      let inputs = $(this).closest('.popup-buy-cards-item-card').find('input[type="number"]');
      let selects = $(this).closest('.popup-buy-cards-item-card').find('select');

      inputs.each(function() {
        $(this).attr('disabled', 'disabled');
      });

      selects.each(function() {
        $(this).attr('disabled', 'disabled');
      });
    }
  });

  $('.calculate-corners-amount').attr('disabled', 'disabled');

  if (i == 10) pseudoCard.remove();
};

const checkInput = function() {
  let input = $('.popup-buy-field-input input');
  let inputValue = +input.val();
  let maxValue = +$('.popup-buy-field-input input').attr('max');
  let minValue = +$('.popup-buy-field-input input').attr('min');

  if(inputValue > maxValue) {
    alert(`Максимальное количество = ${maxValue}`);
    input.val(maxValue);
    return false;
  };

  if(inputValue < minValue) {
    alert(`Минимальное количество = ${minValue}`);
    input.val(minValue);
    return false;
  };

  if(!inputValue) {
    alert('Для ввода допустимы только целые числа');
    input.val(maxValue);
    return false;
  };

  return true;
}

const addPseudoCard = () => {
  if ($('.popup-buy-cards-item-add').length == 0) {

    let cardsContainer = $('.popup-buy-cards > .swiper-wrapper');
    cardsContainer.append('<div class="popup-buy-cards-item popup-buy-cards-item-add"></div>');

    $('.popup-buy-cards-item-add').on('click', (event) => {

      if ($(event.currentTarget).prev().find('.popup-buy-cards-item-ready').hasClass('popup-buy-cards-item-ready-valid')) {
        addCard(event);
        $(event.currentTarget).prev().addClass('popup-buy-cards-item-colored');
        activateCard($(event.currentTarget).prev());
      } else {
        addCard(event);
      }

      // setInterval(setViget, 350);
      setViget();
    });

  };

};

const removeCard = function(event) {
  let card = $(event.currentTarget).parent();
  card.fadeOut(300);

  setTimeout(function() {
    card.remove();
  }.bind(card), 310);

  setTimeout(function() {
    calculateSum();
  }, 320);

  if ($('.popup-buy-cards-item-ready').length == 1) {
    $('.calculate-corners-amount').attr('disabled', 'disabled');
  }

  return card;
};

const changeCardsIndexes = (card) => {

  let startIndex = $(card).find('.popup-buy-cards-item-number').text();

  let cards = $('.popup-buy-cards-item-card');


  for (let i = +startIndex; i < cards.length; i++) {
    const card = cards[i];

    let cardNumber = $(card).find('.popup-buy-cards-item-number');

    let lengthLabel = $(card).find('label[for^=length]');
    let lengthInput = $(card).find('input[id^=length]');

    let widthLabel = $(card).find('label[for^=width]');
    let widthInput = $(card).find('input[id^=width]');

    let roomTypeLabel = $(card).find('label[for^=room-type]');
    let roomTypeSelect = $(card).find('select[id^=room-type]');

    let factureLabel = $(card).find('label[for^=facture]');
    let factureSelect = $(card).find('select[id^=facture]');


    cardNumber.text(i);
    lengthLabel.attr('for', `length-${i}`);
    lengthInput.attr('id', `length-${i}`);

    widthLabel.attr('for', `width-${i}`);
    widthInput.attr('id', `width-${i}`);

    roomTypeLabel.attr('for', `room-type-${i}`);
    roomTypeSelect.attr('id', `room-type-${i}`);
    factureLabel.attr('for', `facture-${i}`);
    factureSelect.attr('id', `facture-${i}`);

  };

};

const calculateCornersAmount = () => {
  let cardsLength = $('.popup-buy-cards-item-card').length;

  $('#corners-amount').val(4 * (cardsLength));
  $('#corners-amount').attr('min', 4 * (cardsLength));

  $('#corners-amount').parent().find('.popup-buy-additions-item-block-calc-output').text(0);
};

const hidePlaceholder = function() {
  if (!$(this).attr('disabled')) {
    $(this).attr('value', '');
  }
};

const setPlaceholder = function() {
  if (this.value === '') $(this).attr('value', '300');
};

const incrementDecrementValue = function(context) {

  if ($(context).attr('disabled')) return;

  let el = $(context);
  if (el.attr('data-increment')) {
    let value = +el.prev().val();
    let maxValue = +el.prev().attr('max');
    let step = el.prev().attr('data-step') ? +el.prev().attr('data-step') : 1;

    if (value >= maxValue) {
      el.prev().val(maxValue);
    } else {
      el.prev().val(+value + step);
    }
  } else {
    let value = +el.next().val();
    let minValue = +el.next().attr('min');
    let step = el.next().attr('data-step') ? +el.next().attr('data-step') : 1;

    if (value <= minValue) {
      el.next().val(minValue);
    } else {
      el.next().val(+value - step);
    }
  };

};

const checkCardDataValidity = function() {

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

    if($(this).parent().parent().hasClass('swiper-slide-active')) {
      popupBuyCardsSwiper.slideNext();
    };

    $(this).closest('.popup-buy-cards-item-card').next().addClass('popup-buy-cards-item-colored');

    let validity = 0;
    let readyButtons = $('.popup-buy-cards-item-ready');

    for (let i = 0; i < readyButtons.length; i++) {
      if (readyButtons[i].classList.contains('popup-buy-cards-item-ready-valid')) {
        validity++;
      };
    };

    $(this).closest('.popup-buy-cards-item-card').addClass('popup-buy-cards-item-card-valid');

    calculateSum();

    if (validity == readyButtons.length && readyButtons.length > 0) {
      $('.calculate-corners-amount').removeAttr('disabled');
    };

    return true;
  };

};

const setReadyButtonState = function() {
  let inputs = $(this).parent().find('input[type="number"]');
  let inputsValidity = 0;
  let selects = $(this).parent().find('select');
  let selectsValidity = 0;

  inputs.each(function() {
    inputsValidity += this.validity.valid ? 1 : 0;
  });

  selects.each(function() {
    selectsValidity += (this.selectedIndex > 0) ? 1 : 0;
  });

  if (inputsValidity === inputs.length && selectsValidity === selects.length) {
    $(this).parent().find('.popup-buy-cards-item-ready').addClass('popup-buy-cards-item-ready-magenta')
  } else {
    $(this).parent().find('.popup-buy-cards-item-ready').removeClass('popup-buy-cards-item-ready-magenta')
  }
};

const calculateSum = function() {

  let lengthInputs = $('.popup-buy-cards-item-card-valid input[id^="length"]');
  let widthInputs = $('.popup-buy-cards-item-card-valid input[id^="width"]');

  let lengths = [];
  let widths = [];
  let areas = [];
  let perimetrs = [];
  let prices = [];

  let sumAmount = 0;
  let sumOutput = $('.popup-buy-step.d-block .popup-buy-sum b');

  for (let i = 0; i < lengthInputs.length; i++) {

    lengths.push(lengthInputs[i].value);

  };

  for (let i = 0; i < widthInputs.length; i++) {

    widths.push(widthInputs[i].value);

  };

  for (let i = 0; i < widths.length; i++) {
    areas.push(+widths[i] * +lengths[i] * 400 / 10000);
    perimetrs.push((+widths[i] + +lengths[i]) * 6);
  };

  prices.push(...areas);
  prices.push(...perimetrs);

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    sumAmount +=price;
  };

  sumOutput.text(`${sumAmount.toLocaleString()} ₽`);

};

const calculateAdditions = function(context) {

  let input = $(context).parent().find('input');
  let inputValue = input.val();
  let multiplierValue = $(context).parent().find('.popup-buy-additions-item-block-calc-multiplier').text();
  let outputSpan = $(context).parent().find('.popup-buy-additions-item-block-calc-output');

  if (input[0].id == 'corners-amount') {

    let cornersAmount = $('.popup-buy-cards-item-card').length * 4;

    outputSpan.text((+inputValue - +cornersAmount) * +multiplierValue);

  } else outputSpan.text(+inputValue * +multiplierValue);

};

const setSecondSumInitialValue = function(context) {

  let initialValue = $(context).parent().find('.popup-buy-sum b').text();
  initialValue = parseInt(initialValue.replace(/\s/g, ''));

  let nextSumOutput = $(context).parent().next().find('.popup-buy-sum b');

  let additionsFields = $('.popup-buy-additions-item-block-calc-output');

  for (let i = 0; i < additionsFields.length; i++) {
    const value = +$(additionsFields[i]).text();

    initialValue += value;
  };

  nextSumOutput.text(initialValue.toLocaleString() + ' ₽');

  nextSumOutput.attr('data-initial-value', initialValue);

};

const setViget = function() {
  let cardsAmount = $('.popup-buy-cards-item-card').length;
  if($('.screen-1-popup-opener-circle').find('.screen-1-popup-opener-counter').length) {
    $('.screen-1-popup-opener-counter').text(cardsAmount);

  } else {
    $('.screen-1-popup-opener-circle').append(`<span class="screen-1-popup-opener-counter">${cardsAmount}</span>`);
  }
};

const updateNextSumValue = function(context) {

  let sumNode = $(context).closest('.popup-buy-step').find('.popup-buy-sum b');

  let initialValue = +sumNode.attr('data-initial-value');

  let addends = $(context).closest('.popup-buy-step').find('.popup-buy-additions-item-block-calc-output').length ? $(context).closest('.popup-buy-step').find('.popup-buy-additions-item-block-calc-output') : $(context).closest('.popup-buy-step').find('.popup-buy-additions-item-block-sum b');

  addends.each(function() {
    initialValue += parseInt($(this).text().replace(/\s/g));
  });

  sumNode.text(initialValue.toLocaleString() + ' ₽');
};

let additionInputTimeout;

$('.popup-buy-additions-item-block-calc input').on('input', function(e) {
  if(additionInputTimeout) clearTimeout(additionInputTimeout);

  additionInputTimeout = setTimeout(function(context) {

    if(!context.validity.valid) {

      if (+context.value > +context.max) context.value = context.max;
      else context.value = context.min;

    }

    calculateAdditions(context);
    updateNextSumValue(context);

  }, 1000, this);
});

const activateCard = function(card) {

  card.find('input').each(function() {
    $(this).removeAttr('disabled');
  });

  card.find('select').each(function() {
    $(this).removeAttr('disabled');
  });

  card.find('.popup-buy-cards-item-calc').each(function() {
    $(this).removeAttr('disabled');
  });

  card.find('.popup-buy-cards-item-ready').each(function() {
    $(this).removeAttr('disabled');
  });

};

const setThirdSumInitialValue = function() {

  let prevSum = parseInt($(this).parent().find('.popup-buy-sum b').text().replace(/\s/g, ''));
  let additionsFields = $(this).parent().next().find('.popup-buy-additions-item-block-sum');
  let outputNode = $(this).parent().next().find('.popup-buy-sum b');

  additionsFields.each(function() {
    prevSum += parseInt($(this).text().replace(/\s/g, ''));
  });

  outputNode.text(prevSum.toLocaleString() + ' ₽');
  outputNode.attr('data-initial-value', prevSum);

};

const checkAdditionsInputValidity = function() {

  let inputs = $(this).parent().find('.popup-buy-additions-item-block-calc input');
  let invalidities = ['Неверно введено количество углов', 'Неверно введено количестов труб', 'Неверно введено количество люстр', 'Неверно введено количество точечных светильников', ' Неверно введено сколько люстр нужно снять'];

  let currentInvalidities = [];

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    if (!input.validity.valid) {
      currentInvalidities.push(invalidities[i]);
    }
  };

  if (currentInvalidities.length) {

    alert(currentInvalidities.join(';\n'))
    return false;

  } else return true;

};

const checkRoomTypes = function() {

  let roomTypesSelects = $('.popup-buy-cards-item-card select[id^=room-type-]');

  $('#kitchen').attr('disabled', 'disabled');
  $('#bathroom').attr('disabled', 'disabled');
  $('#wc').attr('disabled', 'disabled');

  kitchen.checked = false;
  bathroom.checked = false;
  wc.checked = false;

  roomTypesSelects.each(function() {

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

const setTilePrice = function() {
  let checkbox = $(this).find('input[type="checkbox"]');

  setTimeout(function() {
    let cards = $('.popup-buy-cards-item-card');
    let findSelectedIndex = 0;
    let workPrice = 0;

    if (checkbox.attr('id') == 'kitchen') {
      findSelectedIndex = 3;
    } else if (checkbox.attr('id') == 'bathroom') {
      findSelectedIndex = 4;
    } else if (checkbox.attr('id') == 'wc') {
      findSelectedIndex = 5;
    }

    cards.each(function() {
      let roomTypeSelect = $(this).find('select[id^="room-type-"]');
      if (roomTypeSelect[0].selectedIndex == findSelectedIndex) {
        let length = +$(this).find('input[id^="length-"]').val();
        let width = +$(this).find('input[id^="width-"]').val();
        workPrice += (length + width)/2;
      }
    });

    let outputNode = checkbox.closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b');
    let outputNodeValue = parseInt(outputNode.text().replace(/\s/g));

    if (checkbox[0].checked) {
      outputNodeValue = outputNodeValue + workPrice;
    } else {
      if(outputNodeValue != 0) {
        outputNodeValue = outputNodeValue - workPrice;
      }
    }

    outputNode.text(outputNodeValue + ' ₽');

    updateNextSumValue(checkbox);
  }, 300);

};

const clearTileState = function() {
  kitchen.checked = false;
  bathroom.checked = false;
  wc.checked = false;

  let tilePriceNode = $(this).closest('.popup-buy-step').find('#wc').closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b');
  let tilePriceNodeValue = parseInt(tilePriceNode.text().replace(/\s/g));

  let sumNode = $(this).closest('.popup-buy-step').find('.popup-buy-sum b');
  let sumNodeValue = parseInt(sumNode.text().replace(/\s/g));

  sumNode.text(sumNodeValue - tilePriceNodeValue + ' ₽');
  tilePriceNode.text('0 ₽');
};

const updateCardState = function(context) {

  let validButton = $(context).parent().find('.popup-buy-cards-item-ready-valid');

  if(validButton.length) {

    validButton.removeClass('popup-buy-cards-item-ready-valid');
    $('.calculate-corners-amount').attr('disabled', 'disabled');
  }
};

const addCeilingHeight = function() {

  if (this.checked) {

    // let sumNode = $(this).closest('.popup-buy-step').find('.popup-buy-sum b');
    // let text = parseInt(sumNode.text().replace(/\s/g, ''));

    if (this.id == 'more-then-3' && !$(this).attr('data-added')) {

      $(this).attr('data-added', 'data-added');

      $(this).closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b').text('1000 ₽');
      $(this).attr('data-add', 'data-add');

      // sumNode.text((text + 1000) + ' ₽');

    } else if (this.id == 'less-then-3') {

      $('#more-then-3').removeAttr('data-added');

      $(this).closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b').text('0 ₽');

      // if($('#more-then-3').attr('data-add')) {

      //   sumNode.text((text - 1000) + ' ₽');
      //   $('#more-then-3').removeAttr('data-add');
      // }

    }
  }

  updateNextSumValue(this);

};

const addTousend = function() {

  if (this.checked) {

    if(!$(this).attr('data-add')) {
      $(this).closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b').text('1000 ₽');

      // let sumNode = $(this).closest('.popup-buy-step').find('.popup-buy-sum b');
      // let text = parseInt(sumNode.text().replace(/\s/g, ''));
      // sumNode.text((text + 1000) + ' ₽');
      $(this).attr('data-add', 'data-add');

    }

  } else {

    if($(this).attr('data-add')) {

      $(this).closest('.popup-buy-additions-item').find('.popup-buy-additions-item-block-sum b').text('0 ₽');

      // let sumNode = $(this).closest('.popup-buy-step').find('.popup-buy-sum b');
      // let text = parseInt(sumNode.text().replace(/\s/g, ''));
      // sumNode.text((text - 1000) + ' ₽');
      $(this).removeAttr('data-add');

    }

  }

  updateNextSumValue(this);

};

const calculateTotalAmountAndDiscount = function() {

  let onlineDiscountCheckbox = document.querySelector('#give-online-discount');
  let totalValue = parseInt($(this).parent().find('.popup-buy-sum b').text().replace(/\s/g, ''));
  let totalValueToSetNode = $('#total-amount-without-discount');
  let onlineDiscountNode = $('#online-discount');
  let totalValueWithDiscountNode = $('#total-amount-with-discount');
  let prepaymentNode = $('#prepayment');

  let onlineDiscountValue = onlineDiscountCheckbox.checked ? Math.floor(totalValue / 10) : 0;
  let totalValueWithDiscountValue = Math.round(totalValue - onlineDiscountValue);
  let prepaymentValue = Math.round(totalValueWithDiscountValue / 4);

  totalValueToSetNode.text(totalValue + ' ₽');
  onlineDiscountNode.text(onlineDiscountValue + ' ₽');
  totalValueWithDiscountNode.text(totalValueWithDiscountValue + ' ₽');
  prepaymentNode.text(prepaymentValue + ' ₽')

};

const checkOnlineDisount = function() {

  let totalValueNode = $('#total-amount-without-discount');
  let onlineDiscountNode = $('#online-discount');
  let totalValueWithDiscountNode = $('#total-amount-with-discount');
  let prepaymentNode = $('#prepayment');
  let totalValue = parseInt(totalValueNode.text().replace(/\s/g, ''));

  let onlineDiscountValue = this.checked ? Math.floor(totalValue / 10) : 0;
  let totalValueWithDiscountValue =  Math.round(totalValue - onlineDiscountValue);
  let prepaymentValue = Math.round(totalValueWithDiscountValue / 4);

  onlineDiscountNode.text(onlineDiscountValue + ' ₽');
  totalValueWithDiscountNode.text(totalValueWithDiscountValue + ' ₽');
  prepaymentNode.text(prepaymentValue + ' ₽');

};

const checkPersonalData = function() {

  let personalDataInputs = $('.popup-buy-contacts input');

  let message = [];
  let invalidMessages = ['адрес', 'телефон', 'ФИО', 'дату'];

  for (let i = 0; i < personalDataInputs.length; i++) {
    const element = personalDataInputs[i];
    if ( !element.validity.valid || !element.value ) {
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

const setDateAdress = function() {
  let date = $('#montage-date-input').val();
  let adress = $('#montage-adress-input').val();

  $('#montage-date-output').text(date);
  $('#montage-adress-output').text(adress);
  $('.popup-buy-inner-window-adress').val(adress);
  $('.popup-buy-inner-window-date').val(date);
};

const clearInput = function(input) {
  input.val('');
  input.focus();
}

const setPaymentOptions = function() {
  let value = $('#total-amount-with-discount').text();

  $('#total-sum').text(value);

  value = parseInt(value.replace(/\s/g));

  $('#total-prepayment').attr('min', Math.round(value / 4));
  $('#total-prepayment').attr('max', value);
  $('#total-prepayment').attr('value', Math.round(value / 4));
};

let totalPrepaymentTimeout;

$('#total-prepayment').on('input', function (e) {
  if (totalPrepaymentTimeout) clearTimeout(totalPrepaymentTimeout);

  totalPrepaymentTimeout = setTimeout(function(context) {

    if(!context.validity.valid) {

      if (+context.value > +context.max) context.value = context.max;
      else context.value = context.min;

    }
  }, 1000, this);
});

$('.popup-buy-field button').on('click', () => {
  if (checkInput()) {
    generateCards();
    setViget();
    changeGradientPositionRight();
    changePopupBuyHead(goNextPopupBuyStep());
  }
});

$('.popup-buy-button.popup-buy-button-left').on('click', () => {

  changeGradientPositionLeft();
  let prevIndex = goPrevPopupBuyStep();
  changePopupBuyHead(prevIndex);

})

$('.popup-buy-field a').on('click', function(event) {

  event.preventDefault();
  incrementDecrementValue(this);

});

$('.popup-buy-additions-item-block-calc button').on('click', function(event) {

  event.preventDefault();

  incrementDecrementValue(this);
  calculateAdditions(this);
  updateNextSumValue(this);

});

$('.popup-buy-cards-item-add').on('click', (event) => {

  if ($(event.currentTarget).prev().find('.popup-buy-cards-item-ready').hasClass('popup-buy-cards-item-ready-valid')) {
    addCard(event);
    $(event.currentTarget).prev().addClass('popup-buy-cards-item-colored');
    activateCard($(event.currentTarget).prev());
  } else {
    addCard(event);
  }
  setViget();
});

$('.calculate-corners-amount').on('click', function() {
  setViget();
  changeGradientPositionRight();
  changePopupBuyHead(goNextPopupBuyStep());
  calculateCornersAmount();
  setSecondSumInitialValue(this);
  checkRoomTypes();

});

$('.set-value').on('click', function() {

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

$('.calculate-total-amount').on('click', function() {

  changeGradientPositionRight();
  changePopupBuyHead(goNextPopupBuyStep());
  calculateTotalAmountAndDiscount.apply(this);

});

$('.popup-buy-total-field-name input[type="checkbox"]').on('click', checkOnlineDisount);

$('.check-personal-data').on('click', () => {
  checkPersonalData();
  setDateAdress();
});

$('.go-to-payment').on('click', () => {

  setPaymentOptions();
  changeGradientPositionRight();
  changePopupBuyHead(goNextPopupBuyStep());

});

$('.popup-buy-go-back').on('click', () => {
  changeGradientPositionLeft();
  let prevIndex = goPrevPopupBuyStep();
  changePopupBuyHead(prevIndex);
});

$('.close-popup-buy ').on('click', function() {
  let inputs = $(this).closest('.popup-buy-step').find('input[type="text"]');
  let condition = false;

  inputs.each(function() {

    if (this.value && this.validity.valid) condition = true;
    else condition = false;
  });

  if (condition) {
    $.fancybox.close(true);
    $('#popup-buy-office .popup-buy-step').removeClass('d-block');
    changeGradientPositionLeft();
    goPrevPopupBuyStep();
  } else alert('Проверьте введенные данные.')

})

$('.popup-buy-inner-window-link').on('click', () => {
  clearInput($('.popup-buy-inner-window-adress'));
});

$('.popup-buy-inner-window-hours-choice button').on('click', function() {
  incrementDecrementValue(this);
});

//popup-buy scripts end
