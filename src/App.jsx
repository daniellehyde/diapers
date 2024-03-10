import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import diaperSizesKg from './diaperSizesKg.json'
import diaperSizesLb from './diaperSizesLb.json'


function age(birthday, measurementDate) {
  return Math.round((new Date(measurementDate) - new Date(birthday))/8.64e+7/30)
}
function findSize(weight, weightUnits) {
  const sizesThatFit = [];
  if (weightUnits === "kg") {
  diaperSizesKg.forEach((diaperSize) => {
    if (diaperSize.minWeight <= weight && weight < diaperSize.maxWeight) {
      sizesThatFit.push(diaperSize)
    }
  })}
  else {
    diaperSizesLb.forEach((diaperSize) => {
      if (diaperSize.minWeight <= weight && weight <= diaperSize.maxWeight) {
        sizesThatFit.push(diaperSize)
      }
  })}
  return sizesThatFit;
}

function App() {
  const [birthday, setBirthday] = useState('');
  const [sex, setSex] = useState('male');
  const [measurementDate, setMeasurementDate] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnits, setWeightUnits] = useState('kg');

  // {brand: Pamper, ...}
  // 
  const diaperSizeList = findSize(weight, weightUnits).map((diaperSize) => {
    return (
      <li>{diaperSize.brand} {diaperSize.size}</li>
    )
  });

  return (
    <>
      <div className="card">
        <label for="birthday">Birthday:</label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          required=""
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        >
        </input>

        <label for="sex">Sex:</label>
        <select
          id="sex"
          name="sex"
          value={sex}
          onChange={e => setSex(e.target.value)}
        >
          <option value="male" selected="">Male</option>
          <option value="female">Female</option>
        </select>

        <label for="measurementDate">Measurement Date:</label>
        <input 
          type="date"
          name="measurementDate"
          id="measurementDate"
          value={measurementDate}
          onChange={e => setMeasurementDate(e.target.value)}
        >
        </input>

        <label for="weight">Weight:</label>
        <input
          type="number"
          min="0"
          step="0.05"
          max="400"
          name="weight"
          id="weight"
          placeholder="Weight"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        >
        </input>
        <select
          id="weightUnits"
          name="weightUnits"
          value={weightUnits}
          onChange={e => setWeightUnits(e.target.value)}
        >
          <option value="lb">lb</option>
          <option value="kg" selected="">kg</option>
        </select>
      </div>
      <p>
        {birthday}<br></br>
        {sex}<br></br>
        {measurementDate}<br></br>
        {weight}{weightUnits}<br></br>
        {age(birthday, measurementDate)} months
      </p>

      <p>
        {diaperSizeList}
      </p>

    </>
  )
}

export default App
