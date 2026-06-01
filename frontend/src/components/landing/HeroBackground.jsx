import { useParticleCanvas } from '../../hooks/useParticleCanvas';

const HeroBackground = () => {
  const canvasRef = useParticleCanvas({ count: 40, color: '#10b981', repelRadius: 100, gridOpacity: 0.04, gridSize: 60 });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
};

export default HeroBackground;
