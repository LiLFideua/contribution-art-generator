export type AppCategory = 'developer-tool';

export interface ProjectManifest {
  name: string;
  title: string;
  category: AppCategory;
  description: string;
  languages: string[];
  entrypoints: {
    html: string;
    css: string;
    javascript: string;
  };
}

export const projectManifest: ProjectManifest = {
  name: 'contribution-art-generator',
  title: 'Contribution Art Generator',
  category: 'developer-tool',
  description: 'A contribution-grid editor that generates dated empty-commit scripts for pixel artwork.',
  languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'JSON', 'Markdown'],
  entrypoints: {
    html: 'index.html',
    css: 'assets/styles.css',
    javascript: 'assets/app.js'
  }
};
