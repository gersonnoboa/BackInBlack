import { Component, OnInit } from '@angular/core';
import { Task1Service } from './task1.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.css']
})
export class Task1Component implements OnInit {
  
  chartData: SingleChartData;
  private subscription: Subscription;

  constructor(private service: Task1Service) { }

  ngOnInit() {
    this.generateData();
    let timer = Observable.timer(5000, 2000);
    this.subscription = timer.subscribe(t=> {
      if (!this.updateData()){
        this.subscription.unsubscribe();
      }
    })
  }

  generateData() {
    let gtv = this.service.getGTV();
    let chartData = new SingleChartData();
    chartData.xAxis = gtv.xUnit;
    chartData.yAxis = gtv.yUnit;
    chartData.maxValue = gtv.target;
    chartData.thresholdValue = gtv.target;
    chartData.setValues(gtv.results);
    this.chartData = chartData;

    return true;
  }

  updateData() {
    let gtv = this.service.getGTV();
    if (gtv == null) return false;

    this.chartData.setValues(gtv.results);
    return true;
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
    this.values = this.getSingleResultsWithMonth(values);
    this.colorScheme = this.getColorScheme();
    this.lastValue = this.getLastValue();
    this.lastColorScheme = this.getLastColorScheme();
  }

  getSingleResultsWithMonth(values) {
    let results = values;

    if (values.length > 12) {
      results = values.slice(0, 11);
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

  getColorScheme() {
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

class ColorIndicators {
  static aboveThreshold = "#5AA454";
  static belowThreshold = "#A10A28";
}

class Months {
  static getMonths() {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }
}