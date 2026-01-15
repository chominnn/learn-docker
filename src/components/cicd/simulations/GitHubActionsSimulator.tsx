'use client';

import { useState } from 'react';
import { Play, CheckCircle2, XCircle, GitBranch, Clock } from 'lucide-react';

type WorkflowStep = {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration: number;
  failureReason?: string;
};

const failureReasons: Record<string, string[]> = {
  checkout: [
    '브랜치를 찾을 수 없습니다',
    '저장소 접근 권한이 없습니다',
    '네트워크 연결 오류',
  ],
  setup: [
    'Node.js 버전을 찾을 수 없습니다',
    '시스템 요구사항 충족 실패',
  ],
  install: [
    'package.json 파일이 없습니다',
    '의존성 해결 실패',
    '네트워크 오류로 패키지 다운로드 실패',
    '메모리 부족',
  ],
  test: [
    '단위 테스트 실패 (3개 테스트 실패)',
    '타입 체크 오류',
    '린터 오류 (10개 이슈 발견)',
    '테스트 타임아웃',
  ],
  build: [
    '컴파일 오류',
    '빌드 스크립트 실패',
    '빌드 시간 초과',
    '메모리 부족으로 빌드 실패',
  ],
  deploy: [
    '배포 서버 연결 실패',
    '인증 실패',
    '배포 스크립트 오류',
    '디스크 공간 부족',
  ],
};

export function GitHubActionsSimulator() {
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([
    { id: 'checkout', name: 'Checkout code', status: 'pending', duration: 2 },
    { id: 'setup', name: 'Setup Node.js', status: 'pending', duration: 3 },
    { id: 'install', name: 'Install dependencies', status: 'pending', duration: 5 },
    { id: 'test', name: 'Run tests', status: 'pending', duration: 8 },
    { id: 'build', name: 'Build application', status: 'pending', duration: 10 },
    { id: 'deploy', name: 'Deploy to production', status: 'pending', duration: 15 },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState(0);

  const runWorkflow = async () => {
    setIsRunning(true);
    setTotalTime(0);
    let elapsed = 0;

    for (let i = 0; i < workflow.length; i++) {
      setCurrentStep(i);
      setWorkflow(prev => 
        prev.map((step, idx) => 
          idx === i ? { ...step, status: 'running' as const }
          : idx < i ? step
          : { ...step, status: 'pending' as const }
        )
      );

      const stepDuration = workflow[i].duration;
      await new Promise(resolve => setTimeout(resolve, stepDuration * 100));
      elapsed += stepDuration;
      setTotalTime(elapsed);

      // 85% 성공 확률
      const success = Math.random() > 0.15;
      const stepId = workflow[i].id;
      const failureReason = success 
        ? undefined 
        : failureReasons[stepId]?.[Math.floor(Math.random() * failureReasons[stepId].length)] || '알 수 없는 오류';
      
      const newStatus: 'success' | 'failed' = success ? 'success' : 'failed';
      
      setWorkflow(prev => 
        prev.map((step, idx) => 
          idx === i 
            ? { 
                ...step, 
                status: newStatus,
                failureReason: success ? undefined : failureReason
              }
            : step
        )
      );

      if (!success) {
        setCurrentStep(null);
        setIsRunning(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setCurrentStep(null);
    setIsRunning(false);
  };

  const resetWorkflow = () => {
    setWorkflow(workflow.map(step => ({ ...step, status: 'pending' as const })));
    setIsRunning(false);
    setCurrentStep(null);
    setTotalTime(0);
  };

  const getStepColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'running':
        return 'border-primary bg-primary/10 text-primary';
      case 'success':
        return 'border-primary bg-primary/20 text-primary';
      case 'failed':
        return 'border-danger bg-danger/20 text-danger';
      default:
        return 'border-muted bg-surface text-muted';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-mono text-text">GitHub Actions Workflow</h4>
          </div>
          <div className="flex gap-2">
            <button
              onClick={runWorkflow}
              disabled={isRunning}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary font-mono text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              실행
            </button>
            <button
              onClick={resetWorkflow}
              disabled={isRunning}
              className="px-4 py-2 bg-surface hover:bg-surface/80 border border-muted/30 rounded-lg text-muted font-mono text-sm transition-colors"
            >
              리셋
            </button>
          </div>
        </div>

        {/* Warning Message */}
        {!isRunning && workflow.every(s => s.status === 'pending') && (
          <div className="mb-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-warning text-sm">⚠️</span>
              <div className="text-sm text-muted">
                <div className="font-semibold text-text mb-1">참고: 각 단계는 약 15% 확률로 실패할 수 있습니다</div>
                <div className="text-xs opacity-80">
                  실제 CI/CD 파이프라인에서는 네트워크 오류, 테스트 실패, 빌드 오류 등 다양한 이유로 실패할 수 있습니다.
                  실패 시 해당 단계에서 워크플로우가 중단됩니다.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Steps */}
        <div className="space-y-3 mb-6">
          {workflow.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg border-2 transition-all ${getStepColor(step.status)} ${
                currentStep === index ? 'scale-[1.02] shadow-lg' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface/50 flex items-center justify-center font-mono font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{step.name}</div>
                    <div className="text-xs opacity-70 mt-1">
                      예상 시간: {step.duration}초
                    </div>
                    {step.status === 'pending' && !isRunning && (
                      <div className="text-xs opacity-60 mt-2 font-mono">
                        💡 실패 가능: {failureReasons[step.id]?.[0] || '알 수 없는 오류'}
                      </div>
                    )}
                    {step.status === 'failed' && step.failureReason && (
                      <div className="text-xs text-danger mt-2 font-mono">
                        ✗ {step.failureReason}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {step.status === 'running' && (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                  {step.status === 'success' && <CheckCircle2 className="w-5 h-5" />}
                  {step.status === 'failed' && <XCircle className="w-5 h-5" />}
                  {step.status === 'pending' && (
                    <Clock className="w-5 h-5 opacity-50" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Summary */}
        <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted">총 소요 시간:</span>
            <span className="text-primary font-semibold">{totalTime}초</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">성공한 단계:</span>
            <span className="text-primary font-semibold">
              {workflow.filter(s => s.status === 'success').length} / {workflow.length}
            </span>
          </div>
          {workflow.every(s => s.status === 'success') && (
            <div className="mt-4 pt-4 border-t border-muted/30 text-primary font-semibold">
              ✓ Workflow가 성공적으로 완료되었습니다!
            </div>
          )}
          {workflow.some(s => s.status === 'failed') && (
            <div className="mt-4 pt-4 border-t border-muted/30">
              <div className="text-danger font-semibold mb-2">
                ✗ Workflow가 실패했습니다
              </div>
              {workflow.find(s => s.status === 'failed')?.failureReason && (
                <div className="text-danger text-xs font-mono">
                  실패 이유: {workflow.find(s => s.status === 'failed')?.failureReason}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

