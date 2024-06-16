import React, { useState, useEffect, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface DynamicTextProps {
  texts: string[]
}
const DynamicText:FC<DynamicTextProps> = ({texts}) => {
  const [currentSentence, setCurrentSentence] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence((prevSentence) => (prevSentence + 1) % texts.length);
    }, 3000); // Change sentence every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSentence}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-green-300 text-2xl text-center mt-4 font-semibold"
      >
        {texts[currentSentence]}
      </motion.div>
    </AnimatePresence>
  );
};

export default DynamicText;
