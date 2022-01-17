import moment from 'moment'
import config from '../utils/siteconfig'

export function formatReadingTime(minutes) {
  let cups = Math.round(minutes / 5);
  // let bowls = 0;
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min read`;
  } else {
    return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`;
  }
}

const formatDate = date => moment.utc(date).format(config.dateFormat)

export { formatDate }