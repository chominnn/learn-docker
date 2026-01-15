'use client';

import { FadeIn } from '@/components/ui';

export function LoggingLayer3Fluentd() {
  return (
    <section id="logging-layer-3" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">Fluentd / Fluent Bit</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            로그 수집 및 전송을 위한 오픈소스 도구입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 특징</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-text mb-3">Fluentd</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• 다양한 입력/출력 플러그인</li>
                  <li>• 로그 파싱 및 변환</li>
                  <li>• 라우팅 및 필터링</li>
                  <li>• 버퍼링 및 재시도</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text mb-3">Fluent Bit</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• 경량 버전 (더 적은 리소스)</li>
                  <li>• 컨테이너 환경에 최적화</li>
                  <li>• 빠른 처리 속도</li>
                  <li>• Kubernetes DaemonSet으로 실행</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-terminal rounded-xl p-6 font-mono text-sm">
            <div className="text-muted mb-4">예시: Fluentd 설정</div>
            <pre className="text-text overflow-x-auto">
{`<source>
  @type tail
  path /var/log/app.log
  pos_file /var/log/app.log.pos
  tag app.logs
</source>

<filter app.logs>
  @type parser
  key_name message
  format json
</filter>

<match app.logs>
  @type elasticsearch
  host localhost
  port 9200
  index_name app-logs
</match>`}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

