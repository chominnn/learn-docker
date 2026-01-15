'use client';

import { useState } from 'react';
import { RefreshCw, FileText } from 'lucide-react';

type StateAction = {
  action: 'create' | 'update' | 'destroy';
  resource: string;
  timestamp: string;
};

export function StateVisualizer() {
  const [stateHistory, setStateHistory] = useState<StateAction[]>([]);
  const [resources, setResources] = useState<string[]>([]);

  const addResource = () => {
    const resourceName = `resource-${resources.length + 1}`;
    setResources([...resources, resourceName]);
    setStateHistory([
      ...stateHistory,
      { action: 'create', resource: resourceName, timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  const destroyResource = (resource: string) => {
    setResources(resources.filter(r => r !== resource));
    setStateHistory([
      ...stateHistory,
      { action: 'destroy', resource, timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  const reset = () => {
    setResources([]);
    setStateHistory([]);
  };

  const getActionColor = (action: StateAction['action']) => {
    switch (action) {
      case 'create':
        return 'text-primary';
      case 'update':
        return 'text-warning';
      case 'destroy':
        return 'text-danger';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary" />
            <h4 className="text-lg font-mono text-text">Terraform State 관리</h4>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addResource}
              className="px-4 py-2 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 rounded-lg text-secondary font-mono text-sm transition-colors"
            >
              + 리소스 추가
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-surface hover:bg-surface/80 border border-muted/30 rounded-lg text-muted font-mono text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Current State */}
          <div>
            <h5 className="font-semibold text-text mb-4">현재 State</h5>
            <div className="bg-terminal rounded-lg p-4 font-mono text-sm min-h-[200px]">
              {resources.length === 0 ? (
                <div className="text-muted text-center py-8">리소스가 없습니다</div>
              ) : (
                <div className="space-y-2">
                  {resources.map((resource) => (
                    <div key={resource} className="flex items-center justify-between">
                      <span className="text-text">{resource}</span>
                      <button
                        onClick={() => destroyResource(resource)}
                        className="text-danger hover:text-danger/70 transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* State History */}
          <div>
            <h5 className="font-semibold text-text mb-4">State 변경 이력</h5>
            <div className="bg-terminal rounded-lg p-4 font-mono text-sm min-h-[200px] max-h-[200px] overflow-y-auto">
              {stateHistory.length === 0 ? (
                <div className="text-muted text-center py-8">변경 이력이 없습니다</div>
              ) : (
                <div className="space-y-2">
                  {stateHistory.slice().reverse().map((action, idx) => (
                    <div key={idx} className={`text-sm ${getActionColor(action.action)}`}>
                      [{action.timestamp}] {action.action} {action.resource}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

