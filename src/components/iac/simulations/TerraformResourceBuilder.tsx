'use client';

import { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Server, Database, Network } from 'lucide-react';

type ResourceType = 'server' | 'database' | 'network';
type Resource = {
  id: string;
  type: ResourceType;
  name: string;
  status: 'pending' | 'creating' | 'created' | 'failed';
};

const resourceTypes = {
  server: { icon: Server, color: 'text-primary', label: 'Server' },
  database: { icon: Database, color: 'text-secondary', label: 'Database' },
  network: { icon: Network, color: 'text-warning', label: 'Network' },
};

export function TerraformResourceBuilder() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isApplying, setIsApplying] = useState(false);
  const [currentResource, setCurrentResource] = useState<string | null>(null);

  const addResource = (type: ResourceType) => {
    const id = `${type}-${Date.now()}`;
    setResources([...resources, {
      id,
      type,
      name: `${resourceTypes[type].label}-${resources.filter(r => r.type === type).length + 1}`,
      status: 'pending',
    }]);
  };

  const removeResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const applyChanges = async () => {
    setIsApplying(true);
    const pendingResources = resources.filter(r => r.status === 'pending');

    for (const resource of pendingResources) {
      setCurrentResource(resource.id);
      setResources(prev => 
        prev.map(r => 
          r.id === resource.id ? { ...r, status: 'creating' as const } : r
        )
      );

      await new Promise(resolve => setTimeout(resolve, 1500));

      // Terraform은 항상 성공 (비교 시뮬레이션에서 실패 차이를 보여줌)
      setResources(prev => 
        prev.map(r => 
          r.id === resource.id 
            ? { ...r, status: 'created' as const }
            : r
        )
      );

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setCurrentResource(null);
    setIsApplying(false);
  };

  const destroyAll = () => {
    setResources(resources.map(r => ({ ...r, status: 'pending' as const })));
  };

  const reset = () => {
    setResources([]);
    setIsApplying(false);
    setCurrentResource(null);
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

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-mono text-text">Terraform 리소스 빌더</h4>
          <div className="flex gap-2">
            <button
              onClick={applyChanges}
              disabled={isApplying || resources.filter(r => r.status === 'pending').length === 0}
              className="px-4 py-2 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 rounded-lg text-secondary font-mono text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              terraform apply
            </button>
            <button
              onClick={destroyAll}
              disabled={isApplying || resources.filter(r => r.status === 'created').length === 0}
              className="px-4 py-2 bg-danger/20 hover:bg-danger/30 border border-danger/30 rounded-lg text-danger font-mono text-sm transition-colors disabled:opacity-50"
            >
              terraform destroy
            </button>
            <button
              onClick={reset}
              disabled={isApplying}
              className="px-4 py-2 bg-surface hover:bg-surface/80 border border-muted/30 rounded-lg text-muted font-mono text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add Resources */}
        <div className="flex gap-2 mb-6">
          {Object.entries(resourceTypes).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => addResource(type as ResourceType)}
                disabled={isApplying}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors disabled:opacity-50 ${
                  config.color.includes('primary') 
                    ? 'border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary'
                    : config.color.includes('secondary')
                    ? 'border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-secondary'
                    : 'border-warning/30 bg-warning/10 hover:bg-warning/20 text-warning'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-mono text-sm">+ {config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {resources.map((resource) => {
            const { icon: Icon, color } = resourceTypes[resource.type];
            return (
              <div
                key={resource.id}
                className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(resource.status)} ${
                  currentResource === resource.id ? 'scale-105 shadow-lg' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className="font-semibold text-sm">{resource.name}</span>
                  </div>
                  {resource.status === 'creating' && (
                    <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                  )}
                  {resource.status === 'created' && <CheckCircle2 className="w-5 h-5" />}
                  {resource.status === 'failed' && <XCircle className="w-5 h-5" />}
                  {resource.status === 'pending' && (
                    <button
                      onClick={() => removeResource(resource.id)}
                      className="text-muted hover:text-danger transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="text-xs opacity-70 mt-2">
                  {resource.type === 'server' && 'aws_instance.example'}
                  {resource.type === 'database' && 'aws_rds_instance.db'}
                  {resource.type === 'network' && 'aws_vpc.main'}
                </div>
              </div>
            );
          })}
        </div>

        {resources.length === 0 && (
          <div className="text-center text-muted py-12 font-mono">
            리소스를 추가하여 시작하세요
          </div>
        )}

        {/* Terraform State */}
        <div className="bg-terminal rounded-lg p-4 font-mono text-sm">
          <div className="text-muted mb-2">Terraform State:</div>
          <div className="space-y-1">
            <div className="text-text">
              Resources: {resources.length} total, {resources.filter(r => r.status === 'created').length} created
            </div>
            {isApplying && (
              <div className="text-secondary">Applying changes...</div>
            )}
            {resources.every(r => r.status === 'created') && resources.length > 0 && (
              <div className="text-secondary font-semibold mt-2">
                ✓ All resources created successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

