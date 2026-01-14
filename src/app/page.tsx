'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import { Container, Layers, Box, Network, Server, Rocket, Database, Code } from 'lucide-react';

interface TutorialOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  comingSoon?: boolean;
}

const tutorials: TutorialOption[] = [
  {
    id: 'docker',
    title: 'Docker',
    description: '컨테이너 기술의 기초부터 고급 개념까지',
    icon: Container,
    href: '/docker',
    color: 'primary',
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    description: '컨테이너 오케스트레이션 마스터하기',
    icon: Box,
    href: '/kubernetes',
    color: 'secondary',
  },
];

const FloatingIcon = ({
  Icon,
  className,
  delay
}: {
  Icon: React.ComponentType<{ className?: string }>;
  className: string;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    anime({
      targets: ref.current,
      translateY: [
        { value: -20, duration: 2000 },
        { value: 20, duration: 2000 },
        { value: -20, duration: 2000 },
      ],
      translateX: [
        { value: 10, duration: 3000 },
        { value: -10, duration: 3000 },
        { value: 10, duration: 3000 },
      ],
      rotate: [
        { value: 5, duration: 2500 },
        { value: -5, duration: 2500 },
        { value: 5, duration: 2500 },
      ],
      opacity: [
        { value: 0, duration: 0 },
        { value: 0.6, duration: 1000 },
      ],
      scale: [
        { value: 0.8, duration: 0 },
        { value: 1, duration: 800 },
      ],
      loop: true,
      easing: 'easeInOutSine',
      delay,
    });
  }, [delay]);

  return (
    <div ref={ref} className={`absolute opacity-0 ${className}`}>
      <Icon className="w-8 h-8 text-primary/30" />
    </div>
  );
};

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Title animation
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = text
        .split('')
        .map((char, i) =>
          char === ' '
            ? ' '
            : `<span class="inline-block opacity-0">${char}</span>`
        )
        .join('');

      anime({
        targets: titleRef.current.querySelectorAll('span'),
        opacity: [0, 1],
        translateY: [50, 0],
        rotateX: [-90, 0],
        duration: 1200,
        delay: anime.stagger(50, { start: 300 }),
        easing: 'easeOutExpo',
      });
    }

    // Subtitle animation
    if (subtitleRef.current) {
      anime({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 1000,
        easing: 'easeOutExpo',
      });
    }

    // Cards animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.tutorial-card');
      anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        delay: anime.stagger(150, { start: 1400 }),
        easing: 'easeOutExpo',
      });
    }
  }, [mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 159, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 159, 1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating icons */}
      <FloatingIcon Icon={Container} className="top-[15%] left-[10%]" delay={0} />
      <FloatingIcon Icon={Layers} className="top-[20%] right-[15%]" delay={400} />
      <FloatingIcon Icon={Network} className="bottom-[30%] left-[8%]" delay={800} />
      <FloatingIcon Icon={Server} className="bottom-[25%] right-[12%]" delay={1200} />
      <FloatingIcon Icon={Rocket} className="top-[40%] left-[5%]" delay={1600} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1
              ref={titleRef}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight mb-4"
              style={{ perspective: '1000px' }}
            >
              Learn DevOps
            </h1>
            <div
              ref={subtitleRef}
              className="text-xl md:text-2xl font-mono text-muted opacity-0"
            >
              인터랙티브 튜토리얼로 배우는 컨테이너 기술
            </div>
          </div>

          {/* Tutorial Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tutorials.map((tutorial) => {
              const Icon = tutorial.icon;
              const isPrimary = tutorial.color === 'primary';
              const isSecondary = tutorial.color === 'secondary';
              
              const cardContent = (
                <div className={`tutorial-card relative group h-full p-8 rounded-2xl border-2 transition-all duration-300 ${
                  tutorial.comingSoon
                    ? 'border-muted/30 bg-surface/50 cursor-not-allowed opacity-60'
                    : isPrimary
                    ? 'border-primary/30 bg-surface/50 hover:border-primary/60 hover:bg-surface/70 cursor-pointer'
                    : isSecondary
                    ? 'border-secondary/30 bg-surface/50 hover:border-secondary/60 hover:bg-surface/70 cursor-pointer'
                    : 'border-muted/30 bg-surface/50 hover:border-primary/60 hover:bg-surface/70 cursor-pointer'
                }`}>
                  {/* Icon */}
                  <div className={`mb-6 w-16 h-16 rounded-xl flex items-center justify-center ${
                    isPrimary
                      ? 'bg-primary/20 text-primary'
                      : isSecondary
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-text mb-3 font-mono">
                    {tutorial.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted text-lg mb-4">
                    {tutorial.description}
                  </p>

                  {/* Coming Soon Badge */}
                  {tutorial.comingSoon && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning/20 text-warning text-sm font-mono">
                      <span>Coming Soon</span>
                    </div>
                  )}

                  {/* Arrow indicator */}
                  {!tutorial.comingSoon && (
                    <div className={`mt-4 flex items-center gap-2 ${
                      isPrimary ? 'text-primary' : isSecondary ? 'text-secondary' : 'text-primary'
                    }`}>
                      <span className="text-sm font-mono">시작하기</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}

                  {/* Hover glow effect */}
                  {!tutorial.comingSoon && (
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity ${
                      isPrimary ? 'glow-primary' : 'glow-secondary'
                    } pointer-events-none`} />
                  )}
                </div>
              );

              if (tutorial.comingSoon) {
                return <div key={tutorial.id}>{cardContent}</div>;
              }

              return (
                <Link key={tutorial.id} href={tutorial.href}>
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 px-4 border-t border-muted/20 w-full max-w-4xl mx-auto">
          <div className="text-center text-sm text-muted font-mono space-y-2">
            <div>DevOps Made Easy — Interactive Tutorials</div>
            <div>
              Built by{' '}
              <a
                href="https://github.com/chominnn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                chominn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
