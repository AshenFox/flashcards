import React, { useState } from "react";

import styles from "./styles.module.scss";
import TagSelector from "./TagSelector";
import { TagOption } from "./types";

const TagSelectorExample: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
  ]);

  const availableTags: TagOption[] = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
    { value: "sass", label: "Sass" },
    { value: "somerandomtag1", label: "Some Random Tag 1" },
  ];

  const handleTagsChange = (tags: TagOption[]) => {
    setSelectedTags(tags);
    console.log("Tags changed:", tags);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TagSelector Component Demo</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Interactive Tag Selector</h3>
        <p
          className={styles.description}
          onClick={() => {
            console.log("clicked");
          }}
        >
          • Select from existing tags or create new ones
          <br />
          • Click on any selected tag to edit it inline
          <br />
          • Press Enter to save, Escape to cancel editing
          <br />• Use backspace or click the × to remove tags
        </p>

        <TagSelector
          initialTags={selectedTags}
          availableTags={availableTags}
          onTagsChange={handleTagsChange}
          placeholder="Select or create tags..."
        />
      </div>

      <div className={styles.resultsSection}>
        <h4 className={styles.resultsTitle}>Current Selected Tags:</h4>
        <pre className={styles.jsonOutput}>
          {JSON.stringify(selectedTags, null, 2)}
        </pre>
      </div>

      <div className={styles.featuresSection}>
        <h4 className={styles.featuresTitle}>Features Demonstrated:</h4>
        <ul className={styles.featuresList}>
          <li>Multi-select functionality</li>
          <li>Create new tags by typing</li>
          <li>Click to edit existing tags inline</li>
          <li>Keyboard navigation (Enter/Escape)</li>
          <li>Custom styling with hover effects</li>
          <li>TypeScript support</li>
          <li>Controlled component with state management</li>
        </ul>
      </div>
    </div>
  );
};

export default TagSelectorExample;
