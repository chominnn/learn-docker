'use client';

import { FadeIn } from '@/components/ui';

export function CicdLayer4Jenkins() {
  return (
    <section id="cicd-layer-4" className="py-20 px-4 border-t border-muted/20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-text mb-4">
            <span className="text-primary">Jenkins</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            오픈소스 자동화 서버로, 강력한 플러그인 생태계와 높은 커스터마이징이 가능합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12">
          <div className="bg-surface rounded-xl p-8 border border-muted/30">
            <h3 className="text-2xl font-mono text-text mb-6">주요 특징</h3>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">플러그인:</strong> 수천 개의 플러그인으로 확장 가능</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">Declarative Pipeline:</strong> Jenkinsfile로 파이프라인 정의</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">분산 빌드:</strong> 여러 노드에서 병렬로 작업 실행</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span><strong className="text-text">오픈소스:</strong> 완전히 무료이고 자체 호스팅 가능</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-terminal rounded-xl p-6 font-mono text-sm">
            <div className="text-muted mb-4">예시: Jenkinsfile</div>
            <pre className="text-text overflow-x-auto">
{`pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm run deploy'
            }
        }
    }
}`}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

