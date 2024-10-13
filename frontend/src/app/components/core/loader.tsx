import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center min-h-[120px] justify-center bg-opacity-20 z-50 rounded">
      <div className="rounded-lg p-4 flex items-center space-x-2">
        <Loader2
          className="h-8 w-8 animate-spin text-blue-900"
          style={{ strokeWidth: 2 }}
        />{' '}
      </div>
    </div>
  );
}
