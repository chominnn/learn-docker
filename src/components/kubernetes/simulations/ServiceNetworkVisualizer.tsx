'use client';

import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { Box, Network, Server, ArrowRight, RotateCcw, Play } from 'lucide-react';

interface Pod {
  id: string;
  name: string;
  ip: string;
  status: 'running' | 'stopped';
}

interface Service {
  name: string;
  dns: string;
  clusterIP: string;
  selector: string;
}

const INITIAL_PODS: Pod[] = [
  { id: 'pod1', name: 'web-pod-1', ip: '10.244.1.2', status: 'running' },
  { id: 'pod2', name: 'web-pod-2', ip: '10.244.1.3', status: 'running' },
  { id: 'pod3', name: 'web-pod-3', ip: '10.244.1.4', status: 'running' },
];

const SERVICE: Service = {
  name: 'web-service',
  dns: 'web-service.default.svc.cluster.local',
  clusterIP: '10.96.1.100',
  selector: 'app=web',
};

export function ServiceNetworkVisualizer() {
  const [pods, setPods] = useState<Pod[]>(INITIAL_PODS);
  const [requestLogs, setRequestLogs] = useState<Array<{
    id: number;
    from: string;
    to: string;
    method: 'dns' | 'ip';
    targetPod?: string;
    message: string;
  }>>([]);
  const [animatingRequest, setAnimatingRequest] = useState<{
    id: string;
    type: 'dns' | 'ip';
    targetPod?: string;
  } | null>(null);
  const [requestStage, setRequestStage] = useState(0);

  const packetRef = useRef<HTMLDivElement>(null);
  const logIdRef = useRef(0);

  // Animate packet through network
  const animatePacket = (
    stages: { x: number; y: number }[],
    onComplete: () => void
  ) => {
    if (!packetRef.current) {
      onComplete();
      return;
    }

    let currentStage = 0;
    setRequestStage(0);

    const animateNextStage = () => {
      if (currentStage >= stages.length) {
        onComplete();
        return;
      }

      setRequestStage(currentStage);

      anime({
        targets: packetRef.current,
        left: stages[currentStage].x + '%',
        top: stages[currentStage].y + '%',
        duration: 400,
        easing: 'easeInOutQuad',
        complete: () => {
          currentStage++;
          setTimeout(animateNextStage, 200);
        },
      });
    };

    anime.set(packetRef.current, { opacity: 1 });
    animateNextStage();
  };

  const sendRequest = (method: 'dns' | 'ip', targetPod?: string) => {
    const runningPods = pods.filter(p => p.status === 'running');
    if (runningPods.length === 0) return;

    // Select target pod (load balancing simulation)
    const selectedPod = targetPod
      ? pods.find(p => p.id === targetPod && p.status === 'running')
      : runningPods[Math.floor(Math.random() * runningPods.length)];

    if (!selectedPod) return;

    setAnimatingRequest({ id: `request-${Date.now()}`, type: method, targetPod: selectedPod.id });

    const serviceX = 50;
    const podPositions = {
      pod1: { x: 20, y: 70 },
      pod2: { x: 80, y: 70 },
      pod3: { x: 50, y: 75 },
    };

    const targetPos = podPositions[selectedPod.id as keyof typeof podPositions] || { x: 50, y: 70 };
    const stages = method === 'dns'
      ? [
          { x: 15, y: 15 }, // Client Pod
          { x: 30, y: 28 }, // DNS lookup
          { x: serviceX, y: 40 }, // Service
          { x: targetPos.x, y: targetPos.y }, // Target Pod
        ]
      : [
          { x: 15, y: 15 }, // Client Pod
          { x: serviceX, y: 40 }, // Service
          { x: targetPos.x, y: targetPos.y }, // Target Pod
        ];

    animatePacket(stages, () => {
      const message = method === 'dns'
        ? `${SERVICE.dns} → DNS lookup → ${SERVICE.clusterIP} → ${selectedPod.name} (${selectedPod.ip})`
        : `${SERVICE.clusterIP} → ${selectedPod.name} (${selectedPod.ip})`;

      setRequestLogs(prev => [{
        id: ++logIdRef.current,
        from: 'client-pod',
        to: selectedPod.name,
        method,
        targetPod: selectedPod.id,
        message,
      }, ...prev].slice(0, 5));

      setAnimatingRequest(null);
      if (packetRef.current) anime.set(packetRef.current, { opacity: 0 });
    });
  };

  const togglePod = (podId: string) => {
    setPods(prev =>
      prev.map(pod =>
        pod.id === podId
          ? { ...pod, status: pod.status === 'running' ? 'stopped' : 'running' }
          : pod
      )
    );
  };

  const reset = () => {
    setPods(INITIAL_PODS);
    setRequestLogs([]);
    setAnimatingRequest(null);
    if (packetRef.current) anime.set(packetRef.current, { opacity: 0 });
  };

  const runningPods = pods.filter(p => p.status === 'running');

  return (
    <div className="space-y-6">
      {/* Network Diagram */}
      <div className="bg-surface rounded-xl p-6 border border-muted/30">
        <div className="relative bg-background rounded-xl min-h-[450px] overflow-hidden">
          {/* Animated packet */}
          <div
            ref={packetRef}
            className="absolute w-4 h-4 bg-secondary rounded-full z-20 opacity-0 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-secondary/50"
            style={{ left: '15%', top: '15%' }}
          />

          {/* Client Pod */}
          <div className="absolute left-[10%] top-[10%] flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center border-2 border-primary/50">
              <Box className="w-8 h-8 text-primary" />
            </div>
            <span className="text-xs text-muted mt-2 font-mono">Client Pod</span>
          </div>

          {/* DNS (if using DNS method) */}
          <div
            className={`absolute left-[30%] top-[25%] flex flex-col items-center transition-opacity ${
              animatingRequest?.type === 'dns' ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center border border-warning/50">
              <Network className="w-6 h-6 text-warning" />
            </div>
            <span className="text-xs text-muted mt-1 font-mono">DNS</span>
          </div>

          {/* Service */}
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 flex flex-col items-center">
            <div
              className={`w-20 h-20 rounded-xl flex items-center justify-center border-2 transition-all ${
                animatingRequest
                  ? 'bg-secondary/30 border-secondary shadow-lg shadow-secondary/30'
                  : 'bg-secondary/20 border-secondary/50'
              }`}
            >
              <Server className="w-10 h-10 text-secondary" />
            </div>
            <span className="text-xs text-muted mt-2 font-mono">Service</span>
            <span className="text-xs text-secondary mt-1 font-mono">{SERVICE.name}</span>
            <span className="text-xs text-muted mt-1 font-mono">{SERVICE.clusterIP}</span>
          </div>

          {/* Pods */}
          {pods.map((pod, index) => {
            const podPositions = {
              pod1: { x: 20, y: 70 },
              pod2: { x: 80, y: 70 },
              pod3: { x: 50, y: 75 },
            };
            const position = podPositions[pod.id as keyof typeof podPositions] || { x: 50, y: 70 };
            const isTarget = animatingRequest?.targetPod === pod.id;
            const isRunning = pod.status === 'running';

            return (
              <div
                key={pod.id}
                className="absolute"
                style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className={`flex flex-col items-center cursor-pointer transition-all ${
                    isTarget && isRunning
                      ? 'scale-110'
                      : ''
                  }`}
                  onClick={() => togglePod(pod.id)}
                >
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 transition-all ${
                      isRunning
                        ? isTarget
                          ? 'bg-primary/40 border-primary shadow-lg shadow-primary/30'
                          : 'bg-primary/20 border-primary/50'
                        : 'bg-muted/10 border-muted/30 opacity-50'
                    }`}
                  >
                    <Box className={`w-7 h-7 ${isRunning ? 'text-primary' : 'text-muted'}`} />
                  </div>
                  <span className="text-xs text-muted mt-1 font-mono">{pod.name}</span>
                  <span className="text-xs text-muted font-mono">{pod.ip}</span>
                  <span className={`text-xs mt-1 font-mono ${isRunning ? 'text-primary' : 'text-muted'}`}>
                    {isRunning ? 'Running' : 'Stopped'}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Client to Service */}
            <line
              x1="18%"
              y1="18%"
              x2="50%"
              y2="45%"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="text-muted/20"
            />
            {/* Service to Pods */}
            {pods.map((pod) => {
              const podPositions = {
                pod1: { x: 20, y: 70 },
                pod2: { x: 80, y: 70 },
                pod3: { x: 50, y: 75 },
              };
              const position = podPositions[pod.id as keyof typeof podPositions] || { x: 50, y: 70 };
              return (
                <line
                  key={pod.id}
                  x1="50%"
                  y1="50%"
                  x2={`${position.x}%`}
                  y2={`${position.y}%`}
                  stroke="currentColor"
                  strokeWidth={pod.status === 'running' ? '2' : '1'}
                  strokeDasharray="4 4"
                  className={pod.status === 'running' ? 'text-secondary/30' : 'text-muted/10'}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-surface rounded-xl p-6 border border-muted/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-lg text-text">통신 테스트</h3>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-muted hover:text-text transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => sendRequest('dns')}
            disabled={runningPods.length === 0 || animatingRequest !== null}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-secondary/50 bg-secondary/10 hover:bg-secondary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-secondary font-mono text-sm"
          >
            <Play className="w-4 h-4" />
            DNS로 요청 ({SERVICE.dns})
          </button>
          <button
            onClick={() => sendRequest('ip')}
            disabled={runningPods.length === 0 || animatingRequest !== null}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-secondary/50 bg-secondary/10 hover:bg-secondary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-secondary font-mono text-sm"
          >
            <Play className="w-4 h-4" />
            IP로 요청 ({SERVICE.clusterIP})
          </button>
        </div>

        <div className="p-3 rounded-lg bg-muted/10 border border-muted/30">
          <div className="text-xs text-muted font-mono mb-2">💡 팁:</div>
          <ul className="text-xs text-muted space-y-1 ml-4">
            <li>• DNS 이름으로 Service에 접근할 수 있습니다</li>
            <li>• Service는 요청을 실행 중인 Pod에 로드 밸런싱합니다</li>
            <li>• Pod를 클릭하여 실행/중지할 수 있습니다</li>
            <li>• DNS: {SERVICE.dns}</li>
            <li>• ClusterIP: {SERVICE.clusterIP}</li>
          </ul>
        </div>
      </div>

      {/* Request Logs */}
      {requestLogs.length > 0 && (
        <div className="bg-surface rounded-xl p-6 border border-muted/30">
          <h3 className="font-mono text-lg text-text mb-4">통신 로그</h3>
          <div className="space-y-2">
            {requestLogs.map(log => (
              <div
                key={log.id}
                className="p-3 rounded-lg bg-muted/10 border border-muted/30 font-mono text-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${log.method === 'dns' ? 'bg-warning' : 'bg-secondary'}`} />
                  <span className="text-text">
                    {log.from} → {log.to}
                  </span>
                  <span className="text-muted">({log.method.toUpperCase()})</span>
                </div>
                <div className="text-xs text-muted mt-1">{log.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

