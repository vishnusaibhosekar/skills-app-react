import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./skills.json";

function App() {
  // We assume skillsData is an object with a 'categories' array inside it
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : data.categories;
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleLearnedChange = (categoryId, skillId) => {
    const updatedCategories = categories.map((category) => {
      if (category.category === categoryId) {
        const updatedSkills = category.skills.map((skill) => {
          if (skill.id === skillId) {
            return { ...skill, learned: !skill.learned };
          }
          return skill;
        });
        return { ...category, skills: updatedSkills };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filterSkills = (skills) => {
    return skills.filter((skill) => {
      if (filter === "all") return true;
      return filter === "learned" ? skill.learned : !skill.learned;
    });
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
      {categories.map((category) => (
        <div key={category.category} className="category">
          <h2>{category.category}</h2>
          <div className="skills-grid">
            {filterSkills(category.skills).map((skill) => (
              <div
                key={skill.id}
                className={`skillItem ${skill.learned ? "learned" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={skill.learned}
                  onChange={() =>
                    handleLearnedChange(category.category, skill.id)
                  }
                />
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
