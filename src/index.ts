interface PhoneNumberDictionary {
  [phone: string]: {
    num: number;
  };
}

interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

// api
// TODO: 아래 함수의 반환 타입을 지정해보세요.
/**
 * Promise 리턴 타입 정의
 *
 * 만약 어떤 함수가 Promise 값을 리턴한다면,
 * 타입스크립트에서는 그 리턴값의 타입을
 * 'Promise' 라고 정의하도록 되어있음.
 *
 * 그런데 그냥 Promise 만 쓰면,
 * TS 랭귀지 서버가 '제네릭도 옆에 같이 쓰세요'
 * 라고 띄워 줌.
 *
 * -> 이러한 케이스가 실제 앱 개발 환경에서
 * 제네릭이 가장 많이 쓰이는 상황이라고 볼 수 있음.
 * 즉, API 를 호출해와서, API 응답의 규칙 혹은 규격을
 * 정의할 때 제네릭을 가장 많이 사용한다고 보면 됨.
 */
function fetchContacts(): Promise<Contact[]> {
  // TODO: 아래 변수의 타입을 지정해보세요.
  const contacts: Contact[] = [
    {
      name: "Tony",
      address: "Malibu",
      phones: {
        home: {
          num: 11122223333,
        },
        office: {
          num: 44455556666,
        },
      },
    },
    {
      name: "Banner",
      address: "New York",
      phones: {
        home: {
          num: 77788889999,
        },
      },
    },
    {
      name: "마동석",
      address: "서울시 강남구",
      phones: {
        home: {
          num: 213423452,
        },
        studio: {
          num: 314882045,
        },
      },
    },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(contacts), 2000);
  });
}

// findContactByPhone() 메서드에 넣어줄 phoneType 인자값을
// 변수화하여 사용하기 위해 enum 을 만듦.
enum PhoneType {
  Home = "home",
  Office = "office",
  Studio = "studio",
}

// main
class AddressBook {
  // TODO: 아래 변수의 타입을 지정해보세요.
  private contacts: Contact[] = [];

  constructor() {
    this.fetchData();
    this.findContactByPhone(1234, PhoneType.Home); // 이런 식으로 변수화된 이넘값을 인자로 넘기면 문자열로 넘길 때처럼 오탈자 걱정을 안해도 됨.
  }

  // fetchData() 메서드는 무언가를 리턴해주지는 않으므로, 리턴값을 void, 즉 아무것도 없음으로 하는 게 맞겠지!
  // GLSL 도 main 함수는 리턴값이 딱히 없으므로 void를 리턴값으로 명시했던 것처럼!
  fetchData(): void {
    // 여기는 fetchContacts() 메서드가 위에서 보듯이 Promise 를 통해 Contact[] 타입의 값을 리턴해주므로,
    // .then() 으로 받는 인자값의 타입도 당연히 Contact[] 로 ts 랭귀지 서버가 타입추론을 해줄 수 있겠지.
    fetchContacts().then((response: Contact[]) => {
      this.contacts = response;
    });
  }

  /* TODO: 아래 함수들의 파라미터 타입과 반환 타입을 지정해보세요 */
  findContactByName(name: string): Contact[] {
    // filter 는 조건에 맞는 요소들을 추려서 다시 '배열'로 묶어 리턴해주니까,
    // 리턴값은 기본적으로 [] 배열이 되고, Contact 인터페이스 구조로 된 요소들의 배열이므로, Contact[] 이렇게 보면 됨!
    return this.contacts.filter((contact) => contact.name === name);
  }

  findContactByAddress(address: string): Contact[] {
    return this.contacts.filter((contact) => contact.address === address);
  }

  /**
   * 원래 phoneType 은 string 으로 타입지정을 해도 상관없기는 함.
   *
   * 그런데, 실무에서 코드를 짤 때에는
   * findContacByPhone('homee') 이런 식으로 전달하는 값에
   * 오탈자가 나서 버그가 나는 경우가 빈번하기 때문에
   *
   * 아예 home, office, studio 세 가지의 값들을
   * 변수화시켜서(즉, 제한된 문자열의 집합으로 만드는 것!)
   * 타입으로 지정하는 게 타입 관점에서는
   * 더 안전하다고 볼 수 있음.
   *
   * -> 이럴 때 사용하는 것이 '이넘(enum)'
   */
  findContactByPhone(phoneNumber: number, phoneType: PhoneType): Contact[] {
    return this.contacts.filter(
      (contact) => contact.phones[phoneType].num === phoneNumber
    );
  }

  // this.fetchData() 와 마찬가지로 별도의 리턴값이 없으면 리턴값 타입을 void 로 지정해야지!
  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  displayListByName(): string[] {
    return this.contacts.map((contact) => contact.name);
  }

  displayListByAddress(): string[] {
    return this.contacts.map((contact) => contact.address);
  }
  /* ------------------------------------------------ */
}

// .map() 에 대한 간단한 설명
let heroes = [
  { name: "Tony", age: 30 },
  { name: "Captain", age: 100 },
];
heroes.map(function (hero) {
  return hero.name;
}); // ['Tony', 'Captain'] 이런 식으로 각 요소에 매핑되는 요소들을 배열로 묶어 리턴해 줌.
// 따라서, 얘내의 타입을 지정하려면, 리턴되는 배열이 어떤 요소들로 묶인 배열인지를 알아야겠지?

new AddressBook();
