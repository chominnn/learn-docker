'use client';

import { FadeIn } from '@/components/ui';

export function CicdLayer6Testing() {
  return (
    <section id="cicd-layer-6" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">테스트 자동화</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            CI/CD 파이프라인에 다양한 테스트를 통합하여 품질을 보장합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">단위 테스트 (Unit Test)</h3>
              <p className="text-muted mb-4">
                개별 함수와 컴포넌트를 독립적으로 테스트합니다. 가장 빠르고 많이 실행되는 테스트입니다.
              </p>
              <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
                <div className="text-muted">예시: Jest, Mocha, pytest</div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">통합 테스트 (Integration Test)</h3>
              <p className="text-muted mb-4">
                여러 컴포넌트가 함께 작동하는지 테스트합니다. 데이터베이스, API 등을 포함합니다.
              </p>
              <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
                <div className="text-muted">예시: Supertest, Postman, REST Assured</div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">E2E 테스트 (End-to-End Test)</h3>
              <p className="text-muted mb-4">
                사용자 시나리오를 시뮬레이션하여 전체 애플리케이션을 테스트합니다.
              </p>
              <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
                <div className="text-muted">예시: Cypress, Playwright, Selenium</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

