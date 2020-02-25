const clutch = new Clutch();
const gears = new Gears();
const ecu = new Ecu();
const canbus = new Canbus();
//Gather data from ecu
const Ecudata = {}

async function datastream(){
  Ecudata = {

    CURRENTMPH = () => ecu.getSpeed();
    CURRENTRPM = () => ecu.getRPM();
    THROTTLEPOS = () => canbus.getTpos();
    CLUTCHPOS = () => canbus.getClutchSensor();
    SHIFTPOS = () => canbus.getShifterSensor();

  }
}
let ds = await setInterval(datastream, 5); //Loop datastream every 5 milliseconds

let automatic = true;

let upshiftpoints = [];
let downshiftpoints = [];

let modes = {
  MANUAL = {
    () => automatic = false
  },
  NORMAL = {},
  SPORT = {},
  ECO = {
    for (let g in gears.gears) {
      upshiftpoints.g = gears.minspeeds.g;
      downshiftpoints.g = gears.minspeeds.g;
    }

  }

}

function setAuto(toggle){
  automatic = toggle ? true : false;
}


function shift(from, to) {


}
