'use client';

import { FadeIn } from '@/components/ui';
import { Box } from 'lucide-react';
import { PodVsContainer } from './simulations/PodVsContainer';

export function K8sLayer1Pods() {
  return (
    <section id="k8s-layer-1" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Pod</span> 기본 개념
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Pod는 Kubernetes에서 가장 작은 배포 단위입니다. 하나 이상의 컨테이너를 포함할 수 있습니다.
          </p>
        </FadeIn>

        {/* Pod explanation */}
        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-24 bg-secondary/20 border-2 border-secondary rounded-lg flex items-center justify-center">
                  <Box className="w-12 h-12 text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-mono text-text mb-2">
                  Pod란?
                </h3>
                <p className="text-muted">
                  Pod는 <span className="text-secondary">하나 이상의 컨테이너 그룹</span>으로, 
                  같은 네트워크와 스토리지를 공유합니다. Pod 안의 컨테이너들은 
                  <span className="text-secondary">항상 함께 배포되고 함께 스케일링</span>됩니다.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Pod vs Container Comparison */}
        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            Pod vs Container 비교
          </h3>
          <PodVsContainer />
        </FadeIn>

        {/* Key concepts */}
        <FadeIn delay={0.4}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-lg font-mono text-text mb-3">Pod의 특징</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>• 하나의 IP 주소 공유</li>
                <li>• 같은 볼륨 공유</li>
                <li>• 같은 호스트에 배포</li>
                <li>• 함께 시작/종료</li>
              </ul>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-lg font-mono text-text mb-3">일반적인 사용</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>• 단일 컨테이너 Pod (가장 일반적)</li>
                <li>• 메인 컨테이너 + 사이드카 컨테이너</li>
                <li>• 로그 수집, 프록시 등</li>
                <li>• 밀접하게 결합된 컨테이너들</li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

