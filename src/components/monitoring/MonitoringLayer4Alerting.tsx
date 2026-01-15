'use client';

import { FadeIn } from '@/components/ui';
import { AlertSystem } from './simulations/AlertSystem';

export function MonitoringLayer4Alerting() {
  return (
    <section id="monitoring-layer-4" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">알림</span> 시스템
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            임계값을 초과하면 즉시 알림을 받아 빠르게 대응할 수 있습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">알림 규칙 예시</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-warning mt-1">⚠</span>
                <span><strong className="text-text">CPU 사용률:</strong> 80% 초과 시 경고</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">🔴</span>
                <span><strong className="text-text">메모리 사용량:</strong> 90% 초과 시 즉시 알림</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">🔴</span>
                <span><strong className="text-text">응답 시간:</strong> 1초 초과 시 알림</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-warning mt-1">⚠</span>
                <span><strong className="text-text">에러율:</strong> 1% 초과 시 경고</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            알림 시스템 시뮬레이션
          </h3>
          <AlertSystem />
        </FadeIn>
      </div>
    </section>
  );
}

