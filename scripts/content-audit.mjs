import { readFile, readdir } from "node:fs/promises"
import { extname, join } from "node:path"

const root = new URL("..", import.meta.url)
const sourceRoot = new URL("../src/", import.meta.url)
const bannedClaims = [
  "5,000+",
  "50,000+",
  "50K+",
  "98%",
  "fastest-growing",
  "Every review verified",
  "provided via Clerk",
  "purchase event tickets",
  "reviewed by a human moderator within 24 hours",
]

async function sourceFiles(directoryURL) {
  const entries = await readdir(directoryURL, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const entryURL = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directoryURL)
    if (entry.isDirectory()) files.push(...await sourceFiles(entryURL))
    else if ([".js", ".jsx", ".html"].includes(extname(entry.name))) files.push(entryURL)
  }
  return files
}

const files = [...await sourceFiles(sourceRoot), new URL("../index.html", import.meta.url)]
const findings = []
for (const file of files) {
  const content = await readFile(file, "utf8")
  for (const claim of bannedClaims) {
    if (content.toLowerCase().includes(claim.toLowerCase())) findings.push(`${file.pathname}: ${claim}`)
  }
}

const requiredPublicFiles = ["robots.txt", "sitemap.xml", "site.webmanifest"]
for (const filename of requiredPublicFiles) {
  try {
    await readFile(join(root.pathname, "public", filename), "utf8")
  } catch {
    findings.push(`public/${filename}: missing`)
  }
}

if (findings.length) {
  console.error("Content audit failed:\n" + findings.map((finding) => `- ${finding}`).join("\n"))
  process.exit(1)
}

console.log(`Content audit passed across ${files.length} source files.`)
