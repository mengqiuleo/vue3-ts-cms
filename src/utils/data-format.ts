/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 06:27:54
 * @LastEditTime: 2022-08-18 01:48:24
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
