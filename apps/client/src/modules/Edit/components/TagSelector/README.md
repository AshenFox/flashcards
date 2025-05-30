# TagSelector Component

A modern tag selector component built with React and react-select that allows users to manage tags with a beautiful UI matching the application's dark theme.

## Features

- ✅ Display tags as clickable buttons with delete functionality
- ✅ Edit existing tags by clicking on them
- ✅ Add new tags using the search/select input
- ✅ Search through available tag options
- ✅ Create new tags that don't exist in the options
- ✅ Keyboard navigation (Enter to save, Escape to cancel)
- ✅ Fully accessible with ARIA labels
- ✅ Responsive design for mobile devices
- ✅ Dark/light theme support

## Props

### TagSelectorProps

| Prop               | Type                       | Default          | Description                                    |
| ------------------ | -------------------------- | ---------------- | ---------------------------------------------- |
| `tags`             | `string[]`                 | `[]`             | Array of current tag strings                   |
| `availableOptions` | `string[]`                 | `[]`             | Array of available tag options for suggestions |
| `onChange`         | `(tags: string[]) => void` | `undefined`      | Callback fired when tags change                |
| `placeholder`      | `string`                   | `"Add a tag..."` | Placeholder text for the input field           |
| `disabled`         | `boolean`                  | `false`          | Whether the component is disabled              |

## Usage

```tsx
import React, { useState } from "react";
import { TagSelector } from "@modules/Edit/components/TagSelector";

const MyComponent = () => {
  const [tags, setTags] = useState<string[]>(["Math", "Science"]);
  const availableOptions = ["Physics", "Chemistry", "Biology", "History"];

  return (
    <TagSelector
      tags={tags}
      availableOptions={availableOptions}
      onChange={setTags}
      placeholder="Add a tag..."
    />
  );
};
```

## Interactions

1. **View Tags**: Tags are displayed as rounded buttons with the tag name and a delete (×) button
2. **Delete Tags**: Click the × button on any tag to remove it
3. **Edit Tags**: Click on a tag button to edit its text in the input field
4. **Add New Tags**: Type in the input field and either:
   - Select from the dropdown of available options
   - Press Enter to create a new tag
   - Select a "Create [tagname]" option from the dropdown
5. **Cancel Editing**: Press Escape while editing to cancel and clear the input

## Styling

The component uses CSS modules and supports both light and dark themes through CSS custom properties. The design matches the application's existing theme with:

- Golden/yellow accent colors (`--active-color`)
- Dark theme with appropriate contrast
- Smooth transitions and hover effects
- Responsive design for mobile devices

## Example Component

See `TagSelectorExample.tsx` for a complete working example with state management and available options.
