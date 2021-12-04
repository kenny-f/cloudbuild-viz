import fs from 'fs';
import { tree } from './tree';
import yaml from 'js-yaml';

interface Cloudbuild {
  steps: Step[];
}

export interface Step {
  id: string;
  waitFor?: string[];
}

const htmlTemplate = (mermaidMarkdown: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div class="mermaid">
    ${mermaidMarkdown}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script>mermaid.initialize({startOnLoad:true});</script>
  </body>
  </html>
  `

export const parse = (yamlPath: string) => {
  try {
    const cb = yaml.load(fs.readFileSync(yamlPath, 'utf8')) as Cloudbuild;
    const steps = cb.steps.map(({ id, waitFor }) => ({ id, waitFor }));
    const mermaidMarkdown = tree(steps);
    
    fs.writeFileSync('index.html', htmlTemplate(mermaidMarkdown));    
  } catch (e) {
    console.log(e);
  }
}