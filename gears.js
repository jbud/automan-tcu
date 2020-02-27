class Gears {
  constructor(){
    this.gears = {
      REVERSE:  0,
      FIRST:    1,
      SECOND:   2,
      THIRD:    3,
      FOURTH:   4,
      FIFTH:    5,
      SIXTH:    6,
      NEUTRAL: -1
    };



    this.tirespecs = {
      WDIAMETER: 17,
      ASPECT: 55,
      WIDTH: 255
    };
    this.ratios = {
      FINAL: 2.89,
      0: -3.39,
      1: 4.21,
      2: 2.64,
      3: 1.80,
      4: 1.39,
      5: 1,
      6: 0.77

    };
    this.minspeeds = {
      0: 0, // Hard code these values
      1: 0,   // Hard code these values
      2: 0,  // Hard code these values
      3: (this.tireHeight() * Ecudata.MINRPM * 0.002975) / (this.ratios.FINAL * this.ratios.THIRD),
      4: (this.tireHeight() * Ecudata.MINRPM * 0.002975) / (this.ratios.FINAL * this.ratios.FOURTH),
      5: (this.tireHeight() * Ecudata.MINRPM * 0.002975) / (this.ratios.FINAL * this.ratios.FIFTH),
      6: (this.tireHeight() * Ecudata.MINRPM * 0.002975) / (this.ratios.FINAL * this.ratios.SIXTH)
    };
    this.maxspeeds = {
      0: (this.tireHeight() * Ecudata.REDLINE * 0.002975) / (this.ratios.FINAL * this.ratios.REVERSE),
      1: (this.tireHeight() * Ecudata.REDLINE * 0.002975) / (this.ratios.FINAL * this.ratios.FIRST),
      2: (this.tireHeight() * Ecudata.REDLINE * 0.002975) / (this.ratios.FINAL * this.ratios.SECOND),
      3: (this.tireHeight() * Ecudata.REDLINE * 0.002975) / (this.ratios.FINAL * this.ratios.THIRD),
      4: (this.tireHeight() * Ecudata.REDLINE * 0.002975) / (this.ratios.FINAL * this.ratios.FOURTH),
      5: (this.tireHeight() * Ecudata.REDLINE * 0.002975) / (this.ratios.FINAL * this.ratios.FIFTH),
      6: (this.tireHeight() * Ecudata.REDLINE * 0.002975) / (this.ratios.FINAL * this.ratios.SIXTH)
    };
  }
  tireHeight(){
    return (this.tirespecs.WIDTH / 25.4 * this.tirespecs.ASPECT / 100 * 2) + this.tirespecs.WDIAMETER;
  }

  calculateRevMatch(shift){
    let ratio = this.ratios[shift];
    let mph = Ecudata.CURRENTMPH;
    let rpm = Math.round((((mph * ratio) * this.ratios.FINAL) / 0.002975) / this.tireHeight());
    return (rpm > 0) ? rpm : false;
  }
}
