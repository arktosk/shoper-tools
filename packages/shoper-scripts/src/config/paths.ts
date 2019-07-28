import * as path from 'path';

const themeDirectory: string = process.cwd();

/**
 * Finds absolute path to resource in theme directory.
 * 
 * @param  {String} relativePath Relative path in theme directory.
 * @return {String}              Absolute path to theme resource.
 */
const resolveThemePath = (relativePath: string): string => path.resolve(process.cwd(), relativePath);

export const paths = {
  themePackageJsonFile: resolveThemePath('package.json'),
  envFile: resolveThemePath('.env'),
  theme: resolveThemePath('./'),
  themeSrc: resolveThemePath('src'),
  themeBuild: resolveThemePath('build'),
};
