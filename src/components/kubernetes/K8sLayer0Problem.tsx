'use client';

import { FadeIn } from '@/components/ui';

export function K8sLayer0Problem() {
  return (
    <section id="k8s-layer-0" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Opening */}
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            왜 <span className="text-secondary">Kubernetes</span>가 필요할까?
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Docker 컨테이너만으로는 충분하지 않습니다. 대규모 애플리케이션을 관리하려면 오케스트레이션이 필요합니다.
          </p>
        </FadeIn>

        {/* Problem explanation */}
        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h2 className="text-2xl font-mono text-text mb-4">Docker의 한계</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>여러 서버에 컨테이너를 수동으로 배포해야 함</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>컨테이너가 다운되면 자동으로 재시작하지 않음</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>로드 밸런싱과 서비스 디스커버리가 복잡함</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger mt-1">×</span>
                <span>스케일링과 롤링 업데이트가 어려움</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Solution */}
        <FadeIn delay={0.4}>
          <div className="bg-surface rounded-xl p-8 border border-secondary/30">
            <h2 className="text-2xl font-mono text-secondary mb-4">Kubernetes의 해결책</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">자동 배포:</strong> 여러 노드에 자동으로 컨테이너 배포</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">자동 복구:</strong> 실패한 컨테이너 자동 재시작</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">서비스 디스커버리:</strong> 자동으로 서비스 찾기</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">스케일링:</strong> 필요에 따라 자동으로 확장/축소</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">롤링 업데이트:</strong> 무중단 업데이트</span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

