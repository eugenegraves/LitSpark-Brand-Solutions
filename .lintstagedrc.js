module.exports = {
  // Apply ESLint and Prettier to JavaScript and JSX files
  // Exclude Next.js build files
  '*.{js,jsx}': filenames => {
    // Filter out files in the .next directory
    const filteredFiles = filenames.filter(file => !file.includes('.next'));
    if (filteredFiles.length === 0) return [];

    return [
      `prettier --write ${filteredFiles.join(' ')}`,
      // Only run ESLint on non-Next.js files
      filteredFiles.length > 0
        ? `eslint --fix ${filteredFiles.join(' ')}`
        : 'echo "No files to lint"',
    ];
  },

  // Apply Prettier to other file types
  '*.{json,md,yaml,yml}': ['prettier --write'],

  // Apply Prettier to CSS files
  '*.css': ['prettier --write'],
};
