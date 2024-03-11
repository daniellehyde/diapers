import { useState } from 'react'
import './App.css'
import diaperSizesKg from './diaperSizesKg.json'
import diaperSizesLb from './diaperSizesLb.json'
import Results from './Results.jsx'


function age(birthday, measurementDate) {
  return Math.round((new Date(measurementDate) - new Date(birthday)) / 8.64e+7 / 30)
}

function App() {
  const [birthday, setBirthday] = useState('');
  const [sex, setSex] = useState('male');
  const [measurementDate, setMeasurementDate] = useState('');
  const [inputtedWeight, setWeight] = useState('');
  const [weightUnits, setWeightUnits] = useState('kg');
  const ageInMonths = age(birthday, measurementDate);

  return (
    <>
      <form>
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
          value={inputtedWeight}
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
      </form>
      <p>
        <Results age={ageInMonths} sex={sex} inputtedWeight={inputtedWeight} weightUnits={weightUnits} measurementDate={measurementDate}>
        
        </Results>
      </p>
    </>
  )
}

export default App
