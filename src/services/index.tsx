export async function POST(postData: object) {
  const requestOptions: object = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...postData })
  };
  const response = await fetch(
    "https://cricketscorecard-77284.firebaseio.com/team.json",
    requestOptions
  );
  const data = await response.json();
  // console.log("s1", data);
  return data;
}

export async function GET() {
  let id = JSON.stringify(localStorage.getItem("matchId"));
  const requestOptions: object = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
    // body: JSON.stringify(localStorage.getItem("matchId"))
  };
  const response = await fetch(
    "https://cricketscorecard-77284.firebaseio.com/team.json",
    requestOptions
  );
  const data = await response.json();
  // console.log("get", data);
  return data;
}

export async function postInningData(postData: object) {
  const requestOptions: object = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  };
  const response = await fetch(
    "https://cricketscorecard-77284.firebaseio.com/matchInnings.json",
    requestOptions
  );
  const data = await response.json();
  // console.log("s1", data);
  return data;
}

export async function fetchInning() {
  const requestOptions: object = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
    // body: JSON.stringify(localStorage.getItem("matchId"))
  };
  const response = await fetch(
    "https://cricketscorecard-77284.firebaseio.com/matchInnings.json",
    requestOptions
  );
  const data = await response.json();
  // console.log("get", data);
  return data;
}

export async function saveInningDetail(postData: object) {
  console.log("123456");
  const requestOptions: object = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  };
  const response = await fetch(
    "https://cricketscorecard-77284.firebaseio.com/innings.json",
    requestOptions
  );
  const data = await response.json();
  // console.log("s1", data);
  return data;
}
export async function getInningData() {
  const requestOptions: object = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
    // body: JSON.stringify(inningData)
  };
  const response = await fetch(
    "https://cricketscorecard-77284.firebaseio.com/innings.json",
    requestOptions
  );
  const data = await response.json();
  // console.log("s1", data);
  return data;
}
