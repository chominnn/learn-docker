'use client';

import { FadeIn } from '@/components/ui';
import { LogSearch } from './simulations/LogSearch';

export function LoggingLayer4Search() {
  return (
    <section id="logging-layer-4" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">로그 검색</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            강력한 검색 기능으로 원하는 로그를 빠르게 찾습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">검색 기법</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">전문 검색:</strong> 로그 내용에서 키워드 검색</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">필드 검색:</strong> 특정 필드 값으로 필터링</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">시간 범위:</strong> 특정 시간대의 로그만 검색</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">정규식:</strong> 복잡한 패턴 매칭</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            로그 검색 시뮬레이션
          </h3>
          <LogSearch />
        </FadeIn>
      </div>
    </section>
  );
}

