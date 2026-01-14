'use client';

import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { Box, Layers, GripVertical, RotateCcw, Package } from 'lucide-react';

interface Container {
  id: string;
  name: string;
  color: string;
}

const AVAILABLE_CONTAINERS: Container[] = [
  { id: 'web', name: 'Web Server', color: 'primary' },
  { id: 'api', name: 'API Service', color: 'secondary' },
  { id: 'db', name: 'Database', color: 'warning' },
  { id: 'cache', name: 'Cache', color: 'danger' },
  { id: 'log', name: 'Log Collector', color: 'muted' },
];

interface Pod {
  id: string;
  containers: Container[];
}

export function PodVsContainer() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [pods, setPods] = useState<Pod[]>([]);
  const [draggingContainer, setDraggingContainer] = useState<Container | null>(null);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [containerHover, setContainerHover] = useState(false);
  const [podHover, setPodHover] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);

  // Show educational message
  useEffect(() => {
    if (showMessage && messageRef.current) {
      anime({
        targets: messageRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: 'easeOutExpo',
      });

      const timer = setTimeout(() => {
        if (messageRef.current) {
          anime({
            targets: messageRef.current,
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 300,
            easing: 'easeInExpo',
            complete: () => setShowMessage(null),
          });
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const handleDragStart = (container: Container) => {
    setDraggingContainer(container);
  };

  const handleDragEnd = () => {
    setDraggingContainer(null);
    setContainerHover(false);
    setPodHover(false);
  };

  const handleDrop = (target: 'container' | 'pod') => {
    if (!draggingContainer) return;

    if (target === 'container') {
      // Add as standalone container
      if (containers.find(c => c.id === draggingContainer.id)) {
        setDraggingContainer(null);
        return;
      }
      setContainers(prev => [...prev, draggingContainer]);
      setShowMessage(`${draggingContainer.name}을(를) 단독 컨테이너로 배포했습니다.`);
    } else {
      // Add to a pod (create new pod or add to existing)
      const existingPod = pods.find(p => p.containers.length < 3);
      if (existingPod && !existingPod.containers.find(c => c.id === draggingContainer.id)) {
        setPods(prev =>
          prev.map(p =>
            p.id === existingPod.id
              ? { ...p, containers: [...p.containers, draggingContainer] }
              : p
          )
        );
        setShowMessage(`${draggingContainer.name}을(를) Pod에 추가했습니다. 같은 Pod의 컨테이너들은 네트워크와 스토리지를 공유합니다.`);
      } else if (!pods.find(p => p.containers.find(c => c.id === draggingContainer.id))) {
        setPods(prev => [...prev, { id: `pod-${Date.now()}`, containers: [draggingContainer] }]);
        setShowMessage(`${draggingContainer.name}을(를) 새로운 Pod로 배포했습니다.`);
      }
    }

    setDraggingContainer(null);
    setContainerHover(false);
    setPodHover(false);
  };

  const reset = () => {
    setContainers([]);
    setPods([]);
    setShowMessage(null);
  };

  const getContainerColor = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary/20 border-primary/50 text-primary';
      case 'secondary': return 'bg-secondary/20 border-secondary/50 text-secondary';
      case 'warning': return 'bg-warning/20 border-warning/50 text-warning';
      case 'danger': return 'bg-danger/20 border-danger/50 text-danger';
      default: return 'bg-muted/20 border-muted/50 text-muted';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-muted/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono text-lg text-text">Pod vs Container 비교</h3>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-muted hover:text-text transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Available Containers to Drag */}
      <div className="mb-6">
        <p className="text-xs text-muted mb-3 font-mono">컨테이너를 드래그하여 배포:</p>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_CONTAINERS.map(container => (
            <div
              key={container.id}
              draggable
              onDragStart={() => handleDragStart(container)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-grab active:cursor-grabbing transition-all hover:scale-105 ${getContainerColor(container.color)}`}
            >
              <GripVertical className="w-3 h-3 opacity-50" />
              <Package className="w-3 h-3" />
              <span className="text-sm font-mono">{container.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      {showMessage && (
        <div
          ref={messageRef}
          className="mb-4 p-3 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary text-sm font-mono opacity-0"
        >
          {showMessage}
        </div>
      )}

      {/* Comparison Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Standalone Containers */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setContainerHover(true);
          }}
          onDragLeave={() => setContainerHover(false)}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop('container');
          }}
          className={`min-h-[300px] p-4 rounded-lg border-2 border-dashed transition-all ${
            containerHover
              ? 'border-primary/50 bg-primary/5'
              : 'border-muted/30 bg-surface/50'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-muted" />
            <h4 className="font-mono text-text">단독 컨테이너</h4>
            <span className="text-xs text-muted">({containers.length})</span>
          </div>
          <p className="text-xs text-muted mb-4">
            각 컨테이너가 독립적으로 실행됩니다.
          </p>
          <div className="space-y-2">
            {containers.map(container => (
              <div
                key={container.id}
                className={`p-3 rounded-lg border ${getContainerColor(container.color)}`}
              >
                <div className="font-mono text-sm">{container.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pods */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setPodHover(true);
          }}
          onDragLeave={() => setPodHover(false)}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop('pod');
          }}
          className={`min-h-[300px] p-4 rounded-lg border-2 border-dashed transition-all ${
            podHover
              ? 'border-secondary/50 bg-secondary/5'
              : 'border-muted/30 bg-surface/50'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-secondary" />
            <h4 className="font-mono text-text">Pod (컨테이너 그룹)</h4>
            <span className="text-xs text-muted">({pods.length})</span>
          </div>
          <p className="text-xs text-muted mb-4">
            Pod 안의 컨테이너들은 네트워크와 스토리지를 공유합니다.
          </p>
          <div className="space-y-3">
            {pods.map(pod => (
              <div
                key={pod.id}
                className="p-3 rounded-lg border-2 border-secondary/30 bg-secondary/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Box className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-mono text-secondary">Pod</span>
                </div>
                <div className="space-y-2">
                  {pod.containers.map(container => (
                    <div
                      key={container.id}
                      className={`p-2 rounded border ${getContainerColor(container.color)}`}
                    >
                      <div className="font-mono text-sm">{container.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Stats */}
      {(containers.length > 0 || pods.length > 0) && (
        <div className="mt-6 p-4 rounded-lg bg-muted/10 border border-muted/30">
          <h4 className="font-mono text-sm text-text mb-3">비교</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted font-mono text-xs mb-1">단독 컨테이너</div>
              <div className="text-text">
                • 각각 독립적인 네트워크
                <br />
                • 각각 독립적인 스토리지
                <br />
                • 서로 통신하려면 외부 네트워크 필요
              </div>
            </div>
            <div>
              <div className="text-muted font-mono text-xs mb-1">Pod</div>
              <div className="text-text">
                • 같은 IP 주소 공유
                <br />
                • 볼륨 공유 가능
                <br />
                • localhost로 통신 가능
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

