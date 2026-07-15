import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Fallback values
    const title = searchParams.get('title') || 'NexEagle Doctor Dekho';
    const subtitle = searchParams.get('subtitle') || 'Find & Book Top Specialists Near You';
    const rating = searchParams.get('rating');
    const image = searchParams.get('image');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #f1f5f9 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f1f5f9 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: 'sans-serif',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              padding: '60px',
              borderRadius: '30px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '2px solid #e2e8f0',
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            {image && (
              <img
                src={image}
                alt="Doctor"
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '80px',
                  objectFit: 'cover',
                  marginBottom: '30px',
                  border: '4px solid #14b8a6', // brand-teal
                }}
              />
            )}
            
            <h1
              style={{
                fontSize: '64px',
                fontWeight: '900',
                color: '#0f172a', // slate-900
                margin: '0 0 20px 0',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            
            <p
              style={{
                fontSize: '32px',
                color: '#64748b', // slate-500
                margin: '0',
                fontWeight: '500',
              }}
            >
              {subtitle}
            </p>

            {rating && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '30px',
                  background: '#fef3c7', // amber-50
                  padding: '10px 24px',
                  borderRadius: '50px',
                }}
              >
                <span style={{ fontSize: '36px', color: '#f59e0b', marginRight: '10px' }}>★</span>
                <span style={{ fontSize: '28px', color: '#b45309', fontWeight: 'bold' }}>{rating} Rating</span>
              </div>
            )}
          </div>
          
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>
              Doctor <span style={{ color: '#14b8a6' }}>Dekho</span>
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
