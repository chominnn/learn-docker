'use client';

import { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

type Metric = {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
};

export function MetricsDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { name: 'CPU 사용률', value: 45, unit: '%', trend: 'up', color: 'text-primary' },
    { name: '메모리 사용량', value: 62, unit: '%', trend: 'down', color: 'text-secondary' },
    { name: '네트워크 트래픽', value: 128, unit: 'Mbps', trend: 'up', color: 'text-warning' },
    { name: '디스크 I/O', value: 35, unit: '%', trend: 'stable', color: 'text-primary' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 5)),
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable' as 'up' | 'down' | 'stable',
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: Metric['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-danger" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-primary" />;
      default:
        return <Activity className="w-4 h-4 text-muted" />;
    }
  };

  const getBarColor = (value: number) => {
    if (value > 80) return 'bg-danger';
    if (value > 60) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <h4 className="text-lg font-mono text-text mb-4">실시간 메트릭 대시보드</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-terminal rounded-lg p-4 border border-muted/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-muted">{metric.name}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className={`text-2xl font-bold font-mono ${metric.color}`}>
                  {metric.value.toFixed(1)}
                </span>
                <span className="text-sm text-muted">{metric.unit}</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${getBarColor(metric.value)} transition-all duration-500`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-terminal rounded-lg font-mono text-xs">
          <div className="text-muted mb-2">메트릭 업데이트:</div>
          <div className="text-text">2초마다 자동으로 메트릭이 갱신됩니다</div>
        </div>
      </div>
    </div>
  );
}

