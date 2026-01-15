'use client';

import { FadeIn } from '@/components/ui';

export function CicdLayer8Monitoring() {
  return (
    <section id="cicd-layer-8" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">모니터링 & 알림</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            배포 후 애플리케이션을 모니터링하고 문제 발생 시 즉시 알림을 받습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">배포 알림</h3>
              <p className="text-muted mb-4">
                배포 성공/실패를 Slack, Email, Teams 등으로 알림을 받습니다.
              </p>
              <ul className="space-y-2 text-muted text-sm">
                <li>• 배포 시작 알림</li>
                <li>• 배포 성공 알림</li>
                <li>• 배포 실패 알림 (에러 메시지 포함)</li>
                <li>• 롤백 알림</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">애플리케이션 모니터링</h3>
              <p className="text-muted mb-4">
                배포 후 애플리케이션의 성능과 상태를 지속적으로 모니터링합니다.
              </p>
              <ul className="space-y-2 text-muted text-sm">
                <li>• 응답 시간 (Response Time)</li>
                <li>• 에러율 (Error Rate)</li>
                <li>• CPU/메모리 사용량</li>
                <li>• 트래픽 패턴</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-muted/30">
              <h3 className="text-2xl font-mono text-text mb-4">모니터링 도구</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
                  <div className="text-muted mb-2">인프라 모니터링</div>
                  <div className="text-text">Prometheus, Grafana, Datadog</div>
                </div>
                <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
                  <div className="text-muted mb-2">로그 관리</div>
                  <div className="text-text">ELK Stack, Splunk, Loki</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

