'use client';

import { FadeIn } from '@/components/ui';
import { StateVisualizer } from './simulations/StateVisualizer';

export function IacLayer3State() {
  return (
    <section id="iac-layer-3" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">State</span> 관리
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Terraform State는 실제 인프라와 코드 간의 매핑을 저장합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">State의 역할</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">매핑:</strong> 리소스 블록과 실제 인프라 객체를 연결</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">의존성:</strong> 리소스 간 의존성 추적</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">성능:</strong> 전체 인프라 스캔 없이 변경사항만 확인</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">동시성:</strong> State Locking으로 동시 수정 방지</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            State 관리 시뮬레이션
          </h3>
          <StateVisualizer />
        </FadeIn>
      </div>
    </section>
  );
}

