'use client';

import { useState } from 'react';
import { Play, RotateCcw, Server } from 'lucide-react';

type Strategy = 'blue-green' | 'canary';

export function DeploymentStrategyComparator() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  const deploy = async (strategy: Strategy) => {
    setSelectedStrategy(strategy);
    setIsDeploying(true);
    setDeploymentProgress(0);

    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const reset = () => {
    setSelectedStrategy(null);
    setIsDeploying(false);
    setDeploymentProgress(0);
  };

  const renderBlueGreen = () => {
    const showGreen = deploymentProgress >= 50;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Blue Environment */}
          <div className={`p-6 rounded-lg border-2 transition-all ${
            showGreen ? 'border-muted/30 bg-surface/50' : 'border-primary bg-primary/10'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold text-text">Blue (현재 버전)</h4>
              {!showGreen && (
                <span className="ml-auto px-2 py-1 bg-primary/20 text-primary text-xs rounded font-mono">
                  활성
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="h-12 bg-terminal rounded flex items-center justify-center text-xs font-mono">
                v1.0.0
              </div>
              <div className="h-12 bg-terminal rounded flex items-center justify-center text-xs font-mono">
                v1.0.0
              </div>
            </div>
          </div>

          {/* Green Environment */}
          <div className={`p-6 rounded-lg border-2 transition-all ${
            showGreen ? 'border-primary bg-primary/10' : 'border-muted/30 bg-surface/50'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold text-text">Green (새 버전)</h4>
              {showGreen && (
                <span className="ml-auto px-2 py-1 bg-primary/20 text-primary text-xs rounded font-mono">
                  활성
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="h-12 bg-terminal rounded flex items-center justify-center text-xs font-mono">
                v2.0.0
              </div>
              <div className="h-12 bg-terminal rounded flex items-center justify-center text-xs font-mono">
                v2.0.0
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-muted font-mono">
          {deploymentProgress < 50 && '새 버전 배포 중...'}
          {deploymentProgress >= 50 && deploymentProgress < 100 && '트래픽 전환 중...'}
          {deploymentProgress >= 100 && '배포 완료! 이전 버전은 유지되어 롤백 가능'}
        </div>
      </div>
    );
  };

  const renderCanary = () => {
    const percentage = Math.min(deploymentProgress / 10, 10); // 10%씩 증가
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: 10 }).map((_, i) => {
            const isNewVersion = i < percentage;
            return (
              <div
                key={i}
                className={`h-16 rounded border-2 transition-all flex items-center justify-center text-xs font-mono ${
                  isNewVersion
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-muted bg-surface text-muted'
                }`}
              >
                {isNewVersion ? 'v2' : 'v1'}
              </div>
            );
          })}
        </div>
        <div className="text-sm text-muted font-mono text-center">
          {percentage === 0 && '새 버전을 소수 서버에 배포 중...'}
          {percentage > 0 && percentage < 10 && `${percentage * 10}% 트래픽 전환 중... (모니터링)`}
          {percentage >= 10 && '점진적으로 모든 서버로 전환 완료!'}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-mono text-text">배포 전략 비교</h4>
          <div className="flex gap-2">
            <button
              onClick={() => deploy('blue-green')}
              disabled={isDeploying}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary font-mono text-sm transition-colors disabled:opacity-50"
            >
              Blue-Green
            </button>
            <button
              onClick={() => deploy('canary')}
              disabled={isDeploying}
              className="px-4 py-2 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 rounded-lg text-secondary font-mono text-sm transition-colors disabled:opacity-50"
            >
              Canary
            </button>
            <button
              onClick={reset}
              disabled={isDeploying}
              className="px-4 py-2 bg-surface hover:bg-surface/80 border border-muted/30 rounded-lg text-muted font-mono text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Strategy Description */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-muted/30">
              <h5 className="font-semibold text-text mb-2">Blue-Green 배포</h5>
              <ul className="text-sm text-muted space-y-1">
                <li>• 두 환경을 동시에 운영</li>
                <li>• 즉시 전체 전환</li>
                <li>• 빠른 롤백 가능</li>
                <li>• 리소스 2배 필요</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-muted/30">
              <h5 className="font-semibold text-text mb-2">Canary 배포</h5>
              <ul className="text-sm text-muted space-y-1">
                <li>• 점진적 트래픽 전환</li>
                <li>• 문제 조기 발견</li>
                <li>• 리소스 효율적</li>
                <li>• 모니터링 중요</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Deployment Visualization */}
        {selectedStrategy && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono text-muted">
                {selectedStrategy === 'blue-green' ? 'Blue-Green 배포' : 'Canary 배포'} 진행 중
              </span>
              <span className="text-sm font-mono text-primary">{deploymentProgress}%</span>
            </div>
            <div className="w-full h-2 bg-terminal rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ${
                  selectedStrategy === 'blue-green' ? 'bg-primary' : 'bg-secondary'
                }`}
                style={{ width: `${deploymentProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Strategy Visualization */}
        <div className="min-h-[300px]">
          {!selectedStrategy && (
            <div className="text-center text-muted py-12 font-mono">
              배포 전략을 선택하여 시각화를 확인하세요
            </div>
          )}
          {selectedStrategy === 'blue-green' && renderBlueGreen()}
          {selectedStrategy === 'canary' && renderCanary()}
        </div>
      </div>
    </div>
  );
}

