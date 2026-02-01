import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

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

    // Skip the assets directory itself
    if (entry.name === 'assets') continue;

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
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

// 1. Prepare _worker.js content (handling rename of .build to __build)
const workerSrc = path.join(sourceDir, 'worker.js');
const workerDest = path.join(destDir, '_worker.js');

if (fs.existsSync(workerSrc)) {
    let content = fs.readFileSync(workerSrc, 'utf8');
    // Replace .build imports with __build to avoid dotfile ignore issues in Wrangler
    content = content.replaceAll('./.build/', './__build/');
    
    // Add static asset serving logic before middleware handler
    // Insert after the image handling block and before middleware handler
    const staticAssetHandler = `
            // Serve static assets (_next/static/*, /image-projects/*, /documents/*)
            if (url.pathname.startsWith("/_next/static/") || 
                url.pathname.startsWith("/_next/data/") ||
                url.pathname.startsWith("/image-projects/") ||
                url.pathname.startsWith("/documents/")) {
                return env.ASSETS?.fetch(request) || new Response("Not Found", { status: 404 });
            }
`;
    
    // Find the line with "// - \`Request\`s are handled by the Next server"
    // and insert static handler before it
    content = content.replace(
        /(\s+)\/\/ - `Request`s are handled by the Next server/,
        `${staticAssetHandler}$1// - \`Request\`s are handled by the Next server`
    );
    
    fs.writeFileSync(workerDest, content);
    console.log(`Copied and patched worker.js to ${workerDest}`);
} else {
    console.error('worker.js not found in .open-next/');
    process.exit(1);
}

// 2. Directories to copy
const dirsToCopy = [
    { name: 'cloudflare', dest: 'cloudflare' },
    { name: 'middleware', dest: 'middleware' },
    { name: 'server-functions', dest: 'server-functions' },
    { name: '.build', dest: '__build' }, // Rename .build to __build
];

dirsToCopy.forEach(({ name, dest }) => {
    const src = path.join(sourceDir, name);
    const destination = path.join(destDir, dest);
    
    if (fs.existsSync(src)) {
        console.log(`Copying ${name} to ${dest}...`);
        copyDir(src, destination);
    } else {
        console.warn(`Warning: Directory ${name} not found in .open-next/`);
    }
});

console.log('Worker assets copy complete.');
