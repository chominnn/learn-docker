'use client';

import { FadeIn } from '@/components/ui';

export function CicdLayer0Problem() {
  return (
    <section id="cicd-layer-0" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Opening */}
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            왜 <span className="text-primary">CI/CD</span>가 필요할까?
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            수동 배포는 실수와 지연을 유발합니다. CI/CD로 개발 워크플로우를 자동화하세요.
          </p>
        </FadeIn>

        {/* Problem explanation */}
        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h2 className="text-2xl font-mono text-text mb-4">수동 배포의 문제점</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>코드 빌드, 테스트, 배포를 수동으로 수행해야 함</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>인간의 실수로 인한 배포 오류 발생</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>배포 프로세스가 느리고 비효율적</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>환경 간 차이로 인한 문제 발생</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>롤백이 어렵고 위험함</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Solution */}
        <FadeIn delay={0.4}>
          <div className="bg-surface rounded-xl p-8 border border-primary/30">
            <h2 className="text-2xl font-mono text-primary mb-4">CI/CD의 해결책</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">자동화:</strong> 코드 커밋 시 자동으로 빌드, 테스트, 배포</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">빠른 피드백:</strong> 문제를 빠르게 발견하고 수정</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">일관성:</strong> 동일한 프로세스로 반복 가능한 배포</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">신뢰성:</strong> 자동화된 테스트로 품질 보장</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">안전한 롤백:</strong> 문제 발생 시 빠른 복구</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

