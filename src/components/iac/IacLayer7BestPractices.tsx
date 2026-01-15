'use client';

import { FadeIn } from '@/components/ui';

export function IacLayer7BestPractices() {
  return (
    <section id="iac-layer-7" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">모범 사례</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Terraform을 효과적으로 사용하기 위한 모범 사례를 배웁니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">State 관리</h3>
              <ul className="space-y-2 text-muted">
                <li>• Remote State Backend 사용 (S3, Terraform Cloud)</li>
                <li>• State Locking 활성화</li>
                <li>• State 파일을 버전 관리에 포함하지 않기</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">코드 구조</h3>
              <ul className="space-y-2 text-muted">
                <li>• 환경별 디렉토리 분리 (dev, staging, prod)</li>
                <li>• Module을 활용한 재사용성 향상</li>
                <li>• 변수(variables)와 출력(output) 적절히 사용</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">보안</h3>
              <ul className="space-y-2 text-muted">
                <li>• 민감한 정보는 변수 파일이나 환경 변수 사용</li>
                <li>• .tfvars 파일을 버전 관리에 포함하지 않기</li>
                <li>• 최소 권한 원칙 적용</li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

