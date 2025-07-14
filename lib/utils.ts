import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment-timezone';
import { DayType, dayTypeKeys } from "@/types/collections";
import UAParser from 'ua-parser-js';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isAfterNextMidnight(guestAcceptDatetime: string): boolean {
  // 입력된 날짜 문자열을 한국 시간대로 파싱
  const guestDateTime = moment.tz(guestAcceptDatetime, 'YYYY-MM-DD HH:mm:ss', 'Asia/Seoul');

  // 입력된 날짜의 다음날 자정 시간을 계산
  const nextMidnight = guestDateTime.clone().add(1, 'days').startOf('day');

  // 현재 한국 시간
  const now = moment().tz('Asia/Seoul');

  // 현재 시간이 다음날 자정 시간 이후인지 비교
  return now.isAfter(nextMidnight);
}

export function dateChecker(): DayType {
  // Get today's date
  const today = moment.tz("Asia/Seoul").startOf('day');

  // console.log('today :', today)

  // Create date objects for the specific dates
  const sep4 = moment.tz("2024-09-04", "Asia/Seoul"); // Months are 0-based in JavaScript Date
  const sep5 = moment.tz("2024-09-05", "Asia/Seoul");
  const sep7 = moment.tz("2024-09-07", "Asia/Seoul");
  const sep8 = moment.tz("2024-09-08", "Asia/Seoul");




  // Function to get the message based on today's date
  const getMessage = () => {

    // 오늘 날짜와 비교하여 조건 확인
    if (today.isBefore(sep4, 'day')) {
      return dayTypeKeys.day0;
    } else if (today.isSame(sep4, 'day')) {
      return dayTypeKeys.day1;
    } else if (today.isBetween(sep5, sep7, null, '[]')) {
      return dayTypeKeys.day2to4;
    } else if (today.isSame(sep8, 'day')) {
      return dayTypeKeys.day5;
    } else {
      return dayTypeKeys.day6and;
    }

  };

  return getMessage();



}


export function refineDesc(text: string): string {
  // 정규 표현식을 사용하여 URL을 찾고 제거합니다.
  const urlPattern = /https?:\/\/[^\s]+/g;
  const textWithoutURLs = text.replace(urlPattern, '');

  // 빈 줄(공백만 있는 줄 포함)을 모두 제거합니다.
  const noEmptyLinesText = textWithoutURLs.replace(/^\s*[\r\n]/gm, '');


  // 한자를 제거합니다.
  const noChineseCharactersText = noEmptyLinesText.replace(/[\u4e00-\u9fff]/g, '');

  // 괄호와 괄호 안의 텍스트를 제거합니다.
  const noParenthesesText = noChineseCharactersText.replace(/\(.*?\)|\[.*?\]|\{.*?\}/g, '');

  // 모든 줄넘김을 제거할 때 앞줄에 텍스트가 있다면 스페이스를 추가하여 제거합니다.
  const noNewlinesText = noParenthesesText.replace(/([^\r\n])[\r\n]+/g, '$1 ');

  // 마지막에 있는 줄넘김을 제거합니다.
  const cleanedText = noNewlinesText.trim();

  return cleanedText;
}
