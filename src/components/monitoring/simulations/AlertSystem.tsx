'use client';

import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, X, CheckCircle2 } from 'lucide-react';

type Alert = {
  id: string;
  level: 'warning' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
};

const alertMessages = {
  warning: [
    'CPU 사용률이 80%를 초과했습니다',
    '메모리 사용량이 75%에 도달했습니다',
    '네트워크 트래픽이 평소보다 높습니다',
  ],
  critical: [
    'CPU 사용률이 95%를 초과했습니다!',
    '메모리 부족: 90% 사용 중',
    '응답 시간이 2초를 초과했습니다',
    '디스크 공간이 부족합니다',
  ],
};

export function AlertSystem() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // 30% 확률로 알림 생성
      if (Math.random() < 0.3) {
        const level: 'warning' | 'critical' = Math.random() < 0.5 ? 'warning' : 'critical';
        const messages = alertMessages[level];
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          level,
          message,
          timestamp: new Date().toLocaleTimeString(),
          resolved: false,
        };

        setAlerts(prev => [newAlert, ...prev].slice(0, 5)); // 최대 5개만 표시
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 500);
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    setAlerts([]);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const clearAll = () => {
    setAlerts([]);
  };

  const getAlertColor = (level: Alert['level']) => {
    return level === 'critical' 
      ? 'border-danger bg-danger/10 text-danger' 
      : 'border-warning bg-warning/10 text-warning';
  };

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-mono text-text">알림 시스템</h4>
          </div>
          <div className="flex gap-2">
            {!isMonitoring ? (
              <button
                onClick={startMonitoring}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary font-mono text-sm transition-colors flex items-center gap-2"
              >
                모니터링 시작
              </button>
            ) : (
              <button
                onClick={stopMonitoring}
                className="px-4 py-2 bg-warning/20 hover:bg-warning/30 border border-warning/30 rounded-lg text-warning font-mono text-sm transition-colors"
              >
                모니터링 중지
              </button>
            )}
            <button
              onClick={clearAll}
              disabled={alerts.length === 0}
              className="px-4 py-2 bg-surface hover:bg-surface/80 border border-muted/30 rounded-lg text-muted font-mono text-sm transition-colors disabled:opacity-50"
            >
              모두 해결
            </button>
          </div>
        </div>

        {/* Alert Status */}
        <div className="mb-4 p-3 bg-terminal rounded-lg font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted">모니터링 상태:</span>
            <span className={isMonitoring ? 'text-primary' : 'text-muted'}>
              {isMonitoring ? '🟢 활성' : '⚪ 비활성'}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-muted">활성 알림:</span>
            <span className="text-text font-semibold">
              {alerts.filter(a => !a.resolved).length}개
            </span>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center text-muted py-12 font-mono text-sm">
              {isMonitoring ? '알림을 모니터링 중...' : '"모니터링 시작" 버튼을 클릭하세요'}
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-2 transition-all ${getAlertColor(alert.level)} ${
                  alert.resolved ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0`} />
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">{alert.message}</div>
                      <div className="text-xs opacity-70 font-mono">{alert.timestamp}</div>
                      <div className="text-xs opacity-60 mt-1">
                        {alert.level === 'critical' ? '심각' : '경고'}
                      </div>
                    </div>
                  </div>
                  {!alert.resolved && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="text-muted hover:text-text transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  {alert.resolved && (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

