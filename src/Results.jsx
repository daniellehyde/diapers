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
    const {age, sex, inputtedWeight, weightUnits} = props

    function futureDiapers(monthsInFuture) {
        const percentile = percentileCalc(sex, age, inputtedWeight)
        const futureWeight = weightCalc(sex, percentile, age + monthsInFuture)

        return {
            date: measurementDate + monthsInFuture,
            ageInMonths: age + monthsInFuture,
            weight: futureWeight,
            diaperSizes: findSize(futureWeight, weightUnits)
        }
    }

    if (isNaN(age)) {
        return <></>
    }

    const diapersResults = futureDiapers(6)

    const diaperSizeList = diapersResults.diaperSizes.map((diaperSize) => {
        return (
          <li>{diaperSize.brand} {diaperSize.size}</li>
        )
      });

    return (
        <>
            <p>
                {diaperSizeList}
            </p>

            <p>
                {diapersResults.weight}
            </p>
        </>
    )

}

export default Results