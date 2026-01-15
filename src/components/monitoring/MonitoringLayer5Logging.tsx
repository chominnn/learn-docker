'use client';

import { FadeIn } from '@/components/ui';

export function MonitoringLayer5Logging() {
  return (
    <section id="monitoring-layer-5" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">로깅</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            로그를 수집하고 분석하여 문제를 추적하고 디버깅합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 로깅 도구</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-text mb-3">ELK Stack</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• <strong>Elasticsearch:</strong> 로그 검색 및 저장</li>
                  <li>• <strong>Logstash:</strong> 로그 수집 및 변환</li>
                  <li>• <strong>Kibana:</strong> 로그 시각화</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text mb-3">기타 도구</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• <strong>Loki:</strong> Grafana Labs의 로그 집계</li>
                  <li>• <strong>Fluentd:</strong> 로그 수집기</li>
                  <li>• <strong>Splunk:</strong> 엔터프라이즈 로그 분석</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

