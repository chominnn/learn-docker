'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Activity, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

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

export function MonitoringHeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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

    // Description animation
    if (descRef.current) {
      anime({
        targets: descRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 1400,
        easing: 'easeOutExpo',
      });
    }

    // Button animation
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 1800,
        easing: 'easeOutExpo',
      });
    }

    // Scroll indicator animation
    if (scrollRef.current) {
      anime({
        targets: scrollRef.current,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        delay: 2200,
        easing: 'easeOutExpo',
      });
    }
  }, [mounted]);

  const scrollToContent = () => {
    const firstSection = document.getElementById('monitoring-layer-0');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
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
      <FloatingIcon Icon={Activity} className="top-[15%] left-[10%]" delay={0} />
      <FloatingIcon Icon={BarChart3} className="top-[20%] right-[15%]" delay={400} />
      <FloatingIcon Icon={TrendingUp} className="bottom-[30%] left-[8%]" delay={800} />
      <FloatingIcon Icon={AlertTriangle} className="bottom-[25%] right-[12%]" delay={1200} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="text-center relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight mb-4"
          style={{ perspective: '1000px' }}
        >
          모니터링
        </h1>
        <div className="text-xl md:text-2xl font-bold text-text tracking-wide">
          Made Easy
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="text-lg md:text-2xl font-mono text-muted mb-6 opacity-0 mt-4"
        >
          Learn Monitoring & Observability
        </div>

        {/* Tagline */}
        <p
          ref={descRef}
          className="text-base md:text-lg text-muted/70 max-w-xl mx-auto mb-12 opacity-0"
        >
          시스템 상태를 실시간으로 모니터링하고 문제를 조기에 발견하세요.
          <br />
          Prometheus, Grafana로 메트릭과 대시보드를 관리하세요.
        </p>

        {/* Start button */}
        <div ref={buttonRef} className="opacity-0 mb-16 cursor-pointer">
          <div 
            onClick={scrollToContent}
            className="inline-flex items-center gap-4 bg-surface/50 backdrop-blur-sm border border-primary/30 rounded-2xl px-8 py-6 hover:border-primary/60 transition-colors group"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors font-mono text-primary text-2xl">
                ▶
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full" />
            </div>
            <div className="text-left">
              <div className="text-primary font-mono text-sm mb-1">prometheus --config.file=prometheus.yml</div>
              <div className="text-text font-semibold">시작하기</div>
            </div>
            <div className="ml-4 text-primary">
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 cursor-pointer"
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center gap-3 text-muted hover:text-primary transition-colors">
          <span className="text-sm font-mono">스크롤하여 시작</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

