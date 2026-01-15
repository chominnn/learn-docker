'use client';

import { FadeIn } from '@/components/ui';

export function LoggingLayer2Loki() {
  return (
    <section id="logging-layer-2" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Loki</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Grafana Labs의 경량 로그 집계 시스템입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 특징</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">경량:</strong> Elasticsearch보다 리소스 사용량이 적음</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">Grafana 통합:</strong> Grafana와 완벽하게 통합</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">LogQL:</strong> PromQL과 유사한 쿼리 언어</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">라벨 기반:</strong> Prometheus와 동일한 라벨 시스템</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-terminal rounded-xl p-6 font-mono text-sm">
            <div className="text-muted mb-4">예시: LogQL 쿼리</div>
            <pre className="text-text overflow-x-auto">
{`# 특정 레이블의 로그 검색
{app="web-server"} 

# 에러 로그 필터링
{app="web-server"} |= "error"

# 특정 시간 범위
{app="web-server"} [5m]

# 집계
sum(count_over_time({app="web-server"}[5m]))`}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

