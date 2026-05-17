import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px 100px',
          background: '#0a0a0a',
          fontFamily: 'Inter',
          position: 'relative',
        }}
      >
        {/* Decorative geometric element — top right circle */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: '50%',
            border: '1px solid rgba(79, 70, 229, 0.15)',
            background: 'rgba(79, 70, 229, 0.04)',
          }}
        />

        {/* Small accent circle */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 120,
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: '1px solid rgba(99, 102, 241, 0.12)',
          }}
        />

        {/* Bottom left decorative element */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -60,
            width: 340,
            height: 340,
            borderRadius: '50%',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            background: 'rgba(139, 92, 246, 0.03)',
          }}
        />

        {/* Dot grid pattern — top right area */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 80,
            width: 200,
            height: 200,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            opacity: 0.2,
          }}
        >
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#4f46e5',
              }}
            />
          ))}
        </div>

        {/* Brand badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: 40,
            padding: '8px 20px',
            borderRadius: '999px',
            border: '1px solid rgba(79, 70, 229, 0.4)',
            background: 'rgba(79, 70, 229, 0.1)',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#818cf8',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#a5b4fc',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            AI Services & Solutions
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 800,
            letterSpacing: '-0.02em',
          }}
        >
          AI that works
          <br />
          <span style={{ color: '#818cf8' }}>for people.</span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 28,
            color: '#a3a3a3',
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          Calm, reliable AI systems your teams actually adopt.
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 100px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: '#818cf8' }}>
            ikarmic.com
          </span>
          <span style={{ fontSize: 18, color: '#737373' }}>
            Hyderabad, India · Remote-first
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
