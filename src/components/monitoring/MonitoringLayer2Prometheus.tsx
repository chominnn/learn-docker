'use client';

import { FadeIn } from '@/components/ui';

export function MonitoringLayer2Prometheus() {
  return (
    <section id="monitoring-layer-2" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">Prometheus</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            오픈소스 메트릭 수집 및 모니터링 시스템입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 특징</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">Pull 방식:</strong> Prometheus가 타겟에서 메트릭을 가져옴</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">시계열 DB:</strong> 시간별 데이터를 효율적으로 저장</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">PromQL:</strong> 강력한 쿼리 언어로 데이터 분석</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">Alerting:</strong> 조건에 따른 알림 규칙 설정</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-terminal rounded-xl p-6 font-mono text-sm">
            <div className="text-muted mb-4">예시: prometheus.yml</div>
            <pre className="text-text overflow-x-auto">
{`global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'web-app'
    static_configs:
      - targets: ['localhost:9090']

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['localhost:9093']`}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

