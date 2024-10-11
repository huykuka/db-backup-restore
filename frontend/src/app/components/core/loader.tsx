import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20 z-50 rounded">
      <div className="bg-white rounded-lg p-4 flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      </div>
    </div>
  );
}
