import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // If you're using React Router

export default function LeadingBar() {
  const location = useLocation(); // Replace with your routing logic if not using React Router
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: any;

    const startLoading = async () => {
      setLoading(true);
      setProgress(0);

      await new Promise<void>((resolve) => {
        timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              clearInterval(timer);
              resolve();
              return 100;
            }
            const diff = Math.random() * 20;
            return Math.min(oldProgress + diff, 100);
          });
        }, 20);
      });
    };

    const stopLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };

    startLoading().then(() => stopLoading());

    // Cleanup function to stop loading and remove event listener
    return () => {
      clearInterval(timer);
    };
  }, [location.pathname]); // Trigger effect on location change

  if (!loading) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="fixed top-0 left-0 right-0 h-[1px] bg-white z-50 transition-all duration-100 eas-in-out"
      style={{ width: `${progress}%` }}
    />
  );
}
