import React, { useState } from "react";

const ExerciseForm = () => {
  const [sets, setSets] = useState([]);
  const [thisSet, setThisSet] = useState({ weight: 0, reps: 0, units: "kg" });

  const handleAddSet = () => {
    const newSets = [...sets, thisSet];
    setSets(newSets);
  };

  const handleRemoveSet = (index) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
  };

  const handleWeightChange = (event) => {
    const { value } = event.target;
    const tempset = { ...thisSet, weight: value };
    setThisSet(tempset);
  };

  const handleRepsChange = (event) => {
    const { value } = event.target;
    const tempset = { ...thisSet, reps: value };
    setThisSet(tempset);
  };

  const handleUnitChange = (event) => {
    const tempset = { ...thisSet, units: event.target.value };
    setThisSet(tempset);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sets);
  };

  const mappedSets = sets.map((set, index) => (
    <div
      className="flex gap-3 flex-wrap justify-center align-center items-center"
      key={index}
    >
      <small>
        {set.weight}
        {set.units} x {set.reps}
      </small>
      <button onClick={() => handleRemoveSet(index)}>x</button>
    </div>
  ));

  return (
    <div className="flex gap-2 flex-col">
      {mappedSets}
      <div>
        <label>Weight</label>
        <input type="number" onChange={handleWeightChange} />
        <label>Reps</label>
        <input type="number" onChange={handleRepsChange} />
        <label>Units</label>
        <select onChange={handleUnitChange}>
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button onClick={handleAddSet}>Add Set</button>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ExerciseForm;
