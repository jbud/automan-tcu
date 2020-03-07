const clutch = new Clutch();

const ecu = new Ecu();
const canbus = new Canbus();
//Gather data from ecu
let Ecudata = {};
const gear = new Gears();
async function datastream(){
  Ecudata = {
    CURRENTMPH: ecu.getSpeed(),
    CURRENTRPM: ecu.getRPM(),
    THROTTLEPOS: canbus.getTpos(),
    CLUTCHPOS: canbus.getClutchSensor(),
    SHIFTPOS: canbus.getShifterSensor()

  }
}
let ds = setInterval(datastream, 5); //Loop datastream every 5 milliseconds

let automatic = true;

let upshiftpoints = [];
let downshiftpoints = [];

let modes = {
  MANUAL: {
    0: () => automatic = false
  },
  NORMAL: {
    // todo: shiftpoints for normal

  },
  SPORT: {
     // todo: shiftpoints for sport
  },
  ECO: {
      0: () => {
        for (let g in gears.gear) {
          upshiftpoints.g = gear.minspeeds.g;
          downshiftpoints.g = gear.minspeeds.g;
      }
    }
  }
}
let mode = modes.NORMAL;

function setMode(m){
  modes.m(); // execute the mode's code
  mode = modes.m; // set the enumeration for the mode
}

function setAuto(toggle){
  automatic = toggle ? true : false;
}

// automatic shift
async function ashift(from, to) {
    switch(mode){
      case SPORT:
        await clutch.engageLarp(0.9);
        if (from > to) { // downshift
          await gear.shift(-1); // neutral
          await clutch.disengageLarp(0.9);

          await canbus.sendData('Tpos', (from, to)=>
              gear.calculateRevMatch(from, to)
            ).until(Ecudata.CURRENTRPM == gear.calculateRevMatch(from, to));
          await clutch.engage();
        }
        await gear.shift(to);
        await clutch.disengageLarp(0.825);

      default:
        clutch.engageLarp(0.425);
        await gear.shift(to);
        clutch.disengageLarp(0.425);

    }
}

function mshift() {
// TODO: just pipe the inputs directly from the shifter sensor and clutch sensors

}
