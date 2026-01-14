'use client';

import { FadeIn } from '@/components/ui';

export function K8sLayer5Ingress() {
  return (
    <section id="k8s-layer-5" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Ingress</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Ingress는 HTTP/HTTPS 트래픽을 클러스터 내부의 Service로 라우팅합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-xl font-mono text-text mb-4">Ingress의 역할</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">도메인 기반 라우팅:</strong> 같은 IP로 여러 도메인 처리</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">SSL/TLS 종료:</strong> HTTPS 인증서 관리</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-text">로드 밸런싱:</strong> 트래픽 분산</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

