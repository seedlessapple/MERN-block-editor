import { useEditorState } from "editor/state/useEditorState";
import {
  TStyledTextObjectArray,
} from "editor/types/editor.type";
import _ from "lodash";

const htmlTagsToSyle = {
  B: {
    fontWeight: "600",
  },
  EM: {
    fontStyle: "italic",
  },
  I: {
    fontStyle: "italic",
  },
  H1: {},
};

/**
 * Deprecate
 */
export function _parseStyledTextHtml(event: React.FormEvent<HTMLDivElement>) {
  let result: TStyledTextObjectArray = [];
  const div = event.currentTarget;
  const divChilds = div.childNodes;

  for (let i = 0; i < divChilds.length; i++) {
    const divChild = divChilds[i];
    console.log(divChild.nodeName);
    // textnode = 3
    if (divChild.textContent) {
      if (divChild.nodeType === 3) {
        console.log(divChild);
        result.splice(i, 0, {
          text: divChild.textContent,
        });

        // elementNode = 1
      } else if (divChild.nodeType === 1) {
        const buildStyle = Object.assign(
          _.pickBy(
            (divChild as HTMLElement).style,
            (value, key) =>
              [
                "fontSize",
                "fontWeight",
                "fontStyle",
                "color",
                "backgroundColor",
                "fontFamily",
                "textAlign",
              ].includes(key) && value !== ""
          ),
          htmlTagsToSyle[divChild.nodeName as keyof typeof htmlTagsToSyle] || {}
        );

        result.splice(i, 0, {
          text: divChild.textContent,
          style: buildStyle,
        });
      }
    }
  }
  return result;
}

/**
 * PUBLIC_generateRandomId
 * @param length
 * @returns
 */
export function PUBLIC_generateRandomId(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function PUBLIC_englishToKorean(string: string) {
  const koreanKeyMap: { [key: string]: string } = {
    q: "ㅂ",
    Q: "ㅃ",
    w: "ㅈ",
    W: "ㅉ",
    e: "ㄷ",
    E: "ㄸ",
    r: "ㄱ",
    t: "ㅅ",
    T: "ㅆ",
    y: "ㅛ",
    u: "ㅕ",
    i: "ㅑ",
    o: "ㅐ",
    O: "ㅒ",
    p: "ㅔ",
    P: "ㅖ",
    a: "ㅁ",
    s: "ㄴ",
    d: "ㅇ",
    f: "ㄹ",
    g: "ㅎ",
    h: "ㅗ",
    j: "ㅓ",
    k: "ㅏ",
    l: "ㅣ",
    z: "ㅋ",
    x: "ㅌ",
    c: "ㅊ",
    v: "ㅍ",
    b: "ㅠ",
    n: "ㅜ",
    m: "ㅡ",
  };

  const koreanKeys = [];

  for (let i = 0; i < string.length; i++) {
    const englishKey = string[i];
    const koreanKey = koreanKeyMap[englishKey];
    if (koreanKey) {
      koreanKeys.push(koreanKey);
    }
  }

  return koreanKeys.join("");
}

export function PUBLIC_disassembleKorean(str: string): string {
  const fArr = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const sArr = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const tArr = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const qwertyToKorean = {
    a: "ㅁ",
    b: "ㅠ",
    c: "ㅊ",
    d: "ㅇ",
    e: "ㄷ",
    f: "ㄹ",
    g: "ㅎ",
    h: "ㅗ",
    i: "ㅑ",
    j: "ㅓ",
    k: "ㅏ",
    l: "ㅣ",
    m: "ㅡ",
    n: "ㅜ",
    o: "ㅐ",
    p: "ㅔ",
    q: "ㅂ",
    r: "ㄱ",
    s: "ㄴ",
    t: "ㅅ",
    u: "ㅕ",
    v: "ㅍ",
    w: "ㅈ",
    x: "ㅌ",
    y: "ㅛ",
    z: "ㅋ",
    E: "ㄸ",
    O: "ㅒ",
    P: "ㅖ",
    Q: "ㅃ",
    R: "ㄲ",
    T: "ㅆ",
    W: "ㅉ",
  };

  const ga = 44032;
  const arr = str.split("");
  let result = "";

  for (let i = 0; i < arr.length; i++) {
    if (/^[A-Za-z]+$/.test(arr[i])) {
      Object.keys(qwertyToKorean).includes(arr[i]) &&
        (result = result.concat(
          qwertyToKorean[arr[i] as keyof typeof qwertyToKorean]
        ));
    } else {
      const kor = arr[i];
      if (
        kor !== "" &&
        (fArr.includes(kor) || sArr.includes(kor) || tArr.includes(kor))
      ) {
        result = result.concat(kor);
      } else {
        // console.log(kor);

        let uni: number = kor.charCodeAt(0) - ga;

        const fn = parseInt(`${uni / 588}`);
        const sn = parseInt(`${(uni - fn * 588) / 28}`);
        const tn = parseInt(`${uni % 28}`);

        // console.log(tn);

        // console.log({
        //   f:f[fn],
        //   s:s[sn],
        //   t:t[tn],
        // });

        result = result.concat(
          `${fArr[fn] ?? ""}${sArr[sn] ?? ""}${tArr[tn] ?? ""}`
        );
      }
    }
  }

  return result;
}
