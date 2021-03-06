import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AnimatePresence, motion } from 'framer-motion';
import { isLanding, menuOpen, pageRendered } from '../../store';
import Headline from '../../components/Headline';
import Link from '../../components/Link';

const lineVariants = {
  enter: { y: 15, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -15, opacity: 0 }
}

const countVariants = {
  enter: { y: 20, opacity: 0, transition: { delay: 0.2 }},
  center: { y: 0, opacity: 1, transition: { delay: 0.2 }},
  exit: { y: -20, opacity: 0, transition: { delay: 0.2 }}
}

function Mobelux(): JSX.Element {
  const setRendered = useSetRecoilState(pageRendered);
  const setLanded = useSetRecoilState(isLanding);
  const open = useRecoilValue(menuOpen);

  React.useEffect(() => {
    const body = document.querySelector<Element>('body');
    if (body) {
      body.classList.add('scrollable');
    }

    setLanded(true);
    setRendered({ page: 'project', seed: Math.random() });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!open) {
      setRendered({ page: 'project', seed: Math.random() });
    }
    // eslint-disable-next-line
  }, [open]);

  return (
    <AnimatePresence>
      { !open &&  (
        <article className="page">
          <section className="page__head page__section">
            <Headline
              headline="A digital agency that designs, develops, and brands award-winning products for mobile and web."
              open={open}
              tags={{
                client: 'Mobelux',
                agency: 'Mobelux',
                status: 'Live',
                role: 'Engineer',
                tech: 'Next.js, GraphQL, Rails'
              }}
              email={false}
              quote={false}
            />
            <span className="slider__ruler-top still" />
            {/* <Link
              href="https://mobelux.com/"
              label="View Site"
              swap
              headline
              blank
              page={false}
              center={false}
            /> */}
          </section>
          <section className="page__image-placeholder">
            <img src="https://mortycms.imgix.net/store/46ceee655212fee646c53326588a956b.jpg?ixlib=rb-1.1.0&w=1920" alt='silence you fool' className='gl-about-scene' />
          </section>
          <section className="page__head page__section works">
            <Headline
              headline="Designed in house by Mobelux. Website redesign and rebuilt from the ground up. Backed Next.js and an internally built CMS on Rails."
              open={open}
              email={false}
              quote={false}
              tags={null}
            />
          </section>
          <section className="page__section" style={{ marginTop: 120 }}>
            <div className="page__paragraph flexed">
              <div className="page__cell">
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={lineVariants}
                  className="page__tag"
                >
                  Year
                </motion.div>
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={countVariants}
                  className="page__count"
                >
                  &#39;20
                </motion.div>
              </div>
              <div className="page__cell">
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={lineVariants}
                  className="page__tag"
                >
                  Hours Contributed
                </motion.div>
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={countVariants}
                  className="page__count"
                >
                  280
                </motion.div>
              </div>
            </div>
          </section>
          <section style={{ marginTop: '16rem' }} className="page__image-placeholder">
            <img src="/images/mb2.png" alt='silence you fool' className="cover" />
          </section>
          <section className="work__stack">
            <figure style={{ marginRight: 0, maxHeight: 1200 }} className="work__figure">
              <img src="/images/mb1.png" alt='silence you fool' />
            </figure>
            <figure style={{ marginLeft: 60, maxHeight: 1200 }} className="work__figure">
              <img src="/images/mb3.png" alt='silence you fool' />
            </figure>
          </section>
          <section className="work__bottom-container">
            <Link
              href="/work"
              label="Back to Work"
              swap={false}
              page
              center
              headline={false}
              blank={false}
            />
          </section>
        </article>
      )}
    </AnimatePresence>
  )
}

export default Mobelux;