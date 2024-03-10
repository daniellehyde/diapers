import maleGrowthChart from './maleGrowthChart.json'
import femaleGrowthChart from './femaleGrowthChart.json'

function distributionParams(sex, age) {
    if (sex === "male") {
        return maleGrowthChart.find((d) => {
            return age === d.month
        })
    }
    if (sex === "female") {
        return femaleGrowthChart.find((d) => {
            return age === d.month
        })
    }
}

export function percentileCalc(sex, age, weight) {
    const {l, m, s} = distributionParams(sex, age);
    return ( (weight/m)**l - 1)/(l * s)

}

export function weightCalc(sex, percentile, age) {
    const {l, m, s} = distributionParams(sex, age);
    return (m * (1 + l * s * percentile)**(1/l))
}
