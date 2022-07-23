import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  console.log('id : ', id);

  const mode = searchParams.get('mode');
  console.log('mode : ', mode);

  return (
    <div>
      <h2>여기는 Edit입니다</h2>
      <button onClick={() => setSearchParams({ who: 'winterlood' })}>
        바꾸기
      </button>
      <button onClick={() => navigate('/home')}>HOME으로 가기</button>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default Edit;
