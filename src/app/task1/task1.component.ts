import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.css']
})
export class Task1Component implements OnInit {
  
  chartData: SingleChartData;

  constructor() { }

  ngOnInit() {
    this.generateData();
  }

  generateData() {
    console.log("generating data");
    let gtv = this.getGTV();
    let chartData = new SingleChartData();
    chartData.xAxis = gtv.xUnit;
    chartData.yAxis = gtv.yUnit;
    chartData.maxValue = gtv.target;
    chartData.thresholdValue = gtv.target;
    chartData.setValues(gtv.getSingleResultsWithMonth());
    this.chartData = chartData;
  }

  getGTV() {
    let gtv = new KPI();
    gtv.name = "GTV";
    gtv.target = 100000000;
    gtv.yUnit = "€";
    gtv.xUnit = "Month";
    gtv.results = [
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

    return gtv;
  }
}

class SingleChartData {
  xAxis: string;
  yAxis: string;
  maxValue: number;
  thresholdValue: number;
  values: Array<SingleChartElement>;
  colorScheme: ColorScheme;
  lastValue: number;
  lastColorScheme: ColorScheme;

  setValues(values) {
    this.values = values;
    this.colorScheme = this.getColorScheme();
    this.lastValue = this.getLastValue();
    this.lastColorScheme = this.getLastColorScheme();
  }

  getColorScheme() {
    console.log("getting color scheme");
    let domain = [];
    this.values.forEach(element => {
      let aboveThreshold = this.compareValueWithThreshold(element.value);
      domain.push(this.getColorForThresholdStatus(aboveThreshold));
    });
    let colorScheme = new ColorScheme(domain);
    return colorScheme;
  }

  getLastColorScheme() {
    let aboveThreshold = this.compareValueWithThreshold(this.getLastValue());
    let domain = [this.getColorForThresholdStatus(aboveThreshold)];
    return new ColorScheme(domain);
  }

  getLastValue() {
    let resultsLength = this.values.length;
    if (resultsLength < 1) return 0;

    let lastValue = this.values[resultsLength - 1];
    return lastValue.value;
  }

  private compareValueWithThreshold(value) {
    return value > this.thresholdValue;
  }

  private getColorForThresholdStatus(aboveThreshold) {
    return aboveThreshold ? ColorIndicators.aboveThreshold : ColorIndicators.belowThreshold;
  }
}

class ColorScheme {
  domain: Array<string>;

  constructor(domain: Array<string>){
    this.domain = domain
  }
}

class SingleChartElement {
  name: string;
  value: number;

  constructor(name: string, value: number){
    this.name = name;
    this.value = value;
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

  getSingleResultsWithMonth() {
    let results = this.results;

    // if (this.results.length == 0) {
    //   return [];
    // } 
    // else 
    if (this.results.length > 12) {
      results = this.results.slice(0, 11);
    }

    let months = Months.getMonths();

    let singleData = new Array<SingleChartElement>();

    for (let index = 0; index < results.length; index++) {
      const month = months[index];
      const element = results[index];
      singleData.push(new SingleChartElement(month, element));
    }

    return singleData;
  }
}

class Months {
  static getMonths() {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }
}

class ColorIndicators {
  static aboveThreshold = "#5AA454";
  static belowThreshold = "#A10A28";
}