module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-console": [0],
    "no-restricted-globals": [0],
    "import/no-unresolved": [0],
    "import/extensions": [
      0,
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
};