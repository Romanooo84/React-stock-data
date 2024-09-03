import regression from 'regression';

export function linearRegression(yAxis) {
    let regressionData = []
    for (let i = 0; i < yAxis.length; i++){
        let regressionPoints = [i + 1, yAxis[i]]
        regressionData.push(regressionPoints)
    }
    const result = regression.linear(regressionData);
    const factorA = result.equation[0];
    const factorB = result.equation[1];
    let regYAxis = []
    for (let i = 0; i < yAxis.length; i++){
        regYAxis.push(factorA * i + factorB)
    }
    return regYAxis
}