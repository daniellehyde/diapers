import { percentileCalc, weightCalc } from './growthCalc.js'
import diaperSizesKg from './diaperSizesKg.json'
import diaperSizesLb from './diaperSizesLb.json'

const ALL_BRANDS = ["Pampers", "Huggies", "Hello Bello", "Millie Moon", "Kirkland", "Rascal and Friends"]

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

function groupByBrand(sizesThatFit) {
    const results = {};
    sizesThatFit.forEach((diaperSize) => {
        if (results[diaperSize.brand]) {
            results[diaperSize.brand].push(diaperSize.size)
        }
        else {
            results[diaperSize.brand] = [diaperSize.size]
        }
    })
    return results;
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
            diaperSizes: groupByBrand(findSize(futureWeight, weightUnits))
        }
    }

    if (isNaN(age)) {
        return <></>
    }

    const allTheResults = [
        futureDiapers(0), futureDiapers(1), futureDiapers(2), futureDiapers(3), futureDiapers(4),
        futureDiapers(5), futureDiapers(6)
    ]

    const diaperTableHeadings = (['Date', 'Month', 'Weight', ...ALL_BRANDS]).map((heading) => {
        return (
            <th>{heading}</th>
        )
    })

    const diaperTableRows = allTheResults.map((diapersResults) => {
        const diaperSizeCells = ALL_BRANDS.map((brand) => {
            const sizes = diapersResults.diaperSizes[brand] || [];
            const cellContents = sizes.map(size => {
                return (<div>{size}</div>)
            })

            return (
                <td>
                    {cellContents}
                </td>
            )
        })


        return (
            <tr>
                <td>{diapersResults.date}</td>
                <td>{diapersResults.ageInMonths}</td>
                <td>{diapersResults.weight}</td>
                {diaperSizeCells}
            </tr>
        )
    });

    return (
        <>
            <table className="rounded-corners">
                <thead>
                <tr>
                    {diaperTableHeadings}
                </tr>
                </thead>
                {diaperTableRows}
            </table>
        </>
    )

}

export default Results