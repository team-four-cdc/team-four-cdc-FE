import { DependencyList, useEffect } from 'react';

export const useAsync = <T>(
  asyncFn: () => Promise<T>,
  // @ts-ignore
  onSuccess: () => void,
  onError?: () => void,
  deps?: DependencyList
) => {
  useEffect(() => {
    const cancelablePromise = makeCancelable(asyncFn());
    cancelablePromise.promise
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        if (!err.isCanceled && onError) {
          onError(err);
        }
      });
    return () => cancelablePromise.cancel();
  }, deps);
};

const makeCancelable = <T>(promise: Promise<T>) => {
  let hasCanceled_ = false;

  const wrappedPromise: Promise<T> = new Promise((resolve, reject) => {
    promise.then(
      (val) => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      (error) => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
