import Heads from '@/layout/Head/Head';
import VerifiedPage from '@/components/VerifiedPage';
import { wrapper } from '@/store';
import { authApi } from '@/services';

interface Props {
  status: 'success' | 'failed' | 'error';
}

export default function Verifikasi(props: Props) {
  const { status } = props;

  return (
    <>
      <Heads showNavbar={false} title="Verifikasi" />
      <main>
        <div className="flex h-screen w">
          <div className="m-auto">
            <VerifiedPage status={status} />
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const generateCode = context.query.code as string;

    const response = await store.dispatch(
      authApi.endpoints.verify.initiate({ generateCode })
    );

    const status = 'error' in response ? 'failed' : 'success';

    return {
      props: { status },
    };
  }
);
