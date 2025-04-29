# LOGIC FOLDER

This folder contains **pure, isolated, reusable functions** that implement core logic in the application.

## Purpose
These files should:
- Be free of Express-specific objects like `req` or `res`
- Not interact with the file system, database, or external APIs directly
- Be easily **unit testable** and predictable

*Side-note: These files should contain a comment describing the location of said files in the project. Example:*
>// /tests/unit/mediaTypeChecker.test.js

## Examples of logic placed here...
- Determining media type from a MIME string
- Generating filenames
- Validating inputs
- Performing calculations (e.g., pricing, scoring)

## Testing
Each file here should have a corresponding test file in: *root*/tests/unit

### mediaTypeChecker.js

- **Purpose:** Determines whether a file MIME type corresponds to an image, audio, video, or text.
- **Usage:** Called by middleware to classify uploaded files.
- **Test File:** `/tests/unit/mediaTypeChecker.test.js`