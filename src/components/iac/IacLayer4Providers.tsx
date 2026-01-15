'use client';

import { FadeIn } from '@/components/ui';

export function IacLayer4Providers() {
  return (
    <section id="iac-layer-4" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Providers</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Provider는 클라우드 플랫폼이나 서비스를 Terraform과 연결합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-xl font-mono text-text mb-4">AWS</h3>
              <p className="text-muted text-sm mb-4">Amazon Web Services</p>
              <div className="bg-terminal rounded-lg p-3 font-mono text-xs">
                provider "aws"
              </div>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-xl font-mono text-text mb-4">Azure</h3>
              <p className="text-muted text-sm mb-4">Microsoft Azure</p>
              <div className="bg-terminal rounded-lg p-3 font-mono text-xs">
                provider "azurerm"
              </div>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-muted/30">
              <h3 className="text-xl font-mono text-text mb-4">GCP</h3>
              <p className="text-muted text-sm mb-4">Google Cloud Platform</p>
              <div className="bg-terminal rounded-lg p-3 font-mono text-xs">
                provider "google"
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

