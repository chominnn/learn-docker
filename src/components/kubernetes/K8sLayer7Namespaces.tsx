'use client';

import { FadeIn } from '@/components/ui';

export function K8sLayer7Namespaces() {
  return (
    <section id="k8s-layer-7" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Namespace</span> & 리소스 관리
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Namespace는 클러스터를 논리적으로 분리하여 관리합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-xl font-mono text-text mb-4">Namespace의 용도</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">리소스 격리:</strong> 팀별, 프로젝트별로 분리</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">권한 관리:</strong> RBAC으로 접근 제어</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">리소스 할당:</strong> ResourceQuota로 리소스 제한</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

