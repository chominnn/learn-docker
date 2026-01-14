'use client';

import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { Box, Minus, Plus, RotateCcw } from 'lucide-react';

export function DeploymentScaler() {
  const [replicas, setReplicas] = useState(1);
  const podsRef = useRef<HTMLDivElement>(null);

  const handleScale = (delta: number) => {
    const newReplicas = Math.max(1, Math.min(10, replicas + delta));
    setReplicas(newReplicas);
  };

  // Animate pods when replicas change
  useEffect(() => {
    if (podsRef.current) {
      const pods = podsRef.current.querySelectorAll('.pod-item');
      anime({
        targets: pods,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 400,
        delay: anime.stagger(50),
        easing: 'easeOutExpo',
      });
    }
  }, [replicas]);

  const reset = () => {
    setReplicas(1);
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-muted/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono text-lg text-text">Deployment 스케일링</h3>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-muted hover:text-text transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Scale Controls */}
      <div className="mb-6 p-4 rounded-lg bg-muted/10 border border-muted/30">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleScale(-1)}
            disabled={replicas <= 1}
            className="w-10 h-10 rounded-lg border border-muted/30 bg-surface hover:bg-muted/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Minus className="w-4 h-4 text-text" />
          </button>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-text">{replicas}</div>
            <div className="text-xs text-muted font-mono">Replicas</div>
          </div>
          <button
            onClick={() => handleScale(1)}
            disabled={replicas >= 10}
            className="w-10 h-10 rounded-lg border border-muted/30 bg-surface hover:bg-muted/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Plus className="w-4 h-4 text-text" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <code className="text-xs text-muted font-mono">
            kubectl scale deployment my-app --replicas={replicas}
          </code>
        </div>
      </div>

      {/* Pods Visualization */}
      <div className="mb-4">
        <div className="text-sm text-muted font-mono mb-3">
          실행 중인 Pods ({replicas})
        </div>
        <div
          ref={podsRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          {Array.from({ length: replicas }).map((_, index) => (
            <div
              key={index}
              className="pod-item p-4 rounded-lg border-2 border-secondary/30 bg-secondary/10 flex flex-col items-center justify-center gap-2"
            >
              <Box className="w-8 h-8 text-secondary" />
              <div className="text-xs font-mono text-secondary">Pod {index + 1}</div>
              <div className="text-xs text-muted">Running</div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
        <div className="text-sm text-muted mb-2">
          <strong className="text-text">스케일링의 장점:</strong>
        </div>
        <ul className="text-xs text-muted space-y-1 ml-4">
          <li>• 트래픽 증가 시 자동으로 Pod 수를 늘릴 수 있습니다</li>
          <li>• 로드가 분산되어 성능이 향상됩니다</li>
          <li>• 하나의 Pod가 실패해도 다른 Pod들이 서비스를 계속 제공합니다</li>
          <li>• HorizontalPodAutoscaler (HPA)로 자동 스케일링 가능</li>
        </ul>
      </div>
    </div>
  );
}

