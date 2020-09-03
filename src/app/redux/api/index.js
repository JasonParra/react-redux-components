
import axios from "axios";
import config from "../../../config";

function api() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const api = axios.create({
    baseURL: `https://${config.api.host}:${config.api.port}`,
    headers: {
      common: {
        Authorization: "Bearer " + token,
        compId: config.compid,
        sucCode: "",
        userid: "",
        agentId: "",
      },
    }
  });
  return api
}

function requestPOST(route, params) {
  return api().post(route, params);
}

function requestGET(route, params) {
  return api().get(route, params);
}

function requestDELETE(route, params) {
  return api().delete(route, params);
}

function requestPATCH(route, params) {
  return api().patch(route, params);
}

function requestPUT(route, params) {
  return api().put(route, params);
}

export default {
  api,
  requestGET,
  requestPOST,
  requestDELETE,
  requestPATCH,
  requestPUT
};
