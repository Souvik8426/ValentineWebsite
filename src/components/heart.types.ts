interface SplashProps {
    circles: Array<{ id: string }>;
  }
  
  interface ShineSVGProps {
    x: number;
    opacity: number;
    rotate: {
      x: number;
      y: number;
    };
    translateZ: number;
  }
  
  interface HeartSVGProps {
    rotate: {
      x: number;
      y: number;
    };
    translateZ: number;
    strokeDashoffset?: number;
    scale?: number;
    className?: string;
  }
  
  interface UseCursorTiltProps {
    ref: React.RefObject<HTMLElement>;
    tilt: number;
    bounds?: number;
  }
  