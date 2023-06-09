# 1. React의 상태 관리

## (1) React에서 상태 관리는 왜 필요한가?

### 상태(state)

React에서 페이지가 리렌더링 되는 가장 큰 예시 두가지는 props와 state이다. `props`는 **컴포넌트 간** 전달되는 데이터로 컴포넌트 내부에서 값을 바꿀 수 없다. 따라서 컴포넌트 내에서 값을 변경해야 하는 경우 사용하는 것이 state이다. 즉, `state`는 **컴포넌트 내**에서 관리되고 바뀌는 동적인 데이터를 말한다.

### 상태 관리의 필요성 - props drilling

![image](https://user-images.githubusercontent.com/77691829/236114743-ea9a3efc-0134-44ed-b913-a63a16915b10.png)

&nbsp; 리액트는 **단방향 데이터 흐름**이라는 특징을 갖는다. 리렌더링 되며 변화는 값을 표시하는 state를 다른 자식 컴포넌트로 전달하기 위해서는, props로 값을 내려주게 된다. 하지만 추가적인 작업이 없다면 자식 컴포넌트는 부모로부터 받은 state를 직접 변경할 방법이 없으므로, 상태 값을 변경하는 함수를 props로 또 전달받아야 한다.

따라서 컴포넌트 갯수가 많아지고 공유해야 할 state가 늘어나면, 상태 값과 그것을 변경하는 함수도 함께 전달하고자 부모와 자식간 전달 과정을 매번 작성해야 하는 매우 비효율적인 상황이 발생한다. **또한 여러 개의 컴포넌트를 타고 내려가다보면 이 props가 어디서부터 시작된건지 파악하기 쉽지 않아지고, 유지 보수 또한 어려워진다.**

이러한 문제 상황을 `props drilling`이라고 부른다. 프로젝트가 커지고 컴포넌트 계층이 많을수록 props drilling이 발생하기 쉽다.

&nbsp; 이러한 **props drilling을 피하기 위해, 의미 없는 리렌더를 피하기 위해 상태 관리가 필요하다.** **상태 관리에 따라 유지보수 관점에서 코드의 라이프 사이클 또한 결정될수 있으므로** 어떤 상태 라이브러리를 쓰며 어떤 구조로 상태를 설계해서 다루느냐가 중요하다.

---

## (2) 관리 해야 하는 상태에 대한 기준은 무엇인가?

&nbsp; 리액트 상태는 **범위**에 따라 지역 상태와 전역 상태로 구분된다.

`지역 상태`는 state가 몇몇 컴포넌트에 국한되어 영향을 준다. `전역 상태`는 많은 컴포넌트에 영향을 끼치는 상태를 말한다.

&nbsp; **지역 상태와 전역 상태의 구분은 상대적이다**. 또한 상태를 전역적으로 관리할지, 지역적으로 관리할지도 애플리케이션의 규모, 구성, 개발자의 선호에 따라 다르다.

&nbsp; 전역적으로 상태를 관리하면 애플리케이션 전체에서 필요한 데이터를 쉽게 공유하고, 관리할수 있다는 장점이 있다. 계정이나 설정 정보 같이 서버와 주고 받는 데이터, 화면과 무관한 데이터, 컴포넌트를 가로지르는 form 요소와 같은 데이터들은 전역으로 관리하면 좋다. 하지만 너무 많은 데이터를 전역 상태로 관리하면, 컴포넌트 간 의존성이 높아져 유지보수가 어려워질 수 있으며 성능적인 측면에서도 악영향을 미칠수 있다. 따라서 컴포넌트 내부에서만 사용되는 상태는 해당 컴포넌트 내에서 관리하는 것이 적합하다.

다시 말해, **관리 해야 하는 상태의 기준은 상황에 따라 상대적이나 보편적으로 애플리케이션 전체에서 공유되는 데이터는 ‘전역 상태’로, 특정 컴포넌트에서만 사용되는 데이터는 해당 컴포넌트의 지역적인 상태를 관리하는 것이 좋다.**

---

## (3) 어떤 상태 관리 라이브러리를 어떤 상황에서 사용해야 할까? (장단점 또는 간단 비교 분석)

![image](https://user-images.githubusercontent.com/77691829/236114816-cccbf7c7-1563-47e2-89c1-ada414f8c1ac.png)

&nbsp; 많이 사용되고 있는 라이브러리가 무엇인지 비교해 볼 수 있는 npm trends의 그래프를 분석해보면, 지난 1년간 Redux가 가장 높은 인기도를 보여줬으며 그 다음으로 MobX, Recoil이 그 뒤를 따르고 있음을 알 수 있다.

### 1. Redux

![image](https://user-images.githubusercontent.com/77691829/236114841-e59826bd-a3d9-43e0-9946-c60c839c767f.png)

- 자바스크립트 앱에서 상태(state)를 효율적으로 관리할 수 있게 도와주는 라이브러리이다. Redux를 사용하면 컴포넌트의 상태 업데이트 관련 로직을 **다른 파일로 분리시켜서** 더욱 효율적으로 관리할 수 있다. 또한 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 **여러 컴포넌트를 거치지 않고 손쉽게 상태 값을 전달하거나 업데이트** 할 수 있다.
- Redux의 등장 이전, 초기의 상태 관리는 **MVC(Model-View-Controller) 아키텍처**으로 관리했었다. MVC 아키텍처는 모델 상태가 바뀌면 뷰가 바뀌고, 뷰에서 변경이 일어나면 다시 모델 상태가 바뀌어 컨트롤러가 이를 조작하는 양방향 데이터 흐름을 가지고 있어 프로젝트의 규모가 커지고 상태가 많아질수록 관리가 어려웠다. 이를 개선하기 위해 페이스북은 단방향 데이터 흐름의 **Flux 아키텍처**를 내놓았다. Redux는 Flux 아키텍처를 따르나, Flux에서는 store가 여러 개였지만, Redux에서는 하나의 store에 여러 개의 reducer가 존재한다는 차이점이 있다.
- `장점` :
  - 단방향 모델링이기 때문에 데이터 흐름을 예측하기 쉬워 디버깅에 유리한다.
  - action을 dispatch 할때마다 기록이 남아 이전 상태로 돌아갈수 있다.
  - 스토어라는 이름의 전역 자바스크립트 변수를 통해 상태를 한 곳에서 관리하는 상태의 중앙화라는 특징을 지녀, 전역 상태를 관리할 때 효과적이다.
- `단점`:
  - 액션 등을 미리 만들어놔야 하기 때문에 아주 작은 기능이여도 리덕스로 구현하는 순간 몇 개의 파일들을 필수로 만들어야하여 코드량이 늘어난다.
  - Redux는 상태를 읽기 전용으로 취급할 뿐, 실제 읽기 전용으로 만들어주지는 않는다. 때문에 상태를 실수로 직접 변경하지 않도록 항상 주의해야 한다.
- `Redux를 사용하면 좋을 때` :
  - 앱의 여러 위치에서 필요한 많은 양의 상태들이 존재하여 전역 상태가 필요하다고 느낄 때
  - 상태들이 자주 업데이트 되고 업데이트 로직이 복잡할 때
  - 상태가 업데이트되는 시점을 관찰할 필요가 있을 때
  - Flux 패턴을 이용한 선언적이고 안정적인 상태 운용을 원할 때

### 2. MobX

![image](https://user-images.githubusercontent.com/77691829/236114937-9ed62851-f99e-4661-af2c-9c295b7fea1a.png)

- Redux의 단점을 보완하여 나온 또 다른 상태 관리 라이브러리로, 객체 지향적 느낌이 더 강하다. 또한 Immutable.js와 같은 불변성을 유지하기 위한 라이브러리를 사용할 필요가 없다는 점에서 Redux와 차이를 보인다.
- `장점` :
  - 객체 지향적이고 캡슐화를 지원하기에 개발자 친화적이다.
  - Redux에서 제공하지 않는 반응형 메커니즘을 제공하기에 조금 더 쉽게 동적 웹앱 제작이 가능하다.
- `단점` :
  - 웹앱 규모가 커지면서 로직이 MobX의 자동 업데이트에 의존하기에 디버깅이 조금 더 어려워질 수 있다.
  - Validation 구현에 있어 코드가 번잡스럽다.
- `MobX를 사용하면 좋을 때` :
  - 보다 객체 지향적인 설계를 원할 때
  - 불변성을 신경쓰지 않고 최적화를 원할 때

### 3. Recoil

![image](https://user-images.githubusercontent.com/77691829/236115014-7e5204e0-297c-4b1d-9a2d-997e14bdf2aa.png)

- Redux, MobX 등의 서드파티 라이브러리와 다르게 **오직 리액트!** 만을 위해 생겨난 라이브러리로, Facebook사에서 개발하였다. 각각의 전역 상태에 대한 작은 데이터 조각인 atom이 생성하고 해당 상태를 구독하는 구성 요소만 리렌더링 하는 단순한 로직이 특징으로, 불필요한 리렌더링을 방지할 수 있다.
- `장점` :
  - 가장 간단한 구조를 가지고 있어 초심자에게 좋다.
  - componenet가 렌더링 되는 시기, 상태 등을 세밀하게 제어할 수 있어 성능 최적화 등에도 사용 가능하다.
  - 동적이 기능을 더 쉽게 구현 가능하다.
- `단점` :
  - 가장 최신의 라이브러리로 커뮤니티가 활성화되지 않아 이슈 혹은 버그를 해결하기 어려우며, 실험적인 API들이 많고 아직 안정성에 우려가 있다.
  - 상태 관리 자체가 세분화되어 있어 디버깅과 테스트가 어렵다.
- `Recoil을 사용하면 좋을 때` :
  - 작고 가벼운 프로젝트에서
  - 글로벌한 내용들은 전역에서 redux를 사용하여 관리하고, 그 외 데이터들은 관심사의 분리로서 atom에서 관리하는 방식을 사용하기도 한다.

<br/>

참고자료

- https://velog.io/@qltkd5959/React-어떤-경우의-전역적으로-상태를-관리해줘야-하는-걸까
- https://blog.toktokhan.dev/react-상태관리-최강자는-f0753ad7d186]
- https://www.stevy.dev/react-state-management-guide/

<br>
<hr/>

# 2. React의 렌더링

## (1) React에서 렌더링을 효과적으로 관리하는 방법은 무엇이 있을까?

**렌더링**이란 코드로 정의된 내용이 실제 브라우저 화면에 그려지는 과정을 의미한다. React에서는 **state,props의 교체, 부모 컴포넌트의 재렌더링, 중앙 상태값 변화, render() 함수 호출 등**에 의해 렌더링이 촉발된다.

React에서 이러한 렌더링을 효과적으로 관리하기 위해서, 다음과 같은 방법을 사용할수 있다.

### 1. State 선언 고려하기

- `state 선언 위치` :
  - React에서는 특정 state가 변경되면 그 state가 선언된 컴포넌트와 하위 컴포넌트가 모두 리렌더링 된다. 따라서 state가 선언되는 위치는 리렌더링 횟수에 영향을 끼치므로 중요하다. 효과적인 렌더링 관리를 위해, state는 **해당 state를 사용하는 컴포넌트들 중** **가장 최상위 컴포넌트**에 선언한다.
- `state 분할 선언` :
  - 복잡한 객체로 선언된 state를 분할하지 않으면, 하위 컴포넌트가 사용하지 않는 다른 프로퍼티의 값이 업데이트 될 때에도 리렌더링이 발생한다. **따라서 복잡하고 큰 객체 구조인 경우 최대한 분할하는 것이 좋다.**

### 2. React.memo 함수를 이용한 컴포넌트 메모이제이션

- cf) `shouldComponentUpdate()` : 클래스형 컴포넌트에서 리렌더링 여부를 결정하는 로직을 만드는 생명주기 메서드.
- `React.memo()`
  - 생명주기 메서드를 사용할 수 없는 함수형 컴포넌트에서 shouldComponentUpdate()를 대신하여 사용하는, 컴포넌트를 래핑하여 props를 비교하여 리렌더링을 막을 수 있는 메모이제이션 기법을 제공하는 함수. (Hook이 아니라 함수이다)
  - 메모이제이션 기법을 사용해 불필요한 자식 컴포넌트의 렌더링을 방지하며 성능을 향상시킬 수 있다.
    - `*Memoization` : 기존에 수행한 연산의 결과 값을 어딘가에 저장해두고 동일한 입력이 들어오면 재활용하는 프로그래밍 기법. 중복 연산을 피하여 성능을 최적화 할 때 사용한다.\*

### 3. 고유 key를 사용한 컴포넌트 매핑

- 컴포넌트를 매핑할 때 **배열의 index가 아닌, `고유 key 값`을 부여한다**.
- **인덱스**를 사용한 매핑은 중간에 요소가 삽입될 시 그 이후 인덱스부터 key 값의 변경이 일어나 리마운트가 일어날수 있으므로 효과적인 렌더링을 위한 방식이 아니다.

### 4. useMemo(), useCallback() 등의 hook 사용하기

- 1.  `useMemo()` : **메모이제이션 된 값**을 반환하는 Hook

  - 종속 변수들이 변하지 않으면 함수를 다시 호출하지 않고 이전에 반환한 참조값을 재사용하여 렌더링을 방지하며 함수 호출 시간을 세이브할 수 있다.

  ```jsx
  useMemo(() => fn, [deps]);
  ```

- 2.  `useCallback()` : **메모이제이션된 함수**를 반환하는 Hook

  - 종속 변수들이 변하지 않으면 함수를 재생성하지 않고 이전에 있던 참조 변수를 그대로 하위 컴포넌트에 props로 전달하여 props가 변경되지 않아 하위 컴포넌트의 리렌더링을 방지할 수 있다.

  ```jsx
  useCallback(fn, [deps]);
  ```

  <br/>

## (2) 이를 위해 어떤 식으로 비즈니스 설계를 진행해야 할까?

부모 컴포넌트에서 자식 컴포넌트로 단방향 하향식 데이터 흐름을 가지고 있는 React는, 이러한 흐름의 props, state의 데이터들의 변화가 컴포넌트의 리렌더링을 유발한다. 그러므로 프로젝트의 렌더링 최적화는 **첫째, state와 props의 변경을 최소화 하는것** 그리고 **둘째, 부모 컴포넌트의 리렌더에 의한 불필요한 하위 컴포넌트 리렌더링을 최소화 하는 것**에 의해 결정된다.

**첫번째 요인인 state와 props의 변경 최소화**를 위해, 화면 구성에 필요한 최소한의 값만 state, props로 다뤄야 하며 참조 값들은 useRef()나 메모이제이션 Hooks을 사용해야 한다.

**두번째 요인인 부모 컴포넌트의 리렌더에 의한 하위 컴포넌트의 리렌더링 최소화**를 위해, 조건부로 렌더링하는 shouldComponenetUpdate()(_클래스형 컴포넌트의 경우_) 혹은 React.memo()(_함수형 컴포넌트인 경우_)를 자식 컴포넌트에 적용해야 한다. 또한, props로 넘겨주는 객체를 적절하게 전달해 데이터 갱신 외 리렌더링을 방지해야 한다. 이 외에도 state가 사용되거나 변형되는 지점을 적절히 설정하는 컴포넌트 간 위계 설계도 중요한 요소로 작용할 것이다.

<br/>

참고자료

- [https://abangpa1ace.tistory.com/250]
