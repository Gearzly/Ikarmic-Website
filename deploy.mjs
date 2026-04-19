/**
 * deploy.mjs — uploads built files to Hostinger via SFTP
 *
 * Requires: npm install -D ssh2-sftp-client
 *
 * Set these in .env.local (never commit):
 *   DEPLOY_HOST=ikarmic.ai
 *   DEPLOY_USER=your_cpanel_username
 *   DEPLOY_PASS=your_cpanel_password
 *   DEPLOY_PATH=/home/your_cpanel_username/htdocs/ikarmic.ai
 *
 * Usage: npm run deploy
 */

import SftpClient from 'ssh2-sftp-client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local manually (deploy script runs outside vite/node --env-file)
function loadEnv(file) {
  try {
    const lines = readFileSync(file, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    // no .env.local — rely on actual env vars
  }
}

loadEnv(resolve(__dirname, '.env.local'))

const { DEPLOY_HOST, DEPLOY_USER, DEPLOY_PASS, DEPLOY_PATH } = process.env

if (!DEPLOY_HOST || !DEPLOY_USER || !DEPLOY_PASS || !DEPLOY_PATH) {
  console.error(
    'Missing DEPLOY_HOST / DEPLOY_USER / DEPLOY_PASS / DEPLOY_PATH in environment.',
  )
  process.exit(1)
}

// Files and folders to upload (relative to project root)
const UPLOAD = [
  { local: 'dist', remote: 'dist', type: 'dir' },
  { local: 'server.js', remote: 'server.js', type: 'file' },
  { local: 'package.json', remote: 'package.json', type: 'file' },
  { local: 'package-lock.json', remote: 'package-lock.json', type: 'file' },
]

const sftp = new SftpClient()

try {
  console.log(`Connecting to ${DEPLOY_HOST}…`)
  await sftp.connect({
    host: DEPLOY_HOST,
    port: 21,
    username: DEPLOY_USER,
    password: DEPLOY_PASS,
  })

  for (const item of UPLOAD) {
    const localPath = resolve(__dirname, item.local)
    const remotePath = `${DEPLOY_PATH}/${item.remote}`
    if (item.type === 'dir') {
      console.log(`Uploading ${item.local}/…`)
      await sftp.uploadDir(localPath, remotePath)
    } else {
      console.log(`Uploading ${item.local}…`)
      await sftp.put(localPath, remotePath)
    }
  }

  console.log('Upload complete.')
  console.log(
    'NOTE: Run "npm install --omit=dev" on the server to install new dependencies.',
  )
} finally {
  await sftp.end()
}
