'use client';

import { FadeIn } from '@/components/ui';
import { ServiceNetworkVisualizer } from './simulations/ServiceNetworkVisualizer';

export function K8sLayer3Services() {
  return (
    <section id="k8s-layer-3" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Service</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Service는 Pod 그룹에 대한 안정적인 네트워크 엔드포인트를 제공합니다. Pod가 재시작되어도 동일한 주소로 접근할 수 있습니다.
          </p>
        </FadeIn>

        {/* Service Network Visualization */}
        <FadeIn delay={0.2} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            Service를 통한 네트워크 통신
          </h3>
          <ServiceNetworkVisualizer />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-xl font-mono text-text mb-4">Service 타입</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-mono text-secondary mb-2">ClusterIP (기본)</h4>
                <p className="text-muted text-sm">클러스터 내부에서만 접근 가능한 IP</p>
              </div>
              <div>
                <h4 className="text-lg font-mono text-secondary mb-2">NodePort</h4>
                <p className="text-muted text-sm">각 노드의 특정 포트로 외부 접근 가능</p>
              </div>
              <div>
                <h4 className="text-lg font-mono text-secondary mb-2">LoadBalancer</h4>
                <p className="text-muted text-sm">클라우드 제공자의 로드 밸런서 사용</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

