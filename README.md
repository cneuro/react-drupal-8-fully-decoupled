# Drupal 8 with fully decoupled React demo app

This code is **based on the Drupalize.Me [Get Started Using React and Drupal Together](https://drupalize.me/series/drupal-8-and-reactjs) series**, specifically a modified version of the repo at https://github.com/DrupalizeMe/react-and-drupal-examples.

The main changes are:
- removed the partially decoupled React app originally found under `/react-and-drupal-examples/drupal/web/themes/react_example_theme`
- full integration of [Material UI](https://material-ui.com/)
- removed certain React components that demonstrated intermediate tutorial progress (`NodeListOnly` & `NodeReadWriteReducer`)
- Added React HMR package [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- fixed React imports and installation for MacOS
- fixed `auth` and `utils` code to better comply with Drupal configs
- fixed and amended Drupal configs to work 'out of the box'
- various new components, Ui tweaks & code linting

The Drupal site config can be imported from the supplied gzipped archive. For details, refer to the import section on https://www.drupal.org/node/2416545.

## Drupal 8

The `/drupal` directory contains a Drupal 8 project with basic configuration for JSON:API, and to demonstrate embedding a React application inside a Drupal theme or module.

Install all the Drupal dependencies:

```bash
cd drupal
composer install
```

Then import the database snapshot in `drupal/backup.sql.gz`.

The default admin account is admin/admin. You can change this with `drush upwd admin {NEW_PASSWORD}`.

If you're using [ddev](https://ddev.readthedocs.io/en/stable/) this contains ddev configuration and can be started with:

```bash
cd drupal
# Start ddev.
ddev start
# Install/update composer dependencies.
ddev composer install
# Import the database snapshot.
ddev import-db --src=./backup.sql.gz
# Run any necessary database updates, and re-import config.
ddev exec "drush updb -y && drush cim -y && drush cr -y"
```

The `/drupal/web/themes/react\_example\_theme/` contains a custom theme with a React application embedded via the theme. This demonstrates using Webpack to bundle and transpile React/JavaScript files.

```bash
cd /drupal/web/themes/react_example_theme;
npm install
# Build the production JS files:
npm run build
# Build development JS files
npm run build:dev
# Start webpack in --watch mode while doing development
npm run start
# Start webpack in --watch mode with hot module reloading
# Requires some config to proxy requests to Drupal see .proxyrc
npm run start:hmr
```

## Decoupled React Application

The `/react-decoupled` directory contains an example decoupled React application built with create-react-app. It is built to interact with the API provided by Drupal 8 installed in `/drupal`.

To download dependencies and start the local development server run:

```bash
cd react-decoupled
yarn install
yarn run start
```

You might need to update some configuration to make sure it points to your local Drupal installation.
