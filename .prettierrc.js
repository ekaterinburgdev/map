module.exports = {
  printWidth: 100,
  trailingComma: 'all',
  useTabs: false,
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  bracketSameLine: false,
  overrides: [
    {
      files: ['*.json', '*.yaml'],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
