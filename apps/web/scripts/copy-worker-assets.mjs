import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..'); // Assuming script is in apps/web/scripts

const sourceDir = path.join(projectRoot, '.open-next');
const destDir = path.join(sourceDir, 'assets');

// Helper to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip the assets directory itself to avoid infinite recursion
    if (entry.name === 'assets') continue;

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      // Handle symlinks by copying the real file/directory they point to or skipping
      // For deployment, usually copying the content is safer than preserving symlinks if the target might be outside
      try {
        const realPath = fs.realpathSync(srcPath);
        const stats = fs.statSync(realPath);
        if (stats.isDirectory()) {
             copyDir(realPath, destPath);
        } else {
             fs.copyFileSync(realPath, destPath);
        }
      } catch (e) {
        console.warn(`Skipping broken symlink or error copying: ${srcPath}`, e.message);
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy worker.js to _worker.js
const workerSrc = path.join(sourceDir, 'worker.js');
const workerDest = path.join(destDir, '_worker.js');
if (fs.existsSync(workerSrc)) {
    fs.copyFileSync(workerSrc, workerDest);
    console.log(`Copied worker.js to ${workerDest}`);
} else {
    console.error('worker.js not found in .open-next/');
    process.exit(1);
}

// 2. Directories to copy
const dirsToCopy = [
    'cloudflare',
    'middleware',
    'server-functions',
    '.build', 
];

dirsToCopy.forEach(dirName => {
    const src = path.join(sourceDir, dirName);
    const dest = path.join(destDir, dirName);
    
    if (fs.existsSync(src)) {
        console.log(`Copying ${dirName}...`);
        copyDir(src, dest);
    } else {
        console.warn(`Warning: Directory ${dirName} not found in .open-next/`);
    }
});

console.log('Worker assets copy complete.');
