'use strict';

describe('Thermostat',() => {

  let thermostat;

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
    let min_temp = thermostat.MINIMUM_TEMPERATURE
    for (let i = 0; i <= min_temp; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('has power saving mode on by default', () => {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can switch PSM off',() => {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  })
  
  it('can switch PSM back on', () => {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  describe('when power saving mode is on',() => {

    it('has a maximum temperature of 25 degrees',() => {
      let psm_on = thermostat.MAX_LIMIT_PSM_ON
      for (let i = 0; i < psm_on; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(psm_on);
    });
  });

  describe('when power saving mode is off', () => {

    it('has a maximum temperature of 32 degrees', () => {
      thermostat.switchPowerSavingModeOff();
      let psm_off = thermostat.MAX_LIMIT_PSM_OFF
      for (let i = 0; i < psm_off; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(psm_off);
    });
  });

  it('can be reset to the default temperature', () => {
    let def_temp = thermostat.DEFAULT_TEMPERATURE
    for (let i = 0; i < 12; i++) {
      thermostat.up();
    }
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(def_temp);
  });

  describe('displaying usage levels', () => {


    describe('when the temperature is below 18 degrees', () =>  {
      it('it is considered low-usage', () => {
        let low_usage = thermostat.DEFAULT_TEMPERATURE - 3
        for (let i = 0; i < low_usage; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });
  
    describe('when the temperature is between 18 and 25 degrees', () =>  {
      it('it is considered medium-usage', () =>  {
        expect(thermostat.energyUsage()).toEqual('medium-usage');
      });
    });
  
    describe('when the temperature is anything else', () =>  {
      it('it is considered high-usage', function() {
        thermostat.powerSavingMode = false;
        let high_usage = thermostat.DEFAULT_TEMPERATURE + 6
        for (let i = 0; i < high_usage; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });
    });
  });


});