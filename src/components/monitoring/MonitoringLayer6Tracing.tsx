'use client';

import { FadeIn } from '@/components/ui';

export function MonitoringLayer6Tracing() {
  return (
    <section id="monitoring-layer-6" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">분산 추적</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            마이크로서비스 간의 요청 흐름을 추적하여 병목 지점을 찾습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 추적 도구</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-text">Jaeger:</strong> 오픈소스 분산 추적 시스템</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-text">Zipkin:</strong> 분산 추적 플랫폼</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-text">OpenTelemetry:</strong> 표준화된 추적 API</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

