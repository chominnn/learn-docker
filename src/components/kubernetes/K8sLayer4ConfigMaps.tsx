'use client';

import { FadeIn } from '@/components/ui';

export function K8sLayer4ConfigMaps() {
  return (
    <section id="k8s-layer-4" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">ConfigMap</span> & <span className="text-secondary">Secret</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            설정과 민감한 정보를 컨테이너 이미지와 분리하여 관리합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-lg font-mono text-text mb-3">ConfigMap</h3>
              <p className="text-muted text-sm mb-3">설정 데이터 저장 (비밀번호 제외)</p>
              <ul className="space-y-1 text-muted text-sm">
                <li>• 환경 변수</li>
                <li>• 설정 파일</li>
                <li>• 명령줄 인수</li>
              </ul>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-lg font-mono text-text mb-3">Secret</h3>
              <p className="text-muted text-sm mb-3">민감한 정보 저장</p>
              <ul className="space-y-1 text-muted text-sm">
                <li>• 비밀번호</li>
                <li>• API 키</li>
                <li>• 인증서</li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

