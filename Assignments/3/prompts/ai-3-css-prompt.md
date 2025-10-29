# AI-3 CSS Prompt

Generate a complete, validation-safe CSS stylesheet for a personal portfolio site that works with semantic HTML (nav, header, main, section, footer) and common section IDs (about, education, experience, projects, skills). The CSS must stand alone (no external frameworks), pass the W3C CSS Validator, and include responsive behavior, focus states, and at least one styled image. Keep selectors reasonably generic so it works with typical portfolio markup.

Design direction:
- Visual style: Clean "modern editorial" vibe, light theme by default
- Color palette:
  - Background: #f7f8fb
  - Panel/card: #ffffff
  - Text primary: #1a1d29
  - Text muted: #5a6376
  - Accent: #3b82f6
  - Border: #e4e7ee
- Typography:
  - System font stack (no external @import)
  - Clear hierarchy for h1–h3, comfortable line-height
- Spacing and radii:
  - Spacing scale (rem): 0.5, 1, 1.5, 2, 3
  - Card corners: 14px
  - Subtle shadows
- Layout:
  - Max content width ~1120px with generous side gutters
  - Mobile-first responsive
  - Projects grid: 1 col on phones, 2 on tablets (>=640px), 3 on desktops (>=1024px)
- Interactions & a11y:
  - Visible :focus styles for all interactive elements
  - Hover states for links, buttons, nav items
  - Smooth transitions for color/transform
- Components/sections to style:
  - Global container utilities
  - Top navigation (sticky), with active/hover states
  - Hero/intro block within header or first section
  - About, Education, Experience, Projects, Skills sections
  - Cards for projects/experience entries
  - Styled images (e.g., profile photo or project thumbnails): rounded corners, object-fit, subtle shadow
  - Footer
- Performance/validation:
  - No vendor-specific hacks
  - No external fonts or resets that break validation
  - Use CSS variables at :root
- Dark mode (optional):
  - Provide a minimal prefers-color-scheme: dark override using the same tokens

Output:
Return only the CSS file content, fully formed and ready to save as `ai-3.css`, including sensible comments for major sections. Avoid excessive specificity so it can coexist with other stylesheets switched via <link>.
