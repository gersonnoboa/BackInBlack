import { Component, OnInit } from '@angular/core';
import { Task1Service } from './task1.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { SingleChartData } from '../classes/single-chart-data';

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
    this.subscription = timer.subscribe(t => {
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