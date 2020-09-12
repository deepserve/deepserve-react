import React, { useState, useEffect } from 'react';
import { Container, Title, Key, Epic, EpicKey, EpicKeyDivider, Section, SectionTitle } from './styles'
import { usePrediction } from 'deepserve-react';
import { CLASSIFY_TEST } from './predictions';

const Prediction = ({ url }) => {
  console.log('predictionUrl', url);
  if (!url) return <h2>Input a URL to predict</h2>

  const { loading, error, prediction } = usePrediction('jeffrwell/image-project', {text: 'hi this is a test'});


  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        <img style={{width: '200px'}} src={url} />
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <h2>Error!</h2>
        <img style={{width: '200px'}} src={url} />
      </div>
    )
  }
  if (prediction) {
    return (
      <div>
        <h2>{prediction}</h2>
        <img style={{width: '200px'}} src={url} />
      </div>
    )
  }
  return <h2>Test</h2>
}

const ContentMain = ({ task }) => {
  const [url, setUrl] = useState(null);

  const onUrlUpdate = (e) => {
    console.log('url', e.currentTarget.value);
  }

  const onUrlBlur = (e) => {
    setUrl(e.currentTarget.value)
    console.log('blur', e.currentTarget.value);
  }

  return (
    <Container>
      <input defaultValue={url} placeholder="type url here" style={{color: '#333333'}} onChange={onUrlUpdate} onBlur={onUrlBlur}></input>
      <Prediction url={url} />
    </Container>
  );
}

export default ContentMain;
