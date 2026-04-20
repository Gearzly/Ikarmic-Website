/**
 * deploy.mjs — builds, uploads, and installs on Hostinger via SFTP + SSH
 *
 * Set these in .env.local (never commit):
 *   DEPLOY_HOST=ikarmic.com
 *   DEPLOY_USER=your_ssh_username
 *   DEPLOY_PASS=your_ssh_password
 *   DEPLOY_PATH=/home/u315242250/domains/ikarmic.com/public_html
 *
 * Usage:
 *   npm run build && npm run deploy
 *
 * What it does:
 *   1. Uploads dist/, server.js, auth.config.js, package.json, package-lock.json
 *   2. SSH-executes "npm install --omit=dev" in DEPLOY_PATH on the server
 *      (tables are created automatically when Node.js restarts via initDb())
 */

import SftpClient from 'ssh2-sftp-client'
import { Client as SshClient } from 'ssh2'
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
    'Missing DEPLOY_HOST / DEPLOY_USER / DEPLOY_PASS / DEPLOY_PATH in .env.local',
  )
  process.exit(1)
}

// Files and folders to upload (relative to project root)
const UPLOAD = [
  { local: 'dist', remote: 'dist', type: 'dir' },
  { local: 'server.js', remote: 'server.js', type: 'file' },
  { local: 'auth.config.js', remote: 'auth.config.js', type: 'file' },
  { local: 'package.json', remote: 'package.json', type: 'file' },
  { local: 'package-lock.json', remote: 'package-lock.json', type: 'file' },
  { local: '.env', remote: '.env', type: 'file' },
]

// ── Step 1: SFTP upload ──────────────────────────────────
console.log(
  `\n[1/3] Connecting to ${DEPLOY_HOST}:65002 as ${DEPLOY_USER} via SFTP…`,
)
const sftp = new SftpClient()
try {
  await sftp.connect({
    host: DEPLOY_HOST,
    port: 65002,
    username: DEPLOY_USER,
    password: DEPLOY_PASS,
  })

  for (const item of UPLOAD) {
    const localPath = resolve(__dirname, item.local)
    const remotePath = `${DEPLOY_PATH}/${item.remote}`
    if (item.type === 'dir') {
      console.log(`  Uploading ${item.local}/…`)
      await sftp.uploadDir(localPath, remotePath)
    } else {
      console.log(`  Uploading ${item.local}…`)
      await sftp.put(localPath, remotePath)
    }
  }
  console.log('  Upload complete.')
} finally {
  await sftp.end()
}

// Full path to npm on Hostinger CloudLinux (alt-nodejs20)
const NODE_BIN = '/opt/alt/alt-nodejs20/root/usr/bin'
const NPM = `${NODE_BIN}/npm`

// ── Step 2: SSH → npm install + app restart ─────────────
console.log('\n[2/3] Running npm install --omit=dev on server…')
await runSsh(
  `export PATH=${NODE_BIN}:$PATH && cd ${DEPLOY_PATH} && ${NPM} install --omit=dev`,
)

console.log('\n[3/3] Restarting Node.js app (Passenger touch restart)…')
// Passenger restarts the app when tmp/restart.txt is touched.
await runSsh(
  `mkdir -p ${DEPLOY_PATH}/tmp && touch ${DEPLOY_PATH}/tmp/restart.txt`,
)

function runSsh(command) {
  return new Promise((resolve, reject) => {
    const ssh = new SshClient()
    ssh.on('ready', () => {
      ssh.exec(command, (err, stream) => {
        if (err) {
          ssh.end()
          return reject(err)
        }
        stream.on('data', (d) => process.stdout.write(d.toString()))
        stream.stderr.on('data', (d) => process.stderr.write(d.toString()))
        stream.on('close', (code) => {
          ssh.end()
          if (code !== 0 && code !== null)
            reject(new Error(`Command exited with code ${code}: ${command}`))
          else resolve()
        })
      })
    })
    ssh.on('error', reject)
    ssh.connect({
      host: DEPLOY_HOST,
      port: 65002,
      username: DEPLOY_USER,
      password: DEPLOY_PASS,
    })
  })
}

console.log(`
✅ Deploy complete.

   MySQL tables are created/migrated automatically by initDb() on app startup.
   Passenger restart has been triggered via tmp/restart.txt.

   If the app does not restart automatically, go to:
   Hostinger → Hosting → Node.js → Restart app manually.
`)
