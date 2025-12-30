import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = new URL("..", import.meta.url);
const PUBLIC_DIR = path.join(fileURLToPath(ROOT), ".output", "public");

/**
 * Recursively walk a directory and return all file paths.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return fullPath;
    }),
  );
  return files.flat();
}

async function main() {
  try {
    const exists = await fs
      .stat(PUBLIC_DIR)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      return;
    }

    const files = await walk(PUBLIC_DIR);
    const htmlFiles = files.filter((f) => f.endsWith(".html"));

    const htmlCloseTag = "</html>";

    await Promise.all(
      htmlFiles.map(async (file) => {
        const original = await fs.readFile(file, "utf8");
        const firstHtmlIndex = original.indexOf(htmlCloseTag);

        if (firstHtmlIndex === -1) {
          return;
        }

        const trimmed = original.slice(0, firstHtmlIndex + htmlCloseTag.length);

        if (trimmed.length !== original.length) {
          await fs.writeFile(file, trimmed, "utf8");
        }
      }),
    );
  } catch {
    // noop
  }
}

main();
