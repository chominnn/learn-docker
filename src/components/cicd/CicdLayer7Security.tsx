'use client';

import { FadeIn } from '@/components/ui';

export function CicdLayer7Security() {
  return (
    <section id="cicd-layer-7" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">보안 & 스캔</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            코드와 의존성의 보안 취약점을 자동으로 검사하고 수정합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">정적 코드 분석 (SAST)</h3>
              <p className="text-muted mb-4">
                소스 코드를 분석하여 보안 취약점을 찾습니다. 컴파일 전에 실행됩니다.
              </p>
              <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
                <div className="text-muted">예시: SonarQube, CodeQL, Semgrep</div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">의존성 스캔 (Dependency Scan)</h3>
              <p className="text-muted mb-4">
                사용 중인 라이브러리와 패키지의 알려진 취약점을 검사합니다.
              </p>
              <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
                <div className="text-muted">예시: npm audit, Snyk, OWASP Dependency-Check</div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">컨테이너 보안 스캔</h3>
              <p className="text-muted mb-4">
                Docker 이미지의 취약점을 검사하고 보안 모범 사례를 확인합니다.
              </p>
              <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
                <div className="text-muted">예시: Trivy, Clair, Aqua Security</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

