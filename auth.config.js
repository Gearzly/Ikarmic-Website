import Credentials from '@auth/core/providers/credentials'
import bcrypt from 'bcrypt'

/**
 * Auth.js configuration for the Ikarmic admin panel.
 * Uses Credentials provider with bcrypt-hashed passwords from MySQL admin_users table.
 * JWT strategy stores session in encrypted HttpOnly cookie (no server-side session table needed).
 *
 * @param {import('mysql2/promise').Pool} pool - MySQL connection pool
 */
export function createAuthConfig(pool) {
  return {
    providers: [
      Credentials({
        name: 'Admin Login',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.username || !credentials?.password) return null

          const [rows] = await pool.execute(
            'SELECT id, username, password_hash, role FROM admin_users WHERE username = ?',
            [credentials.username],
          )
          if (!rows.length) return null

          const user = rows[0]
          const valid = await bcrypt.compare(
            credentials.password,
            user.password_hash,
          )
          if (!valid) return null

          // Update last login timestamp
          await pool.execute(
            'UPDATE admin_users SET last_login_at = NOW() WHERE id = ?',
            [user.id],
          )

          return {
            id: String(user.id),
            name: user.username,
            role: user.role,
          }
        },
      }),
    ],
    session: {
      strategy: 'jwt',
      maxAge: 8 * 60 * 60, // 8 hours
    },
    callbacks: {
      async jwt({ token, user }) {
        // On initial sign in, persist role into the JWT
        if (user) {
          token.role = user.role
          token.userId = user.id
        }
        return token
      },
      async session({ session, token }) {
        // Expose role and userId to the client session object
        if (session.user) {
          session.user.id = token.userId
          session.user.role = token.role
        }
        return session
      },
    },
    pages: {
      signIn: '/admin', // Our custom login page
      error: '/admin',
    },
    trustHost: true,
  }
}
