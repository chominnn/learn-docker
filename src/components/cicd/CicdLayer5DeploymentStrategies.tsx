'use client';

import { FadeIn } from '@/components/ui';
import { DeploymentStrategyComparator } from './simulations/DeploymentStrategyComparator';

export function CicdLayer5DeploymentStrategies() {
  return (
    <section id="cicd-layer-5" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">배포 전략</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            안전하고 효율적인 배포를 위한 다양한 전략을 배웁니다.
          </p>
        </FadeIn>

        {/* Deployment Strategies */}
        <FadeIn delay={0.2} className="mb-12">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-xl font-mono text-text mb-4">Blue-Green 배포</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>• 두 환경(Blue/Green)을 동시에 운영</li>
                <li>• 새 버전을 Green에 배포 후 트래픽 전환</li>
                <li>• 문제 발생 시 즉시 Blue로 롤백</li>
                <li>• 다운타임 없이 배포 가능</li>
              </ul>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-xl font-mono text-text mb-4">Canary 배포</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>• 소수 서버에 새 버전 배포</li>
                <li>• 점진적으로 트래픽 전환 (5% → 25% → 50% → 100%)</li>
                <li>• 문제 발견 시 즉시 중단</li>
                <li>• 리소스 효율적</li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Interactive Deployment Strategy Comparator */}
        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            배포 전략 비교 시뮬레이션
          </h3>
          <DeploymentStrategyComparator />
        </FadeIn>
      </div>
    </section>
  );
}

