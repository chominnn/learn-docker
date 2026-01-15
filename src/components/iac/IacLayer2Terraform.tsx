'use client';

import { FadeIn } from '@/components/ui';

export function IacLayer2Terraform() {
  return (
    <section id="iac-layer-2" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Terraform</span> 기초
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            HashiCorp의 Terraform은 가장 인기 있는 IaC 도구입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 특징</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">HCL 언어:</strong> 간단하고 읽기 쉬운 선언적 언어</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">멀티 클라우드:</strong> AWS, Azure, GCP 등 다양한 Provider 지원</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">State 관리:</strong> 인프라 상태를 추적하고 관리</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✓</span>
                <span><strong className="text-text">Plan & Apply:</strong> 변경사항 미리보기 후 적용</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-terminal rounded-xl p-6 font-mono text-sm">
            <div className="text-muted mb-4">예시: main.tf</div>
            <pre className="text-text overflow-x-auto">
{`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
  }
}`}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

