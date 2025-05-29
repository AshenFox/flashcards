import React, { useState } from "react";

import TagSelector2 from "./TagSelector2";

const TagSelector2Example: React.FC = () => {
  const [tags, setTags] = useState<string[]>(["Math", "Science", "History"]);
  const [availableOptions] = useState<string[]>([
    "Algebra",
    "Geometry",
    "Physics",
    "Chemistry",
    "Biology",
    "World History",
    "American History",
    "Literature",
    "Geography",
    "Calculus",
    "Statistics",
    "Art",
    "Music",
    "Philosophy",
  ]);

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    console.log("Tags updated:", newTags);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "var(--text-color)", marginBottom: "1rem" }}>
          TagSelector2 Demo
        </h2>
        <p style={{ color: "var(--subtle-text-color)", marginBottom: "2rem" }}>
          • Click on existing tags to edit them
          <br />
          • Click the × button to delete tags
          <br />
          • Type in the input to see available options or create new tags
          <br />• Press Enter or select from dropdown to add/edit tags
        </p>
      </div>

      <TagSelector2
        tags={tags}
        availableOptions={availableOptions}
        onChange={handleTagsChange}
        placeholder="Add a tag..."
      />

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "var(--element-background-color)",
          border: "1px solid var(--element-border-color)",
          borderRadius: "0.5rem",
        }}
      >
        <h4 style={{ color: "var(--text-color)", marginBottom: "1rem" }}>
          Current Tags ({tags.length}):
        </h4>
        <pre style={{ color: "var(--text-color)", fontSize: "1.2rem" }}>
          {JSON.stringify(tags, null, 2)}
        </pre>
      </div>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: "var(--element-background-color)",
          border: "1px solid var(--element-border-color)",
          borderRadius: "0.5rem",
        }}
      >
        <h4 style={{ color: "var(--text-color)", marginBottom: "1rem" }}>
          Available Options (filtered):
        </h4>
        <div style={{ color: "var(--subtle-text-color)", fontSize: "1.2rem" }}>
          {availableOptions
            .filter(option => !tags.includes(option))
            .map(option => (
              <span
                key={option}
                style={{
                  display: "inline-block",
                  padding: "0.2rem 0.5rem",
                  margin: "0.2rem",
                  backgroundColor: "var(--tag-background-color)",
                  borderRadius: "0.3rem",
                  fontSize: "1rem",
                }}
              >
                {option}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TagSelector2Example;
