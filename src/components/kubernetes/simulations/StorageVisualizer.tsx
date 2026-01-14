'use client';

import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { HardDrive, FileText, Box, Link2, RotateCcw, Database, CheckCircle2 } from 'lucide-react';

interface PV {
  id: string;
  name: string;
  size: string;
  status: 'available' | 'bound';
  boundTo?: string;
}

interface PVC {
  id: string;
  name: string;
  size: string;
  status: 'pending' | 'bound';
  boundTo?: string;
}

interface Pod {
  id: string;
  name: string;
  status: 'running' | 'stopped';
  volumeMounted?: boolean;
  dataFiles: string[];
}

const INITIAL_PV: PV = {
  id: 'pv-1',
  name: 'database-storage',
  size: '10Gi',
  status: 'available',
};

const INITIAL_POD: Pod = {
  id: 'pod-1',
  name: 'app-pod',
  status: 'running',
  volumeMounted: false,
  dataFiles: [],
};

export function StorageVisualizer() {
  const [pv, setPv] = useState<PV>(INITIAL_PV);
  const [pvc, setPvc] = useState<PVC | null>(null);
  const [pod, setPod] = useState<Pod>(INITIAL_POD);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animatingBinding, setAnimatingBinding] = useState(false);
  const [animatingMount, setAnimatingMount] = useState(false);
  const [showMessage, setShowMessage] = useState<string | null>(null);

  const bindingLineRef = useRef<SVGLineElement>(null);
  const mountLineRef = useRef<SVGLineElement>(null);
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
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const createPVC = () => {
    if (pvc) return;

    const newPVC: PVC = {
      id: 'pvc-1',
      name: 'app-storage-claim',
      size: '5Gi',
      status: 'pending',
    };

    setPvc(newPVC);
    setShowMessage('PVC가 생성되었습니다. PV와 바인딩 대기 중...');
    
    // Auto-bind after a short delay
    setTimeout(() => {
      bindPVCtoPV(newPVC);
    }, 1500);
  };

  const bindPVCtoPV = (newPVC: PVC) => {
    if (pv.status !== 'available') return;

    setAnimatingBinding(true);
    setShowMessage('PVC와 PV를 바인딩하는 중...');

    // Animate binding connection
    if (bindingLineRef.current) {
      anime({
        targets: bindingLineRef.current,
        opacity: [0, 0.5],
        duration: 600,
        easing: 'easeOutElastic(1, 0.8)',
      });
    }

    setTimeout(() => {
      setPv(prev => ({
        ...prev,
        status: 'bound',
        boundTo: newPVC.id,
      }));
      setPvc({
        ...newPVC,
        status: 'bound',
        boundTo: pv.id,
      });
      setAnimatingBinding(false);
      setShowMessage('PVC와 PV가 성공적으로 바인딩되었습니다!');
    }, 800);
  };

  const mountVolume = () => {
    if (!pvc || pvc.status !== 'bound' || pod.volumeMounted) return;

    setAnimatingMount(true);
    setShowMessage('볼륨을 Pod에 마운트하는 중...');

    // Animate mount connection
    if (mountLineRef.current) {
      anime({
        targets: mountLineRef.current,
        opacity: [0, 0.5],
        duration: 600,
        easing: 'easeOutElastic(1, 0.8)',
      });
    }

    setTimeout(() => {
      setPod(prev => ({
        ...prev,
        volumeMounted: true,
        dataFiles: ['data.db', 'config.json'],
      }));
      setAnimatingMount(false);
      setShowMessage('볼륨이 Pod에 마운트되었습니다. 이제 데이터가 영구적으로 저장됩니다!');
    }, 800);
  };

  const addDataFile = () => {
    if (!pod.volumeMounted) return;

    const newFile = `data-${Date.now()}.log`;
    setPod(prev => ({
      ...prev,
      dataFiles: [...prev.dataFiles, newFile],
    }));
    setShowMessage(`새 파일 "${newFile}"이(가) 볼륨에 저장되었습니다.`);
  };

  const restartPod = () => {
    if (!pod.volumeMounted) {
      setShowMessage('볼륨이 마운트되지 않았습니다. Pod 재시작 시 데이터가 손실됩니다.');
      return;
    }

    setPod(prev => ({ ...prev, status: 'stopped' }));
    setShowMessage('Pod를 재시작하는 중...');

    setTimeout(() => {
      setPod(prev => ({
        ...prev,
        status: 'running',
      }));
      setShowMessage('Pod가 재시작되었습니다. 볼륨이 마운트되어 있으므로 데이터가 유지됩니다!');
    }, 1500);
  };

  const reset = () => {
    setPv(INITIAL_PV);
    setPvc(null);
    setPod(INITIAL_POD);
    setAnimatingBinding(false);
    setAnimatingMount(false);
    setShowMessage(null);
    if (bindingLineRef.current) anime.set(bindingLineRef.current, { opacity: 0 });
    if (mountLineRef.current) anime.set(mountLineRef.current, { opacity: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Storage Diagram */}
      <div className="bg-surface rounded-xl p-6 border border-muted/30">
        <div className="relative bg-background rounded-xl min-h-[500px] overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
            <defs>
              <marker
                id="arrow-secondary"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#00d4ff" fillOpacity="0.7" />
              </marker>
              <marker
                id="arrow-primary"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#00ff9f" fillOpacity="0.7" />
              </marker>
            </defs>
            {/* Binding Connection: PV to PVC */}
            {pv.status === 'bound' && pvc && (
              <line
                ref={bindingLineRef}
                x1="22%"
                y1="27%"
                x2="46%"
                y2="27%"
                stroke="#00d4ff"
                strokeWidth="2"
                strokeOpacity="0.7"
                markerEnd="url(#arrow-secondary)"
              />
            )}
            {/* Mount Connection: PVC to Pod */}
            {pod.volumeMounted && pvc && (
              <line
                ref={mountLineRef}
                x1="52%"
                y1="50%"
                x2="52%"
                y2="58%"
                stroke="#00ff9f"
                strokeWidth="2"
                strokeOpacity="0.7"
                markerEnd="url(#arrow-primary)"
              />
            )}
          </svg>

          {/* PersistentVolume */}
          <div className="absolute left-[10%] top-[20%] flex flex-col items-center">
            <div
              className={`w-20 h-20 rounded-lg flex items-center justify-center border-2 transition-all ${
                pv.status === 'bound'
                  ? 'bg-secondary/30 border-secondary/70'
                  : 'bg-secondary/20 border-secondary/50'
              }`}
            >
              <HardDrive className={`w-10 h-10 ${pv.status === 'bound' ? 'text-secondary' : 'text-secondary/70'}`} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-mono text-text font-semibold">{pv.name}</div>
              <div className="text-xs text-muted">{pv.size}</div>
              <div className={`text-xs mt-1 px-2 py-0.5 rounded ${
                pv.status === 'available'
                  ? 'bg-muted/20 text-muted'
                  : 'bg-secondary/20 text-secondary'
              }`}>
                {pv.status === 'available' ? 'Available' : 'Bound'}
              </div>
            </div>
          </div>

          {/* PersistentVolumeClaim */}
          {pvc && (
            <div className="absolute left-[45%] top-[20%] flex flex-col items-center">
              <div
                className={`w-20 h-20 rounded-lg flex items-center justify-center border-2 transition-all ${
                  pvc.status === 'bound'
                    ? 'bg-warning/30 border-warning/70'
                    : 'bg-warning/20 border-warning/50'
                }`}
              >
                <FileText className={`w-10 h-10 ${pvc.status === 'bound' ? 'text-warning' : 'text-warning/70'}`} />
              </div>
              <div className="mt-2 text-center">
                <div className="text-xs font-mono text-text font-semibold">{pvc.name}</div>
                <div className="text-xs text-muted">{pvc.size}</div>
                <div className={`text-xs mt-1 px-2 py-0.5 rounded ${
                  pvc.status === 'pending'
                    ? 'bg-muted/20 text-muted'
                    : 'bg-warning/20 text-warning'
                }`}>
                  {pvc.status === 'pending' ? 'Pending' : 'Bound'}
                </div>
              </div>
            </div>
          )}

          {/* Pod */}
          <div className="absolute left-[47%] top-[60%] flex flex-col items-center">
            <div
              className={`w-20 h-20 rounded-lg flex items-center justify-center border-2 transition-all ${
                pod.status === 'running'
                  ? pod.volumeMounted
                    ? 'bg-primary/30 border-primary/70'
                    : 'bg-primary/20 border-primary/50'
                  : 'bg-muted/20 border-muted/50'
              }`}
            >
              <Box className={`w-10 h-10 ${
                pod.status === 'running'
                  ? pod.volumeMounted
                    ? 'text-primary'
                    : 'text-primary/70'
                  : 'text-muted'
              }`} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-mono text-text font-semibold">{pod.name}</div>
              <div className={`text-xs mt-1 px-2 py-0.5 rounded ${
                pod.status === 'running'
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted/20 text-muted'
              }`}>
                {pod.status === 'running' ? 'Running' : 'Stopped'}
              </div>
              {pod.volumeMounted && (
                <div className="text-xs mt-1 px-2 py-0.5 rounded bg-secondary/20 text-secondary flex items-center gap-1 justify-center">
                  <Link2 className="w-3 h-3" />
                  Mounted
                </div>
              )}
            </div>
          </div>

          {/* Volume Data Visualization */}
          {pod.volumeMounted && (
            <div className="absolute left-[63%] top-[25%] w-[35%] bg-surface border border-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-secondary" />
                <span className="text-xs font-mono text-text font-semibold">Persistent Volume Data</span>
              </div>
              <div className="space-y-1">
                {pod.dataFiles.map((file, index) => (
                  <div
                    key={index}
                    className="text-xs text-muted flex items-center gap-2 p-1 rounded hover:bg-muted/10"
                  >
                    <FileText className="w-3 h-3" />
                    <span className="font-mono">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-surface rounded-xl p-6 border border-muted/30">
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={createPVC}
            disabled={!!pvc}
            className="px-4 py-2 bg-warning/20 text-warning border border-warning/50 rounded-lg hover:bg-warning/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-mono"
          >
            PVC 생성
          </button>
          <button
            onClick={mountVolume}
            disabled={!pvc || pvc.status !== 'bound' || pod.volumeMounted}
            className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-mono"
          >
            볼륨 마운트
          </button>
          <button
            onClick={addDataFile}
            disabled={!pod.volumeMounted}
            className="px-4 py-2 bg-secondary/20 text-secondary border border-secondary/50 rounded-lg hover:bg-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-mono"
          >
            데이터 추가
          </button>
          <button
            onClick={restartPod}
            disabled={pod.status === 'stopped'}
            className="px-4 py-2 bg-danger/20 text-danger border border-danger/50 rounded-lg hover:bg-danger/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-mono"
          >
            Pod 재시작
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-muted/20 text-muted border border-muted/50 rounded-lg hover:bg-muted/30 transition-all text-sm font-mono flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
        </div>

        {/* Educational Message */}
        {showMessage && (
          <div
            ref={messageRef}
            className="mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text">{showMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-surface rounded-xl p-6 border border-muted/30">
        <h4 className="text-lg font-mono text-text mb-4">스토리지 개념 설명</h4>
        <div className="space-y-3 text-sm text-muted">
          <div>
            <strong className="text-text">PersistentVolume (PV):</strong> 클러스터 관리자가 제공하는 영구 스토리지 리소스입니다.
          </div>
          <div>
            <strong className="text-text">PersistentVolumeClaim (PVC):</strong> 사용자가 스토리지를 요청하는 방법입니다. PVC는 적합한 PV와 자동으로 바인딩됩니다.
          </div>
          <div>
            <strong className="text-text">볼륨 마운트:</strong> PVC를 Pod에 마운트하면 Pod가 재시작되어도 데이터가 유지됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

