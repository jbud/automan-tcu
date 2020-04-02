class Clutch {
  constructor(){
    this.bite = 0.5;
  }
  async engageLerp(lerp=0.125){
    let x,clutch=0.0;
    while (clutch <= 1){
      clutch = await canbus.getClutchPos()
      x = Helper.lerp(clutch, 1, lerp); //target is 100%
      canbus.sendData('clutch', x);
    }
    return 1;
  }
  async disengageLerp(lerp=0.125){
    let x,clutch=1.0;
    while (clutch !== 0){
      clutch = await canbus.getClutchPos()
      x = Helper.lerp(clutch, 0, lerp); //target is 0%
      canbus.sendData('clutch', x);
    }
    return 1;
  }

}
