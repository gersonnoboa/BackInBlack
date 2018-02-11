import { Injectable } from '@angular/core';
import { KPI } from '../classes/kpi';

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