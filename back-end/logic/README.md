# LOGIC FOLDER

This folder contains **isolated functions** that implement core logic in the application.

## Purpose
These files should:
- Not interact with the file system, database, or external APIs directly
- Be easily **unit testable**

*Side-note: These files should contain a comment describing the location of said files in the project. Example:*
>// /tests/unit/mediaTypeChecker.test.js

## Testing
Each file here should have a corresponding test file in: *root*/tests/unit

### mediaTypeChecker.js
- **Purpose:** Determines whether a file MIME type corresponds to an image, audio, video, or text.
- **Usage:** Called by middleware to classify uploaded files.
- **Test File:** `/tests/unit/mediaTypeChecker.test.js`

### loginService.js
- **Purpose:** Handles submission of login credentials, setting token and navigating to application upon successful login
- **Usage:** Login function in Login.jsx
- **Test File:** `/tests/unit/loginService.test.js`

### roleAuth.js
- **Purpose:** Checks whether a user has the right priveleges to perform an operation
- **Usage:** Supplementary middleware to ensure hierarchy of priveleges pertaining CRUD operations
- **Test File:** `/tests/unit/roleAuth.test.js`