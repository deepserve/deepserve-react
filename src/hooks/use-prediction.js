import { useState, useEffect } from 'react';

const DEFAULT_JSON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const DEFAULT_METHOD = 'POST';
const BASE_URL = 'http://local.deepserveapi.com';

const json = JSON.stringify(obj);

const { DEEPSERVE_API_KEY, DEEPSERVE_API_VERSION } = process.env;

const HEADERS = {
  ...DEFAULT_JSON_HEADERS,
  'Authorization': `Bearer ${DEEPSERVE_API_KEY}`,
  'X-DEEPSERVE-API-VERSION': DEEPSERVE_API_VERSION
}

export const usePrediction = (endpoint, data) => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);



  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchPrediction = async () => {
      const rawResult = fetch(endpoint, {
        method: DEFAULT_METHOD,
        headers: HEADERS,
        body: json(data)
      })
      .then(res => res.json())
      .then(({ result, confidence }) => {
        console.log('res', result);
        setPrediction(result);
        setLoading(false);
      })
      .catch((err) => setError(true));
    };

    fetchPrediction()
  }, [json(data)]);

  return { loading, error, prediction };
};
