import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);
  const errorConfirmedHandler = () => {
    setError(null);
  }

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req
  });

  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    (err) => {
      //FIXME It looks like the state is not beign updated here
      console.log(err);
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  },[httpClient, reqInterceptor, resInterceptor]);

  return [error, errorConfirmedHandler]
}
