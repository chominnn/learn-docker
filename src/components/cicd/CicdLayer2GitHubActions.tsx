'use client';

import { FadeIn } from '@/components/ui';
import { GitHubActionsSimulator } from './simulations/GitHubActionsSimulator';

export function CicdLayer2GitHubActions() {
  return (
    <section id="cicd-layer-2" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">GitHub Actions</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            GitHub에서 제공하는 CI/CD 플랫폼으로, 코드와 동일한 저장소에서 워크플로우를 관리합니다.
          </p>
        </FadeIn>

        {/* GitHub Actions Features */}
        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 특징</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">YAML 기반:</strong> `.github/workflows/` 디렉토리에 워크플로우 정의</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">다양한 트리거:</strong> Push, Pull Request, Schedule 등</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">무료:</strong> Public 저장소는 무제한, Private 저장소는 월 2,000분 무료</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">통합:</strong> GitHub과 완벽하게 통합되어 사용하기 쉬움</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Interactive GitHub Actions Simulator */}
        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            GitHub Actions 워크플로우 시뮬레이션
          </h3>
          <GitHubActionsSimulator />
        </FadeIn>
      </div>
    </section>
  );
}

