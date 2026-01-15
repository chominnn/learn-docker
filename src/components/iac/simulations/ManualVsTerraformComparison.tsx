'use client';

import { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Server, Database, Network, Clock, AlertCircle } from 'lucide-react';

type ResourceType = 'server' | 'database' | 'network';
type Resource = {
  id: string;
  type: ResourceType;
  name: string;
  status: 'pending' | 'creating' | 'created' | 'failed';
  config?: string;
};

const resourceTypes = {
  server: { icon: Server, color: 'text-primary', label: 'Server', config: 'instance_type: t2.micro' },
  database: { icon: Database, color: 'text-secondary', label: 'Database', config: 'engine: mysql' },
  network: { icon: Network, color: 'text-warning', label: 'Network', config: 'cidr: 10.0.0.0/16' },
};

const DEFAULT_RESOURCES: ResourceType[] = ['network', 'server', 'database'];

export function ManualVsTerraformComparison() {
  const [manualResources, setManualResources] = useState<Resource[]>([]);
  const [terraformResources, setTerraformResources] = useState<Resource[]>([]);
  const [isManualDeploying, setIsManualDeploying] = useState(false);
  const [isTerraformDeploying, setIsTerraformDeploying] = useState(false);
  const [manualTime, setManualTime] = useState(0);
  const [terraformTime, setTerraformTime] = useState(0);
  const [manualErrors, setManualErrors] = useState<string[]>([]);
  const [currentManualResource, setCurrentManualResource] = useState<string | null>(null);
  const [currentTerraformResource, setCurrentTerraformResource] = useState<string | null>(null);

  const initializeResources = () => {
    const resources = DEFAULT_RESOURCES.map((type, idx) => ({
      id: `${type}-${idx}`,
      type,
      name: `${resourceTypes[type].label}-${idx + 1}`,
      status: 'pending' as const,
      config: resourceTypes[type].config,
    }));
    setManualResources([...resources]);
    setTerraformResources([...resources]);
    setManualTime(0);
    setTerraformTime(0);
    setManualErrors([]);
  };

  // 수동 배포: 느리고 실수 가능
  const deployManually = async () => {
    setIsManualDeploying(true);
    setManualErrors([]);
    let elapsed = 0;
    const errors: string[] = [];

    for (let i = 0; i < manualResources.length; i++) {
      setCurrentManualResource(manualResources[i].id);
      
      // 각 리소스마다 시간 소요 (수동 작업 시간)
      const stepTime = 3000; // 3초씩 (애니메이션용, 실제로는 더 오래 걸림)
      setManualResources(prev => 
        prev.map((r, idx) => 
          idx === i ? { ...r, status: 'creating' as const } : r
        )
      );

      await new Promise(resolve => setTimeout(resolve, stepTime));
      elapsed += 8; // 실제 수동 작업 시간은 8초로 계산 (표시용)
      setManualTime(elapsed);

      // 수동 배포는 30% 확률로 실수 발생
      const hasError = Math.random() < 0.3;
      if (hasError) {
        const errorMessages = [
          '설정 오류: 잘못된 IP 주소',
          '권한 오류: 접근 거부',
          '네트워크 타임아웃',
          '리소스 이름 중복',
        ];
        errors.push(`${manualResources[i].name}: ${errorMessages[Math.floor(Math.random() * errorMessages.length)]}`);
        setManualResources(prev => 
          prev.map((r, idx) => 
            idx === i ? { ...r, status: 'failed' as const } : r
          )
        );
        setManualErrors(errors);
        setCurrentManualResource(null);
        setIsManualDeploying(false);
        return;
      }

      setManualResources(prev => 
        prev.map((r, idx) => 
          idx === i ? { ...r, status: 'created' as const } : r
        )
      );
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setCurrentManualResource(null);
    setIsManualDeploying(false);
  };

  // Terraform 배포: 빠르고 일관성 있음
  const deployWithTerraform = async () => {
    setIsTerraformDeploying(true);
    setCurrentTerraformResource(null);
    let elapsed = 0;

    // 모든 리소스를 병렬로 시작 (실제로는 순차적이지만 더 빠름)
    setTerraformResources(prev => 
      prev.map(r => ({ ...r, status: 'creating' as const }))
    );

    // Terraform은 더 빠르고 안정적 (각 리소스당 1초)
    for (let i = 0; i < terraformResources.length; i++) {
      setCurrentTerraformResource(terraformResources[i].id);
      const stepTime = 1500; // 1.5초씩 (애니메이션용)
      await new Promise(resolve => setTimeout(resolve, stepTime));
      elapsed += 2; // 실제 Terraform 작업 시간은 2초로 계산 (표시용)
      setTerraformTime(elapsed);

      // Terraform은 5% 확률로만 실패 (훨씬 안정적)
      const hasError = Math.random() < 0.05;
      if (!hasError) {
        setTerraformResources(prev => 
          prev.map((r, idx) => 
            idx === i ? { ...r, status: 'created' as const } : r
          )
        );
      }
    }
    setCurrentTerraformResource(null);
    setIsTerraformDeploying(false);
  };

  const reset = () => {
    setManualResources([]);
    setTerraformResources([]);
    setIsManualDeploying(false);
    setIsTerraformDeploying(false);
    setManualTime(0);
    setTerraformTime(0);
    setManualErrors([]);
    setCurrentManualResource(null);
    setCurrentTerraformResource(null);
  };

  const getStatusColor = (status: Resource['status']) => {
    switch (status) {
      case 'creating':
        return 'border-secondary bg-secondary/10 text-secondary';
      case 'created':
        return 'border-secondary bg-secondary/20 text-secondary';
      case 'failed':
        return 'border-danger bg-danger/20 text-danger';
      default:
        return 'border-muted bg-surface text-muted';
    }
  };

  const renderResources = (resources: Resource[], currentId: string | null, isDeploying: boolean) => (
    <div className="space-y-3">
      {resources.map((resource) => {
        const { icon: Icon, color } = resourceTypes[resource.type];
        return (
          <div
            key={resource.id}
            className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(resource.status)} ${
              currentId === resource.id ? 'scale-105 shadow-lg' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <div>
                  <div className="font-semibold text-sm">{resource.name}</div>
                  <div className="text-xs opacity-60 mt-1">{resource.config}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {resource.status === 'creating' && (
                  <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                )}
                {resource.status === 'created' && <CheckCircle2 className="w-5 h-5" />}
                {resource.status === 'failed' && <XCircle className="w-5 h-5" />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-mono text-text">수동 배포 vs Terraform 배포 비교</h4>
          <div className="flex gap-2">
            <button
              onClick={initializeResources}
              disabled={isManualDeploying || isTerraformDeploying}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary font-mono text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              리소스 준비
            </button>
            <button
              onClick={reset}
              disabled={isManualDeploying || isTerraformDeploying}
              className="px-4 py-2 bg-surface hover:bg-surface/80 border border-muted/30 rounded-lg text-muted font-mono text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* 수동 배포 */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-text flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                수동 배포
              </h5>
              <button
                onClick={deployManually}
                disabled={isManualDeploying || manualResources.length === 0 || isTerraformDeploying}
                className="px-3 py-1.5 bg-warning/20 hover:bg-warning/30 border border-warning/30 rounded-lg text-warning font-mono text-xs transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Play className="w-3 h-3" />
                배포 시작
              </button>
            </div>
            {manualResources.length === 0 ? (
              <div className="text-center text-muted py-12 font-mono text-sm">
                "리소스 준비" 버튼을 클릭하세요
              </div>
            ) : (
              <>
                {renderResources(manualResources, currentManualResource || '', isManualDeploying)}
                <div className="mt-4 p-3 bg-terminal rounded-lg font-mono text-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted" />
                    <span className="text-muted">소요 시간:</span>
                    <span className="text-warning font-semibold">{manualTime}초</span>
                  </div>
                  {manualErrors.length > 0 && (
                    <div className="text-danger text-xs mt-2">
                      <div className="font-semibold mb-1">오류 발생:</div>
                      {manualErrors.map((error, idx) => (
                        <div key={idx}>• {error}</div>
                      ))}
                    </div>
                  )}
                  <div className="text-muted text-xs mt-2">
                    • 리소스당 약 8초 소요<br />
                    • 30% 확률로 실수 발생
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Terraform 배포 */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-text flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                Terraform 배포
              </h5>
              <button
                onClick={deployWithTerraform}
                disabled={isTerraformDeploying || terraformResources.length === 0 || isManualDeploying}
                className="px-3 py-1.5 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 rounded-lg text-secondary font-mono text-xs transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Play className="w-3 h-3" />
                terraform apply
              </button>
            </div>
            {terraformResources.length === 0 ? (
              <div className="text-center text-muted py-12 font-mono text-sm">
                "리소스 준비" 버튼을 클릭하세요
              </div>
            ) : (
              <>
                {renderResources(terraformResources, currentTerraformResource || '', isTerraformDeploying)}
                <div className="mt-4 p-3 bg-terminal rounded-lg font-mono text-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted" />
                    <span className="text-muted">소요 시간:</span>
                    <span className="text-secondary font-semibold">{terraformTime}초</span>
                  </div>
                  <div className="text-muted text-xs mt-2">
                    • 리소스당 약 2초 소요<br />
                    • 5% 확률로 실패 (훨씬 안정적)
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Comparison Summary */}
        {(isManualDeploying || isTerraformDeploying || manualTime > 0 || terraformTime > 0) && (
          <div className="bg-surface rounded-lg p-4 border border-muted/30">
            <h6 className="font-semibold text-text mb-3 flex items-center gap-2">
              비교 결과
            </h6>
            <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
              <div>
                <div className="text-muted mb-1">속도 차이</div>
                {manualTime > 0 && terraformTime > 0 && (
                  <div className="text-text">
                    Terraform이 <span className="text-secondary font-semibold">{((manualTime / terraformTime).toFixed(1))}배</span> 빠름
                  </div>
                )}
              </div>
              <div>
                <div className="text-muted mb-1">성공률</div>
                <div className="flex gap-4">
                  <div>
                    <div className="text-warning">수동: ~70%</div>
                  </div>
                  <div>
                    <div className="text-secondary">Terraform: ~95%</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-muted mb-1">일관성</div>
                <div className="text-text">
                  {manualErrors.length > 0 ? (
                    <span className="text-danger">수동: 실수 발생</span>
                  ) : (
                    <span className="text-secondary">Terraform: 항상 동일한 결과</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

