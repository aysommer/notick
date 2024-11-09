import { lazy, Suspense } from 'react';
import { useModalStore } from '../../store';

const SettingsModal = lazy(() => import('./SettingsModal'));

const Modals: React.FC = () => {
   const settings = useModalStore((state) => state.settings);

   return (
      <Suspense fallback={null}>
         {(settings) ? <SettingsModal /> : null}
      </Suspense>
   )
}

export default Modals;