'use client';

import { FadeIn } from '@/components/ui';

export function LoggingLayer1ELK() {
  return (
    <section id="logging-layer-1" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-secondary">ELK Stack</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            가장 인기 있는 로깅 솔루션입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">ELK Stack 구성 요소</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-terminal rounded-lg p-4 border border-muted/30">
                <h4 className="text-lg font-semibold text-secondary mb-3">Elasticsearch</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• 분산 검색 엔진</li>
                  <li>• 로그 저장 및 인덱싱</li>
                  <li>• 빠른 검색 성능</li>
                  <li>• 수평 확장 가능</li>
                </ul>
              </div>
              <div className="bg-terminal rounded-lg p-4 border border-muted/30">
                <h4 className="text-lg font-semibold text-secondary mb-3">Logstash</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• 로그 수집 및 파싱</li>
                  <li>• 데이터 변환</li>
                  <li>• 다양한 입력 소스 지원</li>
                  <li>• 필터링 및 변환</li>
                </ul>
              </div>
              <div className="bg-terminal rounded-lg p-4 border border-muted/30">
                <h4 className="text-lg font-semibold text-secondary mb-3">Kibana</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• 시각화 대시보드</li>
                  <li>• 로그 검색 인터페이스</li>
                  <li>• 그래프 및 차트</li>
                  <li>• 알림 설정</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-terminal rounded-xl p-6 font-mono text-sm">
            <div className="text-muted mb-4">예시: Logstash 설정</div>
            <pre className="text-text overflow-x-auto">
{`input {
  file {
    path => "/var/log/app/*.log"
    type => "app_logs"
  }
}

filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "app-logs-%{+YYYY.MM.dd}"
  }
}`}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

