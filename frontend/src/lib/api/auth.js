import axios from 'axios';

const defaultParams = {
  sql: 'SELECT 1+1 FROM dual',
  which: 'crawlers',
  params: {a:1},
  key: ''
}

export const localLogin = ({key}) => axios.post(
  'http://crawler.moducampus.com:4000/',
  defaultParams
);