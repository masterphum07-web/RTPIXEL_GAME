import { defineConfig } from 'vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.GITHUB_ACTIONS === 'true' && repo ? `/${repo}/` : '/';
async function listFiles(directory:string):Promise<string[]> {
  const entries=await readdir(directory,{withFileTypes:true});
  const nested=await Promise.all(entries.map(entry=>entry.isDirectory()?listFiles(resolve(directory,entry.name)):[resolve(directory,entry.name)]));
  return nested.flat();
}
const offlinePrecache={
  name:'offline-precache',
  apply:'build' as const,
  async writeBundle(){
    const output=resolve('dist');
    const files=(await listFiles(output)).filter(file=>!file.endsWith(`${sep}sw.js`));
    const urls=[base,...files.map(file=>`${base}${relative(output,file).split(sep).join('/')}`)];
    const sw=resolve(output,'sw.js');
    const source=await readFile(sw,'utf8');
    const version=Date.now().toString(36);
    await writeFile(sw,source.replace('__PRECACHE__',JSON.stringify(urls)).replace('__CACHE_VERSION__',version));
  },
};
export default defineConfig({ base, plugins:[offlinePrecache] });
