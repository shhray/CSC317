**Name:** Shreya Rameshwar 
**Student ID:** 923263208

## Links

- GitHub Repository: https://github.com/shhray
- Live GitHub Pages (Assignment 4): https://shhray.github.io/CSC317/assignments/4

## Implementation Overview

I followed the required folder structure under assignments/4.  
The main portfolio is in `index.html` and uses `styles/styles.css` and `scripts/script.js`.  
The calculator is in `calculator.html` with its own CSS and JS files. I used a grid layout for the buttons and a simple display area. The JavaScript tracks the current value, previous value, and the active operator. I added functions for numbers, decimal, clear, percent, sign toggle, and equals. The calculator also supports keyboard input. For the extra credit, I implemented a theme toggle and memory functions (M+, M-, MR, MC).

## Challenges

One challenge was keeping track of state when chaining multiple operations. I fixed it by updating `previousValue` only after running `performOperation`. Another challenge was handling decimal input without letting the user add multiple dots. Keyboard support also took a bit of time, but once I mapped each key to the existing functions it became simpler.

## Extra Features

- Theme switcher that toggles between a dark theme and a light theme on the calculator.
- Memory functions (MC, MR, M+, M-) with a small "M" indicator when memory is not zero.

## Acknowledgments

I used the course materials and MDN Web Docs as references. I also used AI tools to help me plan the steps and double check my logic.
