'use client';

import { FadeIn } from '@/components/ui';

export function LoggingLayer6BestPractices() {
  return (
    <section id="logging-layer-6" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">로깅 모범 사례</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            효과적인 로깅을 위한 모범 사례를 배웁니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">구조화된 로깅</h3>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span>JSON 형식으로 로그 구조화</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span>일관된 필드명 사용 (timestamp, level, service, message)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span>컨텍스트 정보 포함 (request ID, user ID 등)</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">로그 레벨 사용</h3>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span><strong className="text-text">DEBUG:</strong> 개발 중 디버깅 정보</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span><strong className="text-text">INFO:</strong> 일반적인 정보성 메시지</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span><strong className="text-text">WARN:</strong> 경고 메시지</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span><strong className="text-text">ERROR:</strong> 에러 발생 시</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">성능 고려사항</h3>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span>과도한 로깅 피하기</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span>비동기 로깅 사용</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span>로그 로테이션 설정</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span>민감한 정보는 로그하지 않기</span>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

