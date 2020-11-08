$(document).ready( () => {
  var thermostat = new Thermostat();
  updateTemperature();

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  $('#current-temperature').text(data.main.temp);
  })

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  $('#temperature-high').text(data.main.temp_max);
  })

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  $('#temperature-low').text(data.main.temp_min);
  })

  $('#temperature-up').click( () =>  {
    thermostat.up();
    updateTemperature();
  });

  $('#temperature-down').click( () =>  {
    thermostat.down();
    updateTemperature();
  });

  $('#temperature-reset').click( () =>  {
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('#powersaving-on').click( () => {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving').text('on')
    updateTemperature();
  })

  $('#powersaving-off').click( () =>  {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving').text('off')
    updateTemperature();
  })

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  };
});