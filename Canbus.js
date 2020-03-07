class Canbus{
  constructor(){
    this.clutchSensor = 0.0;
  }
  getTpos(){
    return 0.17;
  }
  getClutchSensor(){
    return this.clutchSensor;
  }
  getShifterSensor(){
    return -1;
  }
}
