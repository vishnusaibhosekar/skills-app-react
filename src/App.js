import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure you have an App.css file with styles in the src directory
import skillsData from "./skills.json"; // Your skills.json file in the src directory

function App() {
  const [skills, setSkills] = useState(() => {
    // Load skills from Local Storage or use initial data from skills.json
    const savedSkills = localStorage.getItem("skills");
    return savedSkills ? JSON.parse(savedSkills) : skillsData.skills;
  });

  const [filter, setFilter] = useState("all"); // 'all', 'learned', or 'unlearned'

  // Update Local Storage when skills state changes
  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const handleLearnedChange = (id) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.id === id) {
        return { ...skill, learned: !skill.learned };
      }
      return skill;
    });
    setSkills(updatedSkills);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1>Skills Tracker</h1>
        <div>
          <button onClick={() => handleFilterChange("all")}>All</button>
          <button onClick={() => handleFilterChange("learned")}>Learned</button>
          <button onClick={() => handleFilterChange("unlearned")}>
            Unlearned
          </button>
        </div>
      </div>
      <ul>
        {skills
          .filter((skill) => {
            if (filter === "all") return true;
            return filter === "learned" ? skill.learned : !skill.learned;
          })
          .map((skill) => (
            <li
              key={skill.id}
              className={`skillItem ${skill.learned ? "learned" : ""}`}
            >
              <input
                type="checkbox"
                checked={skill.learned}
                onChange={() => handleLearnedChange(skill.id)}
              />
              {skill.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
