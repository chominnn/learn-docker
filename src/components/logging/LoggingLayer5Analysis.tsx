'use client';

import { FadeIn } from '@/components/ui';

export function LoggingLayer5Analysis() {
  return (
    <section id="logging-layer-5" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">로그 분석</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            로그를 분석하여 트렌드와 패턴을 파악합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">분석 기법</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">집계:</strong> 로그 수, 에러율, 응답 시간 등 집계</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">그룹화:</strong> 서비스별, 시간대별로 그룹화</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">시각화:</strong> 그래프와 차트로 트렌드 확인</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">알림:</strong> 특정 패턴 감지 시 자동 알림</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

