import * as constants from '../../constants'

export function setDocumentType(payload) {
  return {
    type: constants.SET_DOCUMENT_TYPE,
    payload
  }
}

export function setRoomId(payload) {
  return {
    type: constants.SET_ROOM_ID,
    payload
  }
}

export function setSocket(payload) {
  return {
    type: constants.SET_SOCKET,
    payload
  }
}

export function setClientSuccess(payload) {
  return {
    type: constants.SET_CLIENT_SUCCESS,
    payload
  }
}
