# Python Adventure Quest

## Current State
New project, no existing application files.

## Requested Changes (Diff)

### Add
- A Python coding quiz game with multiple levels
- Each level has Python questions (multiple choice or fill-in-the-blank)
- XP system: correct answers earn points
- Progress tracker showing current level and XP
- Simple win/fail feedback per question
- A few themed worlds (Basics, Functions, Loops, etc.) each with 3-5 questions

### Modify
N/A

### Remove
- Admin/management panel (too complex, out of scope for simplified version)

## Implementation Plan
1. Backend: store puzzle data (worlds, questions, answers), track player progress (XP, current level) per session
2. Frontend: world selection screen, question screen with answer input, XP/level display, results feedback
