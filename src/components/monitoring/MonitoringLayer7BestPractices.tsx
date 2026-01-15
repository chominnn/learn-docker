'use client';

import { FadeIn } from '@/components/ui';

export function MonitoringLayer7BestPractices() {
  return (
    <section id="monitoring-layer-7" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">모니터링 모범 사례</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            효과적인 모니터링을 위한 모범 사례를 배웁니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">The Four Golden Signals</h3>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">1.</span>
                  <span><strong className="text-text">Latency (지연 시간):</strong> 요청 처리에 걸리는 시간</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">2.</span>
                  <span><strong className="text-text">Traffic (트래픽):</strong> 시스템에 들어오는 요청량</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">3.</span>
                  <span><strong className="text-text">Errors (에러):</strong> 실패한 요청 비율</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">4.</span>
                  <span><strong className="text-text">Saturation (포화도):</strong> 리소스 사용률</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">알림 설정 원칙</h3>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>중요한 것만 알림: 너무 많은 알림은 오히려 무시됨</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>임계값 설정: 경고와 심각 알림을 구분</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>알림 해결 추적: 알림이 처리되었는지 확인</span>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

