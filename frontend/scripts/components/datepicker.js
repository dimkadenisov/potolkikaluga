jQuery.datetimepicker.setLocale('ru');

jQuery('#datepicker').datetimepicker({
  format: 'd.m.Y H:i',
  inline: false,
  lang: 'ru',
  dayOfWeekStart: 1,
  minDate: 0,
  allowTimes:[
    '09:00',
    '11:00',
    '13:00',
    '15:00',
    '17:00',
    '19:00'
  ]
});

jQuery('.montage-date-input').datetimepicker({
  format: 'd.m.Y H:i',
  inline: false,
  lang: 'ru',
  dayOfWeekStart: 1,
  todayButton: false,
  defaultSelect: false,
  useCurrent: false,
  minDate: '+1970/01/07',
  startDate:'+1970/01/07',
  defaultDate:'+1970/01/07',
  formatDate:'Y.m.d',

  closeOnDateSelect: false,

  allowTimes:[
    '10:00',
    '14:00'
  ]
});
