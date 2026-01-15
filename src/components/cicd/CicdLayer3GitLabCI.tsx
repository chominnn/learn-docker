'use client';

import { FadeIn } from '@/components/ui';

export function CicdLayer3GitLabCI() {
  return (
    <section id="cicd-layer-3" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">GitLab CI</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            GitLab에 내장된 강력한 CI/CD 도구로, 하나의 플랫폼에서 모든 DevOps 작업을 수행할 수 있습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 특징</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">.gitlab-ci.yml:</strong> 프로젝트 루트에 CI/CD 설정 파일</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">Pipeline:</strong> Stage와 Job으로 구성된 워크플로우</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">Runner:</strong> GitLab Runner로 작업 실행</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">Artifacts:</strong> 빌드 결과물 저장 및 공유</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-terminal rounded-xl p-6 font-mono text-sm">
            <div className="text-muted mb-4">예시: .gitlab-ci.yml</div>
            <pre className="text-text overflow-x-auto">
{`stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

test:
  stage: test
  script:
    - npm test

deploy:
  stage: deploy
  script:
    - npm run deploy
  only:
    - main`}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

