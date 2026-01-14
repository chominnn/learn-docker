'use client';

import { FadeIn } from '@/components/ui';

export function K8sLayer8Advanced() {
  return (
    <section id="k8s-layer-8" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            고급 <span className="text-secondary">주제</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Kubernetes의 고급 기능들을 알아봅시다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-lg font-mono text-text mb-3">자동 스케일링</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>• HorizontalPodAutoscaler (HPA)</li>
                <li>• VerticalPodAutoscaler (VPA)</li>
                <li>• ClusterAutoscaler</li>
              </ul>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-lg font-mono text-text mb-3">StatefulSets</h3>
              <p className="text-muted text-sm">상태를 가지는 애플리케이션을 위한 워크로드</p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-lg font-mono text-text mb-3">DaemonSets</h3>
              <p className="text-muted text-sm">모든 노드에 하나씩 실행되는 Pod</p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-lg font-mono text-text mb-3">Jobs & CronJobs</h3>
              <p className="text-muted text-sm">일회성 작업과 주기적 작업 실행</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

