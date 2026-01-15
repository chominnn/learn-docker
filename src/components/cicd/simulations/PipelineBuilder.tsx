'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Play, RotateCcw } from 'lucide-react';

type PipelineStage = {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
};

const availableStages = [
  { id: 'source', name: 'Source', description: '코드 커밋 및 푸시' },
  { id: 'build', name: 'Build', description: '코드 컴파일 및 빌드' },
  { id: 'test', name: 'Test', description: '테스트 실행' },
  { id: 'deploy', name: 'Deploy', description: '배포 실행' },
  { id: 'security', name: 'Security Scan', description: '보안 스캔' },
  { id: 'notify', name: 'Notify', description: '알림 전송' },
];

export function PipelineBuilder() {
  const [pipeline, setPipeline] = useState<PipelineStage[]>([
    { id: 'source', name: 'Source', status: 'pending' },
    { id: 'build', name: 'Build', status: 'pending' },
    { id: 'test', name: 'Test', status: 'pending' },
    { id: 'deploy', name: 'Deploy', status: 'pending' },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState<number | null>(null);

  const resetPipeline = () => {
    setPipeline(pipeline.map(stage => ({ ...stage, status: 'pending' as const })));
    setIsRunning(false);
    setCurrentStage(null);
  };

  const runPipeline = async () => {
    setIsRunning(true);
    setCurrentStage(0);

    for (let i = 0; i < pipeline.length; i++) {
      setCurrentStage(i);
      setPipeline(prev => 
        prev.map((stage, idx) => 
          idx === i ? { ...stage, status: 'running' as const }
          : idx < i ? stage
          : { ...stage, status: 'pending' as const }
        )
      );

      await new Promise(resolve => setTimeout(resolve, 1500));

      // 모든 단계는 성공으로 처리
      setPipeline(prev => 
        prev.map((stage, idx) => 
          idx === i 
            ? { ...stage, status: 'success' as const }
            : stage
        )
      );

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setCurrentStage(null);
    setIsRunning(false);
  };

  const getStageColor = (status: PipelineStage['status']) => {
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

  const getStageIcon = (status: PipelineStage['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'failed':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-mono text-text">파이프라인 단계 구성</h4>
          <div className="flex gap-2">
            <button
              onClick={runPipeline}
              disabled={isRunning}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary font-mono text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              실행
            </button>
            <button
              onClick={resetPipeline}
              disabled={isRunning}
              className="px-4 py-2 bg-surface hover:bg-surface/80 border border-muted/30 rounded-lg text-muted font-mono text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              리셋
            </button>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
          {pipeline.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              <div className={`relative px-6 py-4 rounded-lg border-2 ${getStageColor(stage.status)} transition-all ${
                currentStage === index ? 'scale-105 shadow-lg' : ''
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold">{stage.name}</span>
                  {getStageIcon(stage.status)}
                  {stage.status === 'running' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              {index < pipeline.length - 1 && (
                <ArrowRight className="w-6 h-6 text-muted mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Pipeline Status */}
        <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
          <div className="text-muted mb-2">파이프라인 상태:</div>
          {pipeline.map((stage, index) => (
            <div key={stage.id} className="flex items-center gap-2 mb-1">
              <span className="text-muted">[{index + 1}]</span>
              <span className={stage.status === 'success' ? 'text-primary' : stage.status === 'failed' ? 'text-danger' : 'text-muted'}>
                {stage.name}: {stage.status === 'running' ? '실행 중...' : stage.status === 'success' ? '성공' : stage.status === 'failed' ? '실패' : '대기 중'}
              </span>
            </div>
          ))}
          {pipeline.every(s => s.status === 'success') && (
            <div className="mt-4 text-primary font-semibold">
              ✓ 모든 단계가 성공적으로 완료되었습니다!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

