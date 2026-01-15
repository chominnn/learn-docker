'use client';

import { FadeIn } from '@/components/ui';

export function IacLayer6Workspaces() {
  return (
    <section id="iac-layer-6" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Workspaces</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Workspace를 사용하여 동일한 코드로 여러 환경을 관리합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">Workspace 사용 사례</h3>
            <div className="space-y-4">
              <div className="p-4 bg-terminal rounded-lg">
                <div className="font-mono text-sm text-text mb-2">개발 환경 (dev)</div>
                <div className="text-muted text-sm">terraform workspace select dev</div>
              </div>
              <div className="p-4 bg-terminal rounded-lg">
                <div className="font-mono text-sm text-text mb-2">스테이징 환경 (staging)</div>
                <div className="text-muted text-sm">terraform workspace select staging</div>
              </div>
              <div className="p-4 bg-terminal rounded-lg">
                <div className="font-mono text-sm text-text mb-2">프로덕션 환경 (prod)</div>
                <div className="text-muted text-sm">terraform workspace select prod</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

