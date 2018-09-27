# Drupal Webpack Setup Example
This repository provides a simple example how to build JS and CSS assets with webpack for a Drupal theme.
It uses Drupal's own behavior system, supports Hot Module Replacement (HMR) and compilation of SCSS
(in local dev mode by injection from JavaScript). In production/build mode, CSS is extracted in files.

## Setup

```
npm install
```

To start the dev server, run:
```
npm run start
```

The server runs at http://localhost:9000. But if you follow the configuration in `mytheme.libraries.yml`,
you can use it via your local Drupal URL, something like mydrupalsite.local. Because we define the
webpack dev server URL as an external library in Drupal, features like Hot Module Replacement will
work.


[Webpack loader for Drupal behaviors](https://github.com/dulnan/drupal-behaviors-loader)
[Webpack plugin for Drupal.t and Drupal.formatPlural translations](https://github.com/dulnan/drupal-behaviors-loader)