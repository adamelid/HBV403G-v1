/* eslint-disable guard-for-in */
import { readFile } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { direxists } from './lib/file.js';
import { indexTemplate, statsTemplate } from './lib/html.js';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  // Búa til `./dist` ef ekki til
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }
  const results = [];

  readFile('././data/index.json', async (err, data) => {
    if (err) throw err;
    const deildir = JSON.parse(data);

    for (const deild in deildir) {
      for (let i = 0; i < deildir[deild].length; i+=1) {
          const deildTitle = deildir[deild][i].title;
          const deildDescription = deildir[deild][i].description;
          const filename = deildir[deild][i].csv;

          const result = {
            deildTitle,
            deildDescription,
            filename,
          };
          results.push(result);

          const filepath = join(OUTPUT_DIR, filename);
          const template = statsTemplate(deildTitle, result);

        // eslint-disable-next-line no-await-in-loop
        writeFile(filepath, template, { flag: 'w+' });
      }
    }
  });
  const filepath = join(OUTPUT_DIR, 'index.html');
  const template = indexTemplate(results);

  await writeFile(filepath, template, { flag: 'w+' });
}

main().catch((err) => console.error(err));
