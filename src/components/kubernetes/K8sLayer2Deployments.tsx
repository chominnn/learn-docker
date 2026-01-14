'use client';

import { FadeIn } from '@/components/ui';
import { DeploymentScaler } from './simulations/DeploymentScaler';

export function K8sLayer2Deployments() {
  return (
    <section id="k8s-layer-2" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Deployment</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Deployment는 Pod의 배포와 업데이트를 관리합니다. 원하는 Pod 수를 유지하고 롤링 업데이트를 제공합니다.
          </p>
        </FadeIn>

        {/* Deployment Scaling Simulator */}
        <FadeIn delay={0.2} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            Deployment 스케일링 체험
          </h3>
          <DeploymentScaler />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-xl font-mono text-text mb-4">Deployment의 주요 기능</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">ReplicaSet 관리:</strong> 지정한 수의 Pod 복제본 유지</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">롤링 업데이트:</strong> 무중단으로 새 버전 배포</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">롤백:</strong> 문제 발생 시 이전 버전으로 복구</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">스케일링:</strong> Pod 개수 조정</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

