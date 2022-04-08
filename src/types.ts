// 얘는 Contact 인터페이스에서 가져다 쓰는 인터페이스이므로, 굳이 다른 파일에서 import 할 필요가 없음.
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

enum PhoneType {
  Home = "home",
  Office = "office",
  Studio = "studio",
}

// 여러 개의 객체를 export 할 때에는, 이런 식으로 맨 아랫줄에 모아서 하는 게 편함.
// (각 객체에 export를 일일이 달아줘도 되긴 하는데, 여러 개의 객체는 일반적으로 아래처럼 하는 게 convention 임.)
export { Contact, PhoneType };
