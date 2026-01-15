'use client';

import { FadeIn } from '@/components/ui';
import { MetricsDashboard } from './simulations/MetricsDashboard';

export function MonitoringLayer1Metrics() {
  return (
    <section id="monitoring-layer-1" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">메트릭</span> 수집
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            메트릭은 시스템의 상태를 나타내는 수치 데이터입니다. CPU, 메모리, 네트워크 등을 측정합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 메트릭</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold text-text mb-2">인프라 메트릭</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• CPU 사용률</li>
                  <li>• 메모리 사용량</li>
                  <li>• 디스크 I/O</li>
                  <li>• 네트워크 트래픽</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text mb-2">애플리케이션 메트릭</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• 요청 수 (Request Rate)</li>
                  <li>• 응답 시간 (Latency)</li>
                  <li>• 에러율 (Error Rate)</li>
                  <li>• 처리량 (Throughput)</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            메트릭 대시보드 체험
          </h3>
          <MetricsDashboard />
        </FadeIn>
      </div>
    </section>
  );
}

