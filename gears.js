class Gears {
  constructor(){
    this.gears = {
      REVERSE,
      FIRST,
      SECOND,
      THIRD,
      FOURTH,
      FIFTH,
      SIXTH
    };


    this.minspeeds = {
      REVERSE: 0,
      FIRST: 0,
      SECOND: 0,
      THIRD: 15,
      FOURTH: 20,
      FIFTH: 30,
      SIXTH: 45
    };
    this.maxspeeds = {
      REVERSE: undefined, //TODO
      FIRST: 40,
      SECOND: 55,
      THIRD: 85,
      FOURTH: undefined,  //TODO
      FIFTH: undefined,   //TODO
      SIXTH: undefined    //TODO
    };
    this.tirespecs = {
      WDIAMETER: 17,
      ASPECT: 55,
      WIDTH: 255
    };
    this.ratios = {
      FINAL: 2.89,
      REVERSE: 3.39,
      FIRST: 4.21,
      SECOND: 2.64,
      THIRD: 1.80,
      FOURTH: 1.39,
      FIFTH: 1,
      SIXTH: 0.77

    };
  }
  tireHeight(){
    return (this.tirespecs.WIDTH / 25.4 * this.tirespecs.ASPECT / 100 * 2) + this.tirespecs.WDIAMETER;
  }

  calculateRevMatch(shift){
    let ratio = this.ratios[shift];
    let mph = Ecudata.CURRENTMPH;

    return (((mph * ratio) * this.ratios.FINAL) / 0.002975) / this.tireHeight();
  }
}
