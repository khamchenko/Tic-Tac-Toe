import socket from './utils' ;

import { ConnectPlayers } from '../redux/actions/player';
import { newNotice, offActionNotice } from '../redux/actions/notice';

export default () => dispatch => {

  socket.on('connect', () => {
    console.log("SUCCESS CONNECT");
  });
  socket.on('data_notice', (notice) => {
    dispatch(newNotice(notice));
    setTimeout(() => { dispatch(offActionNotice()) }, 5000)
  })
}
