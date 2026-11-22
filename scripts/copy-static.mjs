import { cp, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
for (const name of ['assets', 'experience', 'security', 'skills', 'work', 'writing']) {
  await cp(resolve(root, name), resolve(dist, name), { recursive: true });
}
for (const name of ['robots.txt', 'sitemap.xml']) {
  await copyFile(resolve(root, name), resolve(dist, name));
}
