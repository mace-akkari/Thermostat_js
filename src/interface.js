$(document).ready( () => {
  var thermostat = new Thermostat();
  updateTemperature();

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