import React from 'react';
import { useParams } from 'react-router-dom';

const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h2>여기는 Diary입니다</h2>
    </div>
  );
};

export default Diary;
