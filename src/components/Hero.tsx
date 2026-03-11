'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import GetDemoModal from './GetDemoModal';

import { heroDetails } from '@/data/hero';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay },
    }),
};

const Hero: React.FC = () => {
    const [isDemoModalOpen, setDemoModalOpen] = useState(false);

    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
        >
            <GetDemoModal isOpen={isDemoModalOpen} onClose={() => setDemoModalOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>
            </div>

            <div className="text-center">
                <motion.h1
                    className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                >
                    {heroDetails.heading}
                </motion.h1>

                <motion.p
                    className="mt-4 text-foreground max-w-lg mx-auto"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.15}
                >
                    {heroDetails.subheading}
                </motion.p>

                <motion.div
                    className="mt-8 flex justify-center"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                >
                    <button
                        onClick={() => setDemoModalOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base shadow-lg hover:bg-primary-accent transition-colors"
                    >
                        🚀 Mulai dan Coba Demo Gratis
                    </button>
                </motion.div>

                <motion.div
                    className="mt-12 md:mt-24 -mx-5 relative z-0"
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
                >
                    <Image
                        src={heroDetails.centerImageSrc}
                        width={2000}
                        height={480}
                        quality={100}
                        priority={true}
                        unoptimized={true}
                        alt="app mockup"
                        className="w-full max-w-none shadow-2xl"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
