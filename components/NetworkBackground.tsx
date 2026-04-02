"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function NetworkBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smoother, heavier tracking for the spheres to feel massive
  const springX = useSpring(mouseX, { stiffness: 20, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 30 });

  const shiftX = useTransform(springX, [0, windowDimensions.width || 1000], [-40, 40]);
  const shiftY = useTransform(springY, [0, windowDimensions.height || 1000], [-40, 40]);
  
  const shiftXInverse = useTransform(springX, [0, windowDimensions.width || 1000], [30, -30]);
  const shiftYInverse = useTransform(springY, [0, windowDimensions.height || 1000], [30, -30]);
  
  const shiftXDeep = useTransform(springX, [0, windowDimensions.width || 1000], [-80, 80]);
  const shiftYDeep = useTransform(springY, [0, windowDimensions.height || 1000], [-80, 80]);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none">
      {/* 
        The spheres use a mix of radial gradients and high blurs to 
        create a subtle, floating network background effect.
      */}

      {/* Extreme Deep Parallax Layer - Accent Purple Sphere */}
      <motion.div style={{ x: shiftXDeep, y: shiftYDeep }} className="absolute inset-0 w-full h-full">
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -50, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.08]"
          style={{
            background: "radial-gradient(circle at center, #6148a8, transparent)",
          }}
        />
      </motion.div>

      {/* Layer 2: Inverse Parallax - Core Blue Sphere */}
      <motion.div style={{ x: shiftXInverse, y: shiftYInverse }} className="absolute inset-0 w-full h-full">
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[15%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.05]"
          style={{
            background: "radial-gradient(circle at center, #0c80df, transparent)",
          }}
        />
      </motion.div>

      {/* Layer 1: Normal Depth - Combined Core Blue / Purple Box Sphere */}
      <motion.div style={{ x: shiftX, y: shiftY }} className="absolute inset-0 w-full h-full">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[25%] w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.06]"
          style={{
            background: "radial-gradient(circle at center, #0c80df 0%, #6148a8 70%, transparent 100%)",
          }}
        />
      </motion.div>

    </div>
  );
}

