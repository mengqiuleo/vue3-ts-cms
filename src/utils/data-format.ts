/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 06:27:54
 * @LastEditTime: 2022-08-18 01:48:24
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * 日期格式化
 * @param utcString
 * @param format
 * @returns
 */
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT //要格式化成什么样子
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
