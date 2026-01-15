'use client';

import { FadeIn } from '@/components/ui';
import { TerraformResourceBuilder } from './simulations/TerraformResourceBuilder';
import { ManualVsTerraformComparison } from './simulations/ManualVsTerraformComparison';

export function IacLayer1Basics() {
  return (
    <section id="iac-layer-1" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">IaC</span> 기본 개념
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Infrastructure as Code는 코드로 인프라를 정의하고 관리하는 방법입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 개념</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center font-mono font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="text-lg font-semibold text-text mb-1">선언적 정의 (Declarative)</h4>
                  <p className="text-muted">원하는 상태를 선언하고, 도구가 현재 상태를 목표 상태로 만듭니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center font-mono font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="text-lg font-semibold text-text mb-1">버전 관리</h4>
                  <p className="text-muted">Git과 같은 버전 관리 시스템으로 인프라 코드를 관리합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center font-mono font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="text-lg font-semibold text-text mb-1">재현성</h4>
                  <p className="text-muted">동일한 코드로 동일한 인프라를 언제든지 재현할 수 있습니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center font-mono font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="text-lg font-semibold text-text mb-1">자동화</h4>
                  <p className="text-muted">CI/CD 파이프라인과 통합하여 자동으로 인프라를 배포합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Comparison: Manual vs Terraform */}
        <FadeIn delay={0.3} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            수동 배포 vs Terraform 배포 비교
          </h3>
          <ManualVsTerraformComparison />
        </FadeIn>

        {/* Interactive Terraform Builder */}
        <FadeIn delay={0.4} className="mb-12">
          <h3 className="text-xl font-mono text-text mb-6 text-center">
            Terraform 리소스 빌더 체험
          </h3>
          <TerraformResourceBuilder />
        </FadeIn>
      </div>
    </section>
  );
}

