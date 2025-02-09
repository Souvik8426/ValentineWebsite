import React, { useEffect, useState, useRef, memo } from 'react';
import { nanoid } from 'nanoid';

const PATH_LENGTH = 1506;
const LAYERS = 20;
const LAYER_GAP = 2;

// Reusing the same utility functions from Heart component
const clamp = (min: number, max: number, n: number): number => (
    Math.min(max, Math.max(min, n))
);

// Add the missing interface
interface CursorTiltHook {
    ref: React.RefObject<HTMLElement>;
    tilt: number;
    bounds?: number;
}

// Add the missing hook implementation
const useCursorTilt = ({ ref, tilt, bounds }: CursorTiltHook): [number, number] => {
    const [rotate, setRotate] = useState<[number, number]>([-25, 25]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const { left, top, width, height } = ref.current.getBoundingClientRect();
            const [x, y] = [e.clientX, e.clientY];

            const rect = bounds
                ? {
                    top: top - bounds,
                    left: left - bounds,
                    width: width + bounds * 2,
                    height: height + bounds * 2
                }
                : {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };

            setRotate([
                (-(clamp(0, rect.height, y - rect.top) - (rect.height / 2)) / rect.height) * tilt,
                ((clamp(0, rect.width, x - rect.left) - (rect.width / 2)) / rect.width) * tilt,
            ]);
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [ref, tilt, bounds]);

    return rotate;
};



const useDocumentEvent = (event: string, handler: (e: MouseEvent) => void): void => {
    useEffect(() => {
        const events = event.split(' ');
        events.forEach(event => document.addEventListener(event, handler));
        return () => events.forEach(event => document.removeEventListener(event, handler));
    }, []);
};

// Modified HeartPath to create left and right broken pieces
const BrokenHeartLeft: React.FC = () => (
    <path d="M250 429.26C178.68 322.15 0.17 286.45 0.17 143.64C0.17 72.24 53.72 0.83 142.98 0.83C214.38 0.83 250.08 72.24 250.08 72.24L250 429.26Z" />
);

const BrokenHeartRight: React.FC = () => (
    <path d="M250.08 429.26C321.49 322.15 500 286.45 500 143.64C500 72.24 446.45 0.83 357.19 0.83C285.79 0.83 250.08 72.24 250.08 72.24L250.08 429.26Z" />
);

const ShineSVG: React.FC<ShineSVGProps> = ({ x, opacity, rotate, translateZ, broken }) => (
    <svg viewBox="0 0 500 430" style={{
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${translateZ}px) scale(0.9)
    ${broken ? 'translateX(20px)' : ''}`
    }} className='heart-shine'>
        <defs>
            <clipPath id="broken-heart">
                <BrokenHeartLeft />
                <BrokenHeartRight />
            </clipPath>
        </defs>
        <rect x={500 - x * 700} y='0' width='200' height='430' fill={`rgba(255,255,255,${opacity})`} clipPath='url(#broken-heart)' />
    </svg>
);

const BrokenHeartSVG: React.FC<HeartSVGProps> = ({ rotate: { x, y }, translateZ, strokeDashoffset, scale = 1, className, broken }) => (
    <svg
        className={className}
        viewBox="0 0 500 430"
        style={{
            transform: `rotateX(${x}deg) rotateY(${y}deg) translateZ(${translateZ}px) scale(${scale})
      ${broken ? 'translateX(-20px)' : ''}`,
            strokeDashoffset
        }}
    >
        <BrokenHeartLeft />
        <BrokenHeartRight />
    </svg>
);

const BrokenHeart: React.FC = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [broken, setBroken] = useState<boolean>(false);
    const [pressed, setPressed] = useState<boolean>(false);
    const [x, y] = useCursorTilt({ ref, tilt: 50, bounds: 50 });
    const offset = (Math.atan2(y, x) / Math.PI) * (PATH_LENGTH / 2) + PATH_LENGTH / 2;

    useDocumentEvent('mouseup', () => {
        setPressed(pressed => {
            if (pressed) {
                setBroken(true);
                setTimeout(() => setBroken(false), 1000);
            }
            return false;
        });
    });

    return (
        <div className="relative flex items-center justify-center">
          <button 
            className={`broken-heart ${broken ? 'is-broken' : ''}`}
            onMouseDown={() => setPressed(true)} 
            ref={ref} 
            style={{ 
              '--lightness': broken ? '40%' : '60%',
              '--scale': 0.8 + (pressed ? -0.1 : 0)
            } as React.CSSProperties}
          >
            <div className='inner-wrapper'>
              {/* Heart layers */}
              {[...new Array(LAYERS)].map((_, i) => (
                <BrokenHeartSVG 
                  key={i}
                  className='heart-layer' 
                  rotate={{ x, y }} 
                  translateZ={i * LAYER_GAP} 
                  scale={Math.sin((i / LAYERS) * Math.PI) / 10 + 1}
                  broken={broken}
                />
              ))}
              <BrokenHeartSVG 
                className='heart-stroke' 
                rotate={{ x, y }} 
                translateZ={(LAYERS + 1) * LAYER_GAP} 
                strokeDashoffset={offset} 
                scale={0.9}
                broken={broken}
              />
              <ShineSVG 
                x={y / 50 + 0.5} 
                opacity={x / 200 + 0.5} 
                rotate={{ x, y }} 
                translateZ={(LAYERS + 1) * LAYER_GAP}
                broken={broken}
              />
              <span className="absolute text-white font-bold text-xl" style={{ transform: `translateZ(${(LAYERS + 2) * LAYER_GAP}px)` }}>
                NO
              </span>
            </div>
          </button>
        </div>
      );
};

export default BrokenHeart;
