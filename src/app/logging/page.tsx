'use client';

import Link from 'next/link';
import {
  LoggingHeroSection,
  LoggingLayer0Problem,
  LoggingLayer1ELK,
  LoggingLayer2Loki,
  LoggingLayer3Fluentd,
  LoggingLayer4Search,
  LoggingLayer5Analysis,
  LoggingLayer6BestPractices,
} from '@/components/logging';

export default function LoggingPage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Navigation to Home */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-sm border border-muted/30 rounded-lg text-muted hover:text-secondary hover:border-secondary/50 transition-colors font-mono text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          메인으로
        </Link>
      </div>

      {/* Hero Section */}
      <LoggingHeroSection />

      {/* All Layers */}
      <LoggingLayer0Problem />
      <LoggingLayer1ELK />
      <LoggingLayer2Loki />
      <LoggingLayer3Fluentd />
      <LoggingLayer4Search />
      <LoggingLayer5Analysis />
      <LoggingLayer6BestPractices />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-muted/20">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted font-mono space-y-2">
          <div>Logging Made Easy — Learn Log Management</div>
          <div>
            Built by{' '}
            <a
              href="https://github.com/chominnn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              chominn
            </a>
            {' · '}
            <a
              href="https://linkedin.com/in/chominn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

