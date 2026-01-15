'use client';

import { FadeIn } from '@/components/ui';

export function MonitoringLayer3Grafana() {
  return (
    <section id="monitoring-layer-3" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">Grafana</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            메트릭을 시각화하고 대시보드를 만드는 도구입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 특징</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">다양한 데이터 소스:</strong> Prometheus, InfluxDB, Elasticsearch 등</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">대시보드:</strong> 드래그 앤 드롭으로 대시보드 구성</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">알림:</strong> 임계값 초과 시 알림 전송</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">공유:</strong> 대시보드 JSON을 공유하여 재사용</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

