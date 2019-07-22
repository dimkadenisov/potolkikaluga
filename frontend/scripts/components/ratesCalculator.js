// rates calculator start

function calculateRates(value) {
  const areaValue = value;
  const colorValue = $('#color').val();

  let output = $('.calculator-price b');

  if (value <= 19) {
    if (colorValue == 'White') {
      let minValue = areaValue * 500;
      let maxValue = areaValue * 2*500;
      output.text('от ' + minValue + ' до ' + maxValue)
    } else {
      let minValue = areaValue * 600;
      let maxValue = areaValue * 2*600;
      output.text('от ' + minValue + ' до ' + maxValue)
    }
  } else if (value == 20) {
    if (colorValue == 'White') {
      let minValue = areaValue * 480;
      let maxValue = areaValue * 950;
      output.text('от ' + minValue + ' до ' + maxValue)
    } else {
      let minValue = areaValue * 580;
      let maxValue = areaValue * 1150;
      output.text('от ' + minValue + ' до ' + maxValue)
    }
  } else if (value == 21) {
    if (colorValue == 'White') {
      let minValue = areaValue * 480;
      let maxValue = areaValue * 950;
      output.text('от ' + minValue + ' до ' + maxValue)
    } else {
      let minValue = areaValue * 570;
      let maxValue = areaValue * 1150;
      output.text('от ' + minValue + ' до ' + maxValue)
    }
  } else if (value == 22) {
    if (colorValue == 'White') {
      let minValue = areaValue * 470;
      let maxValue = areaValue * 950;
      output.text('от ' + minValue + ' до ' + maxValue)
    } else {
      let minValue = areaValue * 550;
      let maxValue = areaValue * 1150;
      output.text('от ' + minValue + ' до ' + maxValue)
    }
  } else if (value >= 23) {
    if (colorValue == 'White') {
      let minValue = areaValue * 450;
      let maxValue = areaValue * 950;
      output.text('от ' + minValue + ' до ' + maxValue)
    } else {
      let minValue = areaValue * 550;
      let maxValue = areaValue * 1150;
      output.text('от ' + minValue + ' до ' + maxValue)
    }
  }
}

let inputArea = $('#area-input');

inputArea.on('change', function() {
  calculateRates(inputArea.val());
});

let selectColor = $('#color');

selectColor.on('change', function() {
  calculateRates(inputArea.val());
});

$(document).ready(function() {
  calculateRates(inputArea.val())
})

// rates calculator end
