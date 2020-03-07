class Ecu{
  constructor(){
    this.rpm = 950;
    this.mph = 19;
  }
  getMinRPM(){
    return 600;
  }
  getMaxRPM(){
    return 6500;
  }
  getSpeed(){
    return this.mph;
  }
  getRPM(){
    return this.rpm;
  }
}
