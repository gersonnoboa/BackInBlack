import { ColorIndicators, Months } from "./general";

export class SingleChartData {
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

export class ColorScheme {
    domain: Array<string>;

    constructor(domain: Array<string>) {
        this.domain = domain
    }
}

class SingleChartElement {
    name: string;
    value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}