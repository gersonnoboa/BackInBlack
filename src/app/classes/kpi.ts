export class KPI {
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