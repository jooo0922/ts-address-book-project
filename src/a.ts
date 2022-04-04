/**
 * 아래와 같이 '동기적으로'
 * 함수를 실행해서 리턴값을 반환하는 경우,
 * TS 랭귀지 서버는 리턴값의 타입을 알아서
 * 타입 추론을 해줄 수 있음.
 */
function fetchItems(): string[] {
  let items = ["a", "b", "c"];
  return items;
}
const result = fetchItems();
console.log(result);

/**
 * 반대로 아래와 같이
 * Promise 의 생성자를 리턴값으로 반환하게 되면,
 * TS 랭귀지 서버는 리턴값의 타입을
 * Promise<unknown> 정도로 밖에 추론하지 못함.
 *
 * 즉,
 * 'Promise 가 오는데, 그 안의 타입은 잘 모르겠다'
 * 라는 뜻임.
 *
 * 무슨 말이냐면, 현재 fetchItems2() 라는 함수를
 * 실행하는 시점에서, TS 랭귀지 서버가
 * Promise 안에 들어오는 비동기 코드들에 대해서
 * 알 수가 없다는 뜻임. 말 그대로 '비동기' 이기 때문에!
 * 아직 완료되지 않은 코드에 대해서는 알 수가 없겠지..
 *
 * 그렇기 때문에 '저 Promise 를 통해
 * 비동기로 받게 될 리턴값의 타입이 어떤 게 올 것이다!'
 * 라고 명시를 해줘야만 Promise를 제대로 사용할 수 있을 것임.
 *
 * 그래서 프라미스는 항상 이런 식으로
 * Promise<T>
 * 제네릭을 통해 리턴값의 타입을 지정하고 있음.
 */
function fetchItems2(): Promise<string[]> {
  let items: string[] = ["a", "b", "c"];
  return new Promise(function (resolve) {
    resolve(items);
  });
}
fetchItems2();
