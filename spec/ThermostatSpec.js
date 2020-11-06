'use strict';

describe('Thermostat',() => {

  let thermostat;
  // let MINIMUM_TEMPERATURE;
  // let MIN_TEMP = MINIMUM_TEMPERATURE + 1
  let MIN_TEMP = 11
  beforeEach(() => {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', () => {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('increase in temperature with up()', () => {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  })

  it('decrease in temperature with down()', () => {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  })

  it('has a minimum of 10 degrees', () => {
    for (let i = 0; i < MIN_TEMP; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });



});