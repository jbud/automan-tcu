class Canbus{
  constructor(){
    this.clutchSensor = 0x99f;
    this.shifterSensor = 0x98f;
    this.throttleSensor = 0x56f;
    this.tPosSensor = 0x44f;
  }
  async getThrottle(){ //Engine throttle position sensor
    return await this.readBus(this.throttleSensor);
  }
  async getTpos(){ //Throttle petal position sensor
    return await this.readBus(this.tPosSensor);
  }
  async readBus(address){
    return;
  }
  async getClutchPos(){
    return await this.readBus(this.clutchSensor);
  }
  async getShifterPos(){
    return await this.readBus(this.shifterSensor);
  }
  async override(sensor, override=true){
    //TODO: Event listener for brake petal (cancels override)
    //TODO: Shift addresses of sensor so ECU can process them as overrides
    //        Cruise control works this way.
    return;
  }
  async throttle(p, target, lerp=0.525){
    let t,x;
    this.override(this.tPosSensor); // remove throttle control from petal
    while (Ecudata.CURRENTRPM <= target){
      t = await this.getThrottle();
      x = Helper.lerp(t, p, lerp);
      this.sendData('throttle', x);
    }
    this.override(this.tPosSensor, false); // return throttle control to petal
    return 1;
  }
}
