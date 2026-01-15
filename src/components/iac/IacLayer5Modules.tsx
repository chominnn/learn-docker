'use client';

import { FadeIn } from '@/components/ui';

export function IacLayer5Modules() {
  return (
    <section id="iac-layer-5" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Modules</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Module은 재사용 가능한 Terraform 코드 조각입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">Module의 장점</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">재사용성:</strong> 공통 인프라 패턴을 모듈로 만들어 재사용</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">추상화:</strong> 복잡한 설정을 간단한 인터페이스로 제공</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">유지보수:</strong> 한 곳에서 수정하면 모든 곳에 적용</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">공유:</strong> Terraform Registry에서 모듈 공유</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-terminal rounded-xl p-6 font-mono text-sm">
            <div className="text-muted mb-4">예시: Module 사용</div>
            <pre className="text-text overflow-x-auto">
{`module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "my-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["ap-northeast-2a", "ap-northeast-2c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
}`}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

