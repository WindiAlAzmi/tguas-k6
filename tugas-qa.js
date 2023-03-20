import http from 'k6/http';
import { check } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data)
   
  };
}

export const options = {
  discardResponseBodies: true,
  scenarios: {
    postData: {
      executor: "per-vu-iterations",
      exec: "postData",
      vus: 500,
      iterations: 3,
      maxDuration: "2s",
    },
    putData: {
      executor: "per-vu-iterations",
      exec: "putData",
      vus: 500,
      iterations: 4,
      startTime: "30s",
      maxDuration: "2s",
    },
  },
};

const BASE_URL = 'https://reqres.in';

  const payload_1 = JSON.stringify({
    name: "morpheus",
    job: "leader"
  });

  const payload_2 = JSON.stringify({
        name: "morpheus",
        job: "zion resident"

    });

    const numbId = 2;

    const headers = { "Content-Type": "application/json" };

export function postData(){
    const postRes = http.post(
      `${BASE_URL}/api/users`,
      payload_1,
      { headers }
    );

 

    check(postRes, {
      "response code was 201": (res) => res.status === 201
      })

     
}


export function putData(){
    const putRes = http.get(
      `${BASE_URL}/api/users/${numbId}`,
      payload_2,
      {
        headers,
      },
    );
     check(putRes, {
       "response code was 200": (res) => res.status === 200
           });

       
}



