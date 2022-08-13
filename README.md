### 페이지 라우팅 2 - React Router 응용

1.Path Variable은 '/:id' 처럼 표현해준다.

```c
  <Route path="/diary/:id" element={<Diary />} />
```

2.Path Variable 기능 사용하려면 꺼내줘야한다. useParams 사용하기

```c
    const { id } = useParams();
```

3.Query는 웹페이지에 데이터를 전달하는 가장 간단한 방법

```c
  /* Query String */
  /edit?id=10&mode=dark
```

4. Query String는 별도의 처리를 안해도 랩핑이 된다.(라우팅 경로에 영향을 안준다!)
5. Query String을 꺼내서 사용하려면 useSearchParams 해줘야한다.

```c
  /* 비구조할당해서 자유롭게 이름을 정의해도 된다. */
  const [searchParams, setSearchParams] = useSearchParams();
```

6. Page Moving을 하기위해 useNavigate을 사용한다.

```c
  /* useNavigate 함수를 navigate로 받아준다. */
  const navigate = useNavigate();
```

```c
  /* Link 이용하지않고 이동할수 있다. */
  /* 주로 로그인 안된 상태의 사용자가 로그인페이지로 이동시키고 싶을때 사용한다. */
  <button onClick={() => navigate('/home')}>HOME으로 가기</button>
```

```c
  /* 뒤로 한번만 이동하니깐 -1를 사용했다. */
  <button onClick={() => navigate(-1)}>뒤로 가기</button>
```

### 프로젝트 기초 공사 1

1. public assets 경로 설정하기

```c
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';
  <img src= {process.env.PUBLIC_URL + `/assets/emotion4.png`}>
```

2. props로 컴포넌트 재활용할수 있다

```c
  const MyHeader = ({ headText, leftChild, rightChild }) => {
    return (
      <header>
        <div className="head_btn_left">{leftChild}</div>
        <div className="head_text">{headText}</div>
        <div className="head_btn_right">{rightChild}</div>
      </header>
    );
  };
```

```c
  const MyButton = ({ text, type, onClick }) => {
    const btntype = ['positive', 'negative'].includes(type) ? type : 'default';

    return (
      <button
        className={['MyButton', `MyButton_${btntype}`].join(' ')}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };

  MyButton.defaultProps = {
    type: 'default',
  };
```

```c
  <MyHeader
        headText={'App'}
        leftChild={
          <MyButton text={'왼쪽버튼'} onClick={() => alert('왼쪽클릭')} />
        }
        rightChild={
          <MyButton
            text={'오른쪽버튼'}
            onClick={() => alert('오른쪽클릭')}
          />
        }
      />
```

```c
   <MyButton
     text={'버튼'}
     onClick={() => alert('버튼클릭')}
     type={'positive'}
   />
   <MyButton
     text={'버튼'}
     onClick={() => alert('버튼클릭')}
     type={'negative'}
   />
   <MyButton text={'버튼'} onClick={() => alert('버튼클릭')} />
```

### 프로젝트 기초 공사 2

### 페이지 구현 - 홈 (/)

1. diaryList props가 정상적으로 동작안할수 있으니 defaultProps 사용

```c
  DiaryList.defaultProps = {
    diaryList: [],
  };
```

2. 해당월에 작성된 글 필터링

```c
  diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
```

3.  diaryList depth에 전달을 안해주면 useEffect 함수가 diaryList가 바뀌었을때 동작 안함. diaryList 바뀌면 동작해야하는 이유는 diaryList 바뀌었다는 것은 추가,수정,삭제되었을때 의미함. 그때 diaryList도 바꿔줘야 한다.

```c
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);
```

4. diaryList.sort를 사용해버리면 원본자체가 정렬되어버림. 그래서 깊은 복사를 통해 사용해야함

```c
    const copyList = JSON.parse(JSON.stringify(diaryList));
```

5. sort함수를 다시 만나면 더 공부하자!
