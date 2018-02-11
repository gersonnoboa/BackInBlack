import { Injectable } from '@angular/core';

@Injectable()
export class Task1Service {

  currentMonth = 0;

  results = [
    3068985,
    4979041,
    5110147,
    10038063,
    20480972,
    32864163,
    39112224,
    58878404,
    62686337,
    79203356,
    87848175,
    102627643
  ];
  constructor() { }

  getGTV() {
    if (this.currentMonth == 12) return null;
    this.currentMonth++;

    let gtv = new KPI();
    gtv.name = "GTV";
    gtv.target = 100000000;
    gtv.yUnit = "Euros (€)";
    gtv.xUnit = "Month";
    gtv.results = this.results.slice(0, this.currentMonth);
    return gtv;
  }
}

class KPI {
  name: string;
  target: number;
  yUnit: string;
  xUnit: string;
  results: Array<number>;

  lastPercentageCompleted() {
    let resultsLength = this.results.length;
    if (resultsLength < 1) return 0;

    let lastValue = this.results[resultsLength - 1];
    let percentage = lastValue / this.target;

    if (percentage > 1.0) {
      return 100;
    }
    else {
      return percentage * 100;
    }
  }
}