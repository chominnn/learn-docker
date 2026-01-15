'use client';

import { FadeIn } from '@/components/ui';
import { PipelineBuilder } from './simulations/PipelineBuilder';

export function CicdLayer1Pipeline() {
  return (
    <section id="cicd-layer-1" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">CI/CD 파이프라인</span> 기본
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            CI/CD 파이프라인은 코드를 자동으로 빌드, 테스트, 배포하는 워크플로우입니다.
          </p>
        </FadeIn>

        {/* Pipeline Stages */}
        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">파이프라인 단계</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-mono font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="text-lg font-semibold text-text mb-1">Source (소스)</h4>
                  <p className="text-muted">코드 변경사항을 Git 저장소에 커밋하고 푸시</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-mono font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="text-lg font-semibold text-text mb-1">Build (빌드)</h4>
                  <p className="text-muted">코드를 컴파일하고 실행 파일 생성</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-mono font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="text-lg font-semibold text-text mb-1">Test (테스트)</h4>
                  <p className="text-muted">단위 테스트, 통합 테스트 실행</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-mono font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="text-lg font-semibold text-text mb-1">Deploy (배포)</h4>
                  <p className="text-muted">테스트 통과 시 프로덕션 환경에 배포</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Interactive Pipeline Builder */}
        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            파이프라인 빌더 체험
          </h3>
          <PipelineBuilder />
        </FadeIn>
      </div>
    </section>
  );
}

