import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'João Vitor da Silva — Software Engineer'

const COPY: Record<string, { role: string; tags: string[] }> = {
  pt: {
    role: 'Software Engineer Full Stack',
    tags: ['React', 'Next.js', 'Java', 'IA aplicada'],
  },
  en: {
    role: 'Full Stack Software Engineer',
    tags: ['React', 'Next.js', 'Java', 'Applied AI'],
  },
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const copy = COPY[locale] ?? COPY.pt

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #000000 0%, #050b18 45%, #082f49 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 40, color: '#3b82f6', fontWeight: 700 }}>{'</>'}</span>
          <span style={{ fontSize: 28, fontWeight: 600, color: '#e2e8f0' }}>joaovitor.tech</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, letterSpacing: '-0.02em' }}>
            João Vitor da Silva
          </div>
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 600, color: '#67e8f9' }}>
            {copy.role}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {copy.tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  padding: '10px 22px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.08)',
                  fontSize: 24,
                  color: '#f1f5f9',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
