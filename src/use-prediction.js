import { useState, useEffect } from 'react';

const DEFAULT_JSON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const DEFAULT_METHOD = 'POST';
const BASE_URL = 'https://api.deepserve.ai';

const json = JSON.stringify;

const { REACT_APP_DEEPSERVE_API_KEY, REACT_APP_DEEPSERVE_API_VERSION } = process.env;

const HEADERS = {
  ...DEFAULT_JSON_HEADERS,
  'Authorization': `Bearer ${REACT_APP_DEEPSERVE_API_KEY}`,
  'X-DEEPSERVE-API-VERSION': REACT_APP_DEEPSERVE_API_VERSION
}

export const usePrediction = (project, data) => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(false);


  const endpoint = `${BASE_URL}/${project}/predict`;

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
      .then(({ input, output, meta, error }) => {
        setPrediction(output);
        setMeta(meta);
        setLoading(false);
      })
      .catch((err) => setError(true) && setLoading(false));
    };

    fetchPrediction()
  }, [json(data)]);

  return { loading, error, meta, prediction };
};
