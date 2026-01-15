'use client';

import { FadeIn } from '@/components/ui';

export function LoggingLayer0Problem() {
  return (
    <section id="logging-layer-0" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            왜 <span className="text-secondary">로깅</span>이 필요할까?
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            로그는 문제를 진단하고 시스템을 이해하는 핵심 자료입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h2 className="text-2xl font-mono text-text mb-4">로깅 없이 운영할 때의 문제</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>에러 발생 시 원인 파악이 어려움</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>여러 서버의 로그를 각각 확인해야 함</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>로그 검색 및 분석이 어려움</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>과거 로그 추적이 어려움</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>성능 문제 추적이 어려움</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-surface rounded-xl p-8 border border-secondary/30">
            <h2 className="text-2xl font-mono text-secondary mb-4">로깅 시스템의 해결책</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">중앙화:</strong> 모든 로그를 한 곳에서 수집</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">검색:</strong> 강력한 검색 기능으로 빠른 문제 발견</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">분석:</strong> 로그 패턴 분석 및 시각화</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">저장:</strong> 장기간 로그 보관 및 검색</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">알림:</strong> 중요한 로그 패턴 감지 시 알림</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

