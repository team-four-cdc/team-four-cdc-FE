import { DependencyList, useEffect } from 'react';

interface CancelableIF {
  isCanceled: boolean
}

function makeCancelable<T>(promise: Promise<T>) {
  let hasCanceled = false;

  const wrappedPromise: Promise<T> = new Promise((resolve, reject) => {
    promise.then(
      (val) => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      (error) => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

export const useAsync = <T>(
  asyncFn: () => Promise<T>,
  onSuccess: (args: T) => void,
  onError?: (args: CancelableIF) => void,
  deps?: DependencyList,
) => {
  useEffect(() => {
    const cancelablePromise = makeCancelable(asyncFn());
    cancelablePromise.promise
      .then((data) => {
        onSuccess(data);
      })
      .catch((err: CancelableIF) => {
        if (!err.isCanceled && onError) {
          onError(err);
        }
      });
    return () => cancelablePromise.cancel();
  }, deps);
};

