import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import classes from './Card.module.css';

// Variantes de animação
const cardVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  return (
    <motion.div
      className={classes.card}
      ref={ref}
      variants={cardVariant}
      initial="visible"
      animate={control}
    >
      {children}
    </motion.div>
  );
};

export default Card;
