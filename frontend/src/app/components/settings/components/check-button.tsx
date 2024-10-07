import { Button } from '@frontend/shared/components/ui/button';
import { Check, Loader } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import HealthService from '../../../core/services/health.service';
import { toast } from 'sonner';

export const CheckButton = () => {
  const [checking, setChecking] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { formState } = useFormContext();

  async function onVerifyConnection() {
    setChecking(true);
    setSuccess(false);
    const response = await HealthService.getDatabaseHealth();
    const status = response.data.message === 'ok';
    setTimeout(() => {
      if (status) {
        setSuccess(true);
        toast.success('Connection verified');
      } else {
        toast.error('Connection failed');
        setSuccess(false);
      }
      setChecking(false);
    }, 2000);
  }

  return (
    <Button
      className="w-1/2"
      variant="outline"
      type="button"
      disabled={!formState.isValid}
      onClick={onVerifyConnection}
    >
      {success && (
        <Check className="mr-2 text-green-600 transition-opacity opacity-100 duration-150" />
      )}
      {checking && <Loader className="w-5 animate-spin mr-2" />}
      <span>Verify</span>
    </Button>
  );
};
