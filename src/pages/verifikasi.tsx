import Heads from '@/layout/Head/Head';
import VerifiedPage from '@/components/VerifiedPage';

export default function Verifikasi() {
  return (
    <>
      <Heads title="BacaAku" />
      <main>
        <div className="flex h-screen w">
          <div className="m-auto">
            <VerifiedPage status="warning" />
          </div>
        </div>
      </main>
    </>
  );
}
