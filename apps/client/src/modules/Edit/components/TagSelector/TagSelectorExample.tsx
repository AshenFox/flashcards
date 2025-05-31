import React, { useState } from "react";

import TagSelector from "./TagSelector";

const TagSelectorExample: React.FC = () => {
  const [tags, setTags] = useState<string[]>([
    "Math::Algebra",
    "Science::Physics::Quantum",
    "History::Ancient::Egypt",
    "Programming::JavaScript::React",
  ]);
  const [availableOptions] = useState<string[]>([
    // Single level tags
    "Art",
    "Music",
    "Philosophy",

    // Two-level hierarchy
    "Math::Geometry",
    "Math::Calculus",
    "Math::Statistics",
    "Science::Chemistry",
    "Science::Biology",
    "History::World",
    "History::American",
    "Literature::Classic",
    "Literature::Modern",
    "Geography::Physical",
    "Geography::Human",

    // Three-level hierarchy
    "Programming::JavaScript::Vue",
    "Programming::JavaScript::Angular",
    "Programming::Python::Django",
    "Programming::Python::Flask",
    "Science::Physics::Classical",
    "Science::Physics::Modern",
    "Science::Chemistry::Organic",
    "Science::Chemistry::Inorganic",
    "History::Ancient::Greece",
    "History::Ancient::Rome",
    "History::Medieval::Europe",
    "History::Medieval::Asia",

    // Four-level hierarchy examples
    "Programming::Web::Frontend::CSS",
    "Programming::Web::Frontend::HTML",
    "Programming::Web::Backend::Node",
    "Programming::Web::Backend::Express",
    "Science::Biology::Molecular::DNA",
    "Science::Biology::Molecular::RNA",
    "Academic::University::Computer Science::Algorithms",
    "Academic::University::Computer Science::Data Structures",
  ]);

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    console.log("Tags updated:", newTags);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "var(--text-color)", marginBottom: "1rem" }}>
          TagSelector Demo - Hierarchical Tags
        </h2>
        <p style={{ color: "var(--subtle-text-color)", marginBottom: "2rem" }}>
          • Click on existing tags to edit them (notice the hierarchy display!)
          <br />
          • Click the × button to delete tags
          <br />
          • Type in the input to see hierarchical options in dropdown
          <br />
          • Use spaces in your input - they&apos;ll automatically convert to
          &quot;::&quot; for hierarchy
          <br />
          • Press Enter or select from dropdown to add/edit tags
          <br />• Try creating: &quot;Subject Space Topic&quot; → becomes
          &quot;Subject::Topic&quot;
        </p>
      </div>

      <TagSelector
        tags={tags}
        availableOptions={availableOptions}
        onChange={handleTagsChange}
        placeholder="Add a hierarchical tag..."
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
          Available Hierarchical Options (filtered):
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

export default TagSelectorExample;
