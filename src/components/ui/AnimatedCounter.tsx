import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  const displayValue = useTransform(springValue, (current) => 
    Math.round(current).toString()
  );

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  return (
    <span ref={ref} className="inline-flex">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
