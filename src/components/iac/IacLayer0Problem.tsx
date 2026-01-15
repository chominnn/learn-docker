'use client';

import { FadeIn } from '@/components/ui';

export function IacLayer0Problem() {
  return (
    <section id="iac-layer-0" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            왜 <span className="text-secondary">IaC</span>가 필요할까?
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            수동 인프라 관리는 실수와 비효율을 유발합니다. 코드로 인프라를 관리하세요.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h2 className="text-2xl font-mono text-text mb-4">수동 인프라 관리의 문제점</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>서버, 네트워크, 스토리지를 수동으로 구성해야 함</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>환경 간 불일치로 인한 문제 발생</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>인프라 변경 사항을 추적하기 어려움</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>롤백과 재현이 어려움</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>팀 간 협업이 어렵고 문서화 부족</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-surface rounded-xl p-8 border border-secondary/30">
            <h2 className="text-2xl font-mono text-secondary mb-4">IaC의 해결책</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">코드로 관리:</strong> 버전 관리와 코드 리뷰 가능</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">일관성:</strong> 동일한 코드로 동일한 인프라 생성</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">재현성:</strong> 언제든지 동일한 환경 재현 가능</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">자동화:</strong> CI/CD와 통합하여 자동 배포</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">협업:</strong> Git을 통한 팀 협업과 문서화</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

