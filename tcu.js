/*************
* Auto-man transmission
* By Joe Jackson
*
* The idea behind this transmission is to simplify manufacturing, while allowing
* options for niche enthusiast trim levels. A manufacturer can setup the
* transmission to be fully automatic and not include a clutch petal with an
* automatic style shifter, and on another trim level the only differences are
* programming, a simple sensor petal, and a sensor shifter assembly. then it
* becomes an enthusiast-grade, manual transmission with shift-by-wire, and
* clutch-by-wire The manufacturer can even build in feedback as the programming
* from the TCU can send data back to any given sensor, allowing you to "feel"
* the clutch or "feel" the gears engage.
*/
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
        await clutch.engageLerp(0.9);
        if (from > to) { // downshift double clutch method
          await gear.shift(-1); // neutral
          await clutch.disengageLerp(0.9);
          let rev = gear.calculateRevMatch(from, to);
          await canbus.throttle(1, rev, 0.9); //Max throttle little lerp
          await clutch.engage();
        }
        await gear.shift(to);
        await clutch.disengageLerp(0.825);
        break;
      default:
        clutch.engageLerp(0.425);
        await gear.shift(to);
        clutch.disengageLerp(0.425);
        break;
    }
}

function mshift() {
// TODO: just pipe the inputs directly from the shifter sensor and clutch sensors

}
