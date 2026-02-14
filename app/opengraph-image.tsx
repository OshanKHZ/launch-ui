import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Lucas Oshan - Developer & Designer';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    // We utilize the edge runtime which supports standard web APIs
    // Using system fonts for simplicity and speed
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#09090b',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 100,
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: 20,
                            letterSpacing: '-2px',
                            textAlign: 'center',
                        }}
                    >
                        Lucas Oshan
                    </div>
                    <div
                        style={{
                            fontSize: 40,
                            fontWeight: 500,
                            color: '#a1a1aa',
                            letterSpacing: '-1px',
                            textAlign: 'center',
                        }}
                    >
                        Developer & Designer
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 60,
                        fontSize: 24,
                        color: '#52525b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}
                >
                    lucasoshan.com
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
