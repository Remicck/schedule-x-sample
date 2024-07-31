// string to Date (from YYYY-MM-DD HH:ii)

import { addMinutes, format, isAfter, parse, setMilliseconds, setMinutes, setSeconds } from "date-fns";

/**
 * YYYY-MM-DD HH:ii形式のstringを、Date型に変換する
 * @param datestring YYYY-MM-DD HH:ii形式のstring
 * @returns 
 */
export const stringDatetimeToDate = (datestring: string): Date => {
  // date-fnsを使い、formatする
  const formatString = 'yyyy-MM-dd HH:mm';
  const parsedDate = parse(datestring, formatString, new Date());
  return parsedDate;
}

/**
 * 与えられたDate型の日時から、直近の0分または30分に設定した日時を返す
 * @param date - 基準となる日時
 * @returns - 直近の0分または30分に設定した日時
 */
export const getNearestHalfHour = (date: Date): Date => {
  // 日時の秒とミリ秒を0に設定
  let updatedDate = setSeconds(setMilliseconds(date, 0), 0);

  // 現在の分を取得
  const minutes = updatedDate.getMinutes();

  // 30で割った余りを計算
  const remainder = minutes % 30;

  // 余りを現在の分から引いて、直近の0分または30分に設定
  updatedDate = addMinutes(updatedDate, -remainder);

  return updatedDate;
}


/**
 * Date型をYYYY-MM-DD HH:mm形式の文字列に変換する関数
 * @param date - 変換したいDate型の日時
 * @returns - YYYY-MM-DD HH:mm形式の文字列
 */
export const formatDateToString = (date: Date): string => {
    return format(date, 'yyyy-MM-dd HH:mm');
}