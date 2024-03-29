import * as React from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import SubtextSlider from './SubtextSlider';
import { menuOpen } from '../store';
import Link from './Link';

const variants = {
  enter: {
    y: 80,
    transition: {
      duration: 1,
      y: { stiffness: 1000 }
    }
  },
  center: {
    y: 0,
    transition: {
      duration: 1,
      y: { stiffness: 1000 }
    }
  },
  exit: {
    y: -80,
    transition: {
      duration: 0.3,
      y: { stiffness: 1000 }
    }
  }
};

interface AboutPropTypes {
  landed: boolean
}

function About({ landed = false }: AboutPropTypes): JSX.Element {
  const [init, setInit] = useState(false);
  const open = useRecoilValue(menuOpen);

  useEffect(() => {
    if (landed && !init) {
      setTimeout(() => {
        setInit(true);
      }, 800);
    }

    if (!landed && init) {
      setTimeout(() => {
        setInit(false);
      }, 800);
    }
    // eslint-disable-next-line
  }, [landed]);

  return (
    <section className='slider__section'>
      <AnimatePresence>
        { (init && !open) && (
          <>
            <div className="slider__container">
              <h1 className="about__h1">
                <span className="about__label">
                  <motion.span
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={init}
                    variants={variants}
                  >
                    I&#39;m a Software <br/>
                  </motion.span>
                </span>
                <span className="about__label">
                  <motion.span
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={init}
                    variants={variants}
                  >
                    Engineer.
                  </motion.span>
                </span>
              </h1>
            </div>
            <Link
              href="/about"
              label="About me"
              swap
              blank={false}
              center={false}
              headline={false}
              page={false}
            />
            <span className="slider__ruler-top" />
            <SubtextSlider
              slides={[
                'creating.',
                'developing.',
                'web design.',
                'ux design.',
                'pixel art.',
                'good food.',
              ]}
              label="Passion for"
              swapped
              still={false}
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default About;