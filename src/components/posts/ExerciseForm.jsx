import React, { useState } from "react";

const ExerciseForm = ({ submit, exit }) => {
  const [sets, setSets] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [thisSet, setThisSet] = useState({ weight: 0, reps: 0, units: "kg" });

  const handleName = (e) => {
    if (e.target.value.length < 40) {
      setName(e.target.value);
    }
  };

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
    setMessage("");

    if (name == "") {
      setMessage("Exercise name required.");
      return;
    }

    const exercise = { name: name, sets: sets };
    submit(exercise);
    exit();
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
    <div className="flex gap-2 flex-col items-center max-w-[70vw]">
      <label>Exercise Name</label>
      <input type="text" value={name} onChange={handleName} />
      {mappedSets}
      <div className="flex flex-wrap gap-2 w-full border-[2] justify-center">
        <div className="flex flex-col gap-2 w-[33%]">
          <label>Weight</label>
          <input type="number" onChange={handleWeightChange} />
        </div>
        <div className="flex flex-col gap-2 w-[33%]">
          <label>Reps</label>
          <input type="number" onChange={handleRepsChange} />
        </div>
        <div className="flex flex-col gap-2 w-[15%]">
          <label>Units</label>
          <select onChange={handleUnitChange}>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={handleAddSet}>Add Set</button>
      </div>
      <button className="w-[50%]" onClick={handleSubmit}>
        Submit
      </button>
      {message}
    </div>
  );
};

export default ExerciseForm;
