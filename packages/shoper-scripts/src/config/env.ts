import * as fs from 'fs';
import { URL } from 'url';
import * as dotenv from 'dotenv';
import { argv } from 'yargs';
import { paths } from './';

if ((!fs.existsSync(paths.envFile))) console.warn(
    'To enable full functionality of development environment create ".env" file.'
  );

const themePackageJsonFile = (!fs.existsSync(paths.themePackageJsonFile)) ? {} : JSON.parse(fs.readFileSync(paths.themePackageJsonFile).toString());

/**
 * Parse .env file and for now do not pass them to process.env.
 * If .env file is not defined then setup empty object.
 */
export const environmentConfig: dotenv.DotenvParseOutput = (!fs.existsSync(paths.envFile)) ? {} : dotenv.parse(fs.readFileSync(paths.envFile));

/**
 * Check is WebDav credentials are specified, otherwise block deploy tasks.
 */
if ( !environmentConfig.WEBDAV_HOSTNAME || !environmentConfig.WEBDAV_USER || !environmentConfig.WEBDAV_PASSWORD ) {
  console.warn(`Missing deploy credentials in .env file. With current setup you will work only locally!`);
}

/**
 * Sanitize shop URL variable.
 */
if (environmentConfig.SHOP_URL) {
  const shopUrl: URL = new URL(environmentConfig.SHOP_URL);
  environmentConfig.SHOP_URL = shopUrl.href;
  environmentConfig.SHOP_HOSTNAME = shopUrl.hostname;
}

/**
 * Set default environment variables.
 */
if (argv.development || (argv.mode && argv.mode === 'development')) environmentConfig.NODE_ENV = 'development';
else environmentConfig.NODE_ENV = 'production';

const makeSlug = (inputText: string): string => {
  return inputText.toLowerCase().replace(/\W+/, '-').trim();
};

/**
 * Add project name to environment config.
 */
let projectName: string = themePackageJsonFile.name || 'custom-theme';
if (themePackageJsonFile.brand) {
  projectName = themePackageJsonFile.brand;
  // Sanitize brand name.
  environmentConfig.BRAND_NAME = themePackageJsonFile.brand;
  environmentConfig.BRAND_CODE_NAME = themePackageJsonFile.brand.toLowerCase().replace(/\W+/, '-').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  environmentConfig.BRAND_SLUG_NAME = makeSlug(themePackageJsonFile.brand);
}
if (themePackageJsonFile.author) {
  environmentConfig.AUTHOR = themePackageJsonFile.author;
  projectName = `${projectName}-by-${themePackageJsonFile.author}`;
}

environmentConfig.PROJECT_NAME = makeSlug(projectName);
environmentConfig.PROJECT_VERSION = themePackageJsonFile.version;

/** Finally assign fully constructed environment config. */
Object.assign(process.env, environmentConfig);
