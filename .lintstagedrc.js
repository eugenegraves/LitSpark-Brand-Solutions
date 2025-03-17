module.exports = {
  // Apply ESLint and Prettier to JavaScript and JSX files
  '*.{js,jsx}': ['prettier --write'],

  // Apply Prettier to other file types
  '*.{json,md,yaml,yml}': ['prettier --write'],

  // Apply Prettier to CSS files
  '*.css': ['prettier --write'],
};
