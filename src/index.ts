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

// main
class AddressBook {
  // TODO: 아래 변수의 타입을 지정해보세요.
  private contacts: Contact[] = [];

  constructor() {
    this.fetchData();
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
    return this.contacts.filter((contact) => contact.name === name);
  }

  findContactByAddress(address: string): Contact[] {
    return this.contacts.filter((contact) => contact.address === address);
  }

  findContactByPhone(phoneNumber: number, phoneType: string): Contact[] {
    return this.contacts.filter(
      (contact) => contact.phones[phoneType].num === phoneNumber
    );
  }

  addContact(contact: Contact) {
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

new AddressBook();
