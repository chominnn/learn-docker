'use client';

import { useState } from 'react';
import { Search, Filter, Clock } from 'lucide-react';

type LogEntry = {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
};

const sampleLogs: LogEntry[] = [
  { timestamp: '2024-01-14 10:23:45', level: 'info', service: 'web-server', message: 'Request GET /api/users completed in 45ms' },
  { timestamp: '2024-01-14 10:23:46', level: 'error', service: 'auth-service', message: 'Authentication failed: invalid token' },
  { timestamp: '2024-01-14 10:23:47', level: 'warning', service: 'database', message: 'Connection pool exhausted, creating new connections' },
  { timestamp: '2024-01-14 10:23:48', level: 'info', service: 'web-server', message: 'Request POST /api/orders completed in 123ms' },
  { timestamp: '2024-01-14 10:23:49', level: 'error', service: 'payment-service', message: 'Payment processing failed: insufficient funds' },
  { timestamp: '2024-01-14 10:23:50', level: 'info', service: 'web-server', message: 'Request GET /api/products completed in 32ms' },
  { timestamp: '2024-01-14 10:23:51', level: 'warning', service: 'cache', message: 'Cache miss for key: user:123' },
  { timestamp: '2024-01-14 10:23:52', level: 'error', service: 'web-server', message: 'Request GET /api/orders failed: 500 Internal Server Error' },
  { timestamp: '2024-01-14 10:23:53', level: 'info', service: 'auth-service', message: 'User login successful: user@example.com' },
  { timestamp: '2024-01-14 10:23:54', level: 'error', service: 'database', message: 'Query timeout: SELECT * FROM orders WHERE user_id = 123' },
];

export function LogSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  const filteredLogs = sampleLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesService = serviceFilter === 'all' || log.service === serviceFilter;

    return matchesSearch && matchesLevel && matchesService;
  });

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error':
        return 'text-danger bg-danger/10 border-danger/30';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/30';
      default:
        return 'text-primary bg-primary/10 border-primary/30';
    }
  };

  const services = Array.from(new Set(sampleLogs.map(log => log.service)));

  return (
    <div className="bg-surface rounded-xl p-8 border border-muted/30">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-secondary" />
          <h4 className="text-lg font-mono text-text">로그 검색 시스템</h4>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="로그 내용 검색... (예: error, payment, timeout)"
              className="w-full pl-10 pr-4 py-3 bg-terminal border border-muted/30 rounded-lg text-text font-mono text-sm focus:outline-none focus:border-secondary/50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted" />
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as typeof levelFilter)}
              className="px-3 py-2 bg-terminal border border-muted/30 rounded-lg text-text font-mono text-sm focus:outline-none focus:border-secondary/50"
            >
              <option value="all">모든 레벨</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted" />
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 bg-terminal border border-muted/30 rounded-lg text-text font-mono text-sm focus:outline-none focus:border-secondary/50"
            >
              <option value="all">모든 서비스</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 p-3 bg-terminal rounded-lg font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted">검색 결과:</span>
            <span className="text-text font-semibold">
              {filteredLogs.length}개 / {sampleLogs.length}개
            </span>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="text-center text-muted py-12 font-mono text-sm">
              검색 결과가 없습니다
            </div>
          ) : (
            filteredLogs.map((log, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${getLevelColor(log.level)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 opacity-70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-xs font-mono opacity-70">{log.timestamp}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-surface/50 rounded">
                        {log.service}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-surface/50 rounded uppercase">
                        {log.level}
                      </span>
                    </div>
                    <div className="text-sm font-mono break-words">{log.message}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-terminal rounded-lg font-mono text-xs">
          <div className="text-muted mb-2">💡 검색 팁:</div>
          <ul className="space-y-1 text-text">
            <li>• 키워드로 검색: "error", "payment", "timeout" 등</li>
            <li>• 서비스명으로 필터링: 특정 서비스의 로그만 보기</li>
            <li>• 레벨로 필터링: 에러 로그만 빠르게 확인</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

