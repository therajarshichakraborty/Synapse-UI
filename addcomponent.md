Here are the exact, step-by-step instructions for adding components to your library. It depends on whether you are adding a new variation to an existing category (like a second message UI) or creating a completely new category (like tables or sidebars).

Scenario A: Adding a new component to an EXISTING category
(Example: Adding message-02.tsx to the existing Messages category)

Create the Component: Put your new file inside the existing folder: src/components/synapse-ui-components/messages/message-02.tsx
Rebuild the Registry: Open your terminal and run:
bash
node scripts/build-registry.mjs
(This automatically scans your new file, updates registry.tsx, and generates the public/r/message-02.json file for the CLI).
Done! Because the message.mdx documentation page already exists, your new component will automatically show up there.
Scenario B: Creating a COMPLETELY NEW category
(Example: Adding tables/table-01.tsx)

Create the Folder & File: Create a new folder in your components directory and add your file: src/components/synapse-ui-components/tables/table-01.tsx

Map the Category in the Build Script: Open scripts/build-registry.mjs and find the CATEGORY_MAP (around line 22). Add your new folder name and its singular category name:

javascript
const CATEGORY_MAP = {
  // ... existing categories ...
  tables: "table", // <-- Add this
};
Update the TypeScript Types in the Build Script: Scroll down to the bottom of scripts/build-registry.mjs (around line 634) where the DemoCategory type is hardcoded as a string, and add your new category:

javascript
export type DemoCategory =
  | "ai-input"
  // ... existing types ...
  | "message"
  | "table" // <-- Add this
  | "useAutoResizeTextarea";
Rebuild the Registry: Open your terminal and run:

bash
node scripts/build-registry.mjs
Create the Documentation Page: Create a new file at src/content/docs/components/table.mdx and add the following:

mdx
---
title: Tables
description: Data table components.
---
# Tables
<ComponentShowcase category="table" />
Add to the Docs Sidebar: Open src/content/docs/components/meta.json and add your category to the list so it appears in the navigation menu:

json
{
  "title": "Components",
  "pages": [
    // ... existing items ...
    "message",
    "table"
  ]
}
Summary: If it's just a new file in an existing folder, just drop it in and run the node script. If it's a brand new category, you have to map the category, update the types, run the script, and create the .mdx doc page!

5:10 PM
