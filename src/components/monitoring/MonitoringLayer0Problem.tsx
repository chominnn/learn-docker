'use client';

import { FadeIn } from '@/components/ui';

export function MonitoringLayer0Problem() {
  return (
    <section id="monitoring-layer-0" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            왜 <span className="text-primary">모니터링</span>이 필요할까?
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            문제가 발생한 후 알게 되는 것은 너무 늦습니다. 실시간 모니터링으로 문제를 예방하세요.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h2 className="text-2xl font-mono text-text mb-4">모니터링 없이 운영할 때의 문제</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>문제가 발생한 후에야 알 수 있음</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>성능 저하의 원인을 파악하기 어려움</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>장애 발생 시 빠른 대응이 어려움</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>용량 계획 수립이 어려움</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>사용자 불만이 먼저 발생</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-surface rounded-xl p-8 border border-primary/30">
            <h2 className="text-2xl font-mono text-primary mb-4">모니터링의 해결책</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">실시간 감시:</strong> 문제를 즉시 감지하고 알림</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">성능 분석:</strong> 메트릭을 통해 병목 지점 파악</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">예측:</strong> 트렌드를 분석하여 문제 예방</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">용량 계획:</strong> 리소스 사용 패턴 분석</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">사용자 경험:</strong> 문제 발생 전 선제적 대응</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

