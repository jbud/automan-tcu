let clt, cl,rpm,rp;
function setup() {
  createCanvas(400, 400);
  cl = createP('clutch: ');
  clt = createSlider(0, 1,0,0.01);
  rp = createP('RPM: ')
  rpm = createSlider(ecu.getMinRPM(),ecu.getMaxRPM(), ecu.getRPM(),1);
  }

function draw() {
  background(220);
  ecu.rpm = rpm.value();
  rp.html('RPM: '+round(ecu.rpm));
  canbus.clutchSensor = clt.value();
  cl.html('clutch: '+round(canbus.clutchSensor*100)+'%');
}
