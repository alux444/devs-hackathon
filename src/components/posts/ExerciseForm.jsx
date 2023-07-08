import React, { useState } from "react";

const ExerciseForm = () => {
  const [sets, setSets] = useState([1]);

  const handleAddSet = () => {
    const newSets = [...sets];
    const lastSet = newSets[newSets.length - 1];
    newSets.push(lastSet + 1);
    setSets(newSets);
  };

  const handleRemoveSet = () => {
    if (sets.length > 1) {
      const newSets = [...sets];
      newSets.pop();
      setSets(newSets);
    }
  };

  const setsInputs = sets.map((set) => (
    <div key={set}>
      <label>Weight</label>
      <input type="number" />
      <label>Reps</label>
      <input type="number" />
    </div>
  ));

  return (
    <div className="flex gap-2 flex-col">
      <label>Exercise Name</label>
      <input type="text" />
      <div className="flex justify-center">
        <button onClick={handleAddSet}>Add Set</button>
        <button onClick={handleRemoveSet}>Remove Set</button>
      </div>
      {setsInputs}
    </div>
  );
};

export default ExerciseForm;
