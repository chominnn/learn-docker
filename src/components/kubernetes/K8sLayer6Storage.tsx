'use client';

import { FadeIn } from '@/components/ui';
import { StorageVisualizer } from './simulations/StorageVisualizer';

export function K8sLayer6Storage() {
  return (
    <section id="k8s-layer-6" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Storage</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Kubernetes는 다양한 스토리지 옵션을 제공합니다.
          </p>
        </FadeIn>

        {/* Storage Visualization */}
        <FadeIn delay={0.2} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            PV/PVC 바인딩 및 볼륨 마운트
          </h3>
          <StorageVisualizer />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-xl font-mono text-text mb-4">스토리지 타입</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-mono text-secondary mb-2">Volume</h4>
                <p className="text-muted text-sm">Pod와 생명주기를 공유하는 임시 스토리지</p>
              </div>
              <div>
                <h4 className="text-lg font-mono text-secondary mb-2">PersistentVolume (PV)</h4>
                <p className="text-muted text-sm">클러스터 레벨의 영구 스토리지</p>
              </div>
              <div>
                <h4 className="text-lg font-mono text-secondary mb-2">PersistentVolumeClaim (PVC)</h4>
                <p className="text-muted text-sm">Pod가 PV를 요청하는 방법</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

