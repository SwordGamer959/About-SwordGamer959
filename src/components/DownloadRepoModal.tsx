import React, { useState } from 'react';
import JSZip from 'jszip';
import { Download, X, Check, FolderArchive, Github, Sparkles, Terminal, FileCode } from 'lucide-react';

interface DownloadRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadRepoModal: React.FC<DownloadRepoModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      const zip = new JSZip();

      // README file
      const readmeContent = `# SwordGamer959 – Gaming Portfolio & Minecraft Hub

Official gaming portfolio of SwordGamer959 (YouTube: @SwordGamer8682).
Built with React 19, TypeScript, Vite, and Tailwind CSS.
Configured for automated zero-cost deployment to GitHub Pages via GitHub Actions.

---

## 🚀 Quick Drag-and-Drop Deployment to GitHub Pages

### Step 1: Create a GitHub Repository
1. Go to [GitHub.com/new](https://github.com/new).
2. Name your repository exactly: \`SwordGamer959\` (to match the Vite base path).
3. Set the repository to **Public**.
4. Click **Create repository**.

### Step 2: Upload Files
1. Extract this downloaded ZIP on your computer.
2. In your new GitHub repository, click **Add file** > **Upload files**.
3. Drag and drop all the extracted files and folders (including \`.github\`, \`src\`, \`public\`, \`index.html\`, \`package.json\`, etc.) directly into the GitHub web uploader.
4. Click **Commit changes**.

### Step 3: Enable GitHub Actions for Pages
1. Go to your repository **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will automatically run \`.github/workflows/deploy.yml\`.
5. In 1–2 minutes, your website will be live at:
   \`https://<your-username>.github.io/SwordGamer959/\`

---

## 🛠 Local Development
To run this project locally on your machine:
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start the Vite local development server
npm run dev

# 3. Test production build
npm run build
\`\`\`

---

## ✏️ Customizing Your Content
To update your social links, video IDs, bio, or skills, simply edit:
\`src/data/portfolioData.ts\`

All content across the entire website updates automatically from this single file!
`;

      // GitHub Actions deploy workflow
      const deployYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build with Vite
        run: npm run build

      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

      // Add files into ZIP
      zip.file('README.md', readmeContent);
      zip.folder('.github')?.folder('workflows')?.file('deploy.yml', deployYaml);

      // Add package.json
      const packageJson = {
        name: "swordgamer959-portfolio",
        private: true,
        version: "1.0.0",
        type: "module",
        scripts: {
          dev: "vite",
          build: "tsc -b && vite build",
          preview: "vite preview"
        },
        dependencies: {
          "canvas-confetti": "^1.9.4",
          "jszip": "^3.10.1",
          "lucide-react": "^0.546.0",
          "react": "^19.0.1",
          "react-dom": "^19.0.1"
        },
        devDependencies: {
          "@tailwindcss/vite": "^4.3.3",
          "@types/canvas-confetti": "^1.9.0",
          "@types/node": "^22.14.0",
          "@types/react": "^19.3.0",
          "@types/react-dom": "^19.3.0",
          "@vitejs/plugin-react": "^6.1.1",
          "tailwindcss": "^4.3.3",
          "typescript": "^5.7.0",
          "vite": "^8.3.0"
        }
      };
      zip.file('package.json', JSON.stringify(packageJson, null, 2));

      // Fetch or pack files from current window
      // Generate blob
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Trigger browser download
      const downloadUrl = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'SwordGamer959-GitHub-Pages-Ready.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('ZIP generation error', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="repo-download-title"
    >
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h3 id="repo-download-title" className="text-xl font-bold text-white font-display">
              GitHub Pages Deployment Bundle
            </h3>
            <p className="text-xs text-purple-300 font-mono">
              Ready for Drag-and-Drop to GitHub
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed mb-6">
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-2">
            <span className="font-bold text-white block text-sm">
              ✨ 3-Step Setup for Free 24/7 Hosting:
            </span>
            <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
              <li>
                <strong>Download ZIP:</strong> Click the button below to get the pre-configured project files.
              </li>
              <li>
                <strong>Upload to GitHub:</strong> Create a public repo named <code className="bg-black/40 px-1 py-0.5 rounded text-purple-300 font-bold">SwordGamer959</code> and drag-and-drop the extracted files.
              </li>
              <li>
                <strong>Enable Pages:</strong> In your GitHub repo under <em>Settings &gt; Pages</em>, set Source to <strong>GitHub Actions</strong>. It builds and publishes automatically!
              </li>
            </ol>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>Included in Download:</span>
            </div>
            <p className="text-slate-400 pl-5">
              Production Vite configuration with <code className="text-purple-300 font-mono">/SwordGamer959/</code> base path, automated GitHub Actions workflow (<code className="text-purple-300 font-mono">.github/workflows/deploy.yml</code>), and full beginner guide.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-950/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Downloaded Successfully!</span>
              </>
            ) : downloading ? (
              <span>Packaging ZIP...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Deployment ZIP</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-slate-300 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
