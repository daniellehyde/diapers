import { percentileCalc, weightCalc } from './growthCalc.js'
import diaperSizesKg from './diaperSizesKg.json'
import diaperSizesLb from './diaperSizesLb.json'

function findSize(weight, weightUnits) {
    const sizesThatFit = [];
    if (weightUnits === "kg") {
        diaperSizesKg.forEach((diaperSize) => {
            if (diaperSize.minWeight <= weight && weight < diaperSize.maxWeight) {
                sizesThatFit.push(diaperSize)
            }
        })
    }
    else {
        diaperSizesLb.forEach((diaperSize) => {
            if (diaperSize.minWeight <= weight && weight <= diaperSize.maxWeight) {
                sizesThatFit.push(diaperSize)
            }
        })
    }
    return sizesThatFit;
}


function Results(props) {
    const { age, sex, inputtedWeight, weightUnits, measurementDate } = props

    function futureDiapers(monthsInFuture) {
        const percentile = percentileCalc(sex, age, inputtedWeight)
        const futureWeight = weightCalc(sex, percentile, age + monthsInFuture)

        return {
            date: new Date((monthsInFuture * 30 * 8.64e+7) + new Date(measurementDate).getTime()).toDateString(),
            ageInMonths: age + monthsInFuture,
            weight: (futureWeight).toFixed(1),
            diaperSizes: findSize(futureWeight, weightUnits)
        }
    }

    if (isNaN(age)) {
        return <></>
    }

    const allTheResults = [
            futureDiapers(0), futureDiapers(1), futureDiapers(2), futureDiapers(3), futureDiapers(4), 
            futureDiapers(5), futureDiapers(6)
        ]

    const diaperTableRows = allTheResults.map((diapersResults) => {
        const diaperSizeList = diapersResults.diaperSizes.map((diaperSize) => {
            return (
                <li>{diaperSize.brand} {diaperSize.size}</li>
            )
        });

        return (
            <tr>
                <td>{diapersResults.date}</td>
                <td>{diapersResults.ageInMonths}</td>
                <td>{diapersResults.weight}</td>
                <td>{diaperSizeList}</td>
            </tr>
        )
    });

    return (
        <>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Month</th>
                    <th>Weight</th>
                    <th>Diapers</th>
                </tr>
                {diaperTableRows}
            </table>
        </>
    )

}

export default Results