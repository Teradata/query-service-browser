

const dbUser = 'demo_user';
const dbPassword = 'dbtTest#01';
const authStr = `Basic ${btoa(`${dbUser}:${dbPassword}`)}`;

//console.log(authStr);

const headers = {
  'Content-Type': 'application/json',
  'Authorization': authStr,
  'Origin': 'https://localhost:8000', 
  'Referer': 'https://localhost:8000',
};

//console.log(headers);

const url = 'https://dbt-tests-wteuh1djm0q9u4x5.env.clearscape.teradata.com:8443/qs/systems/local/queries'; //change to your CSAE host.

const payload = {
  query: 'SELECT * FROM DBC.DBCInfo;', // 'SELECT * FROM DBC.DBCInfo;',
  format: 'OBJECT',
  includeColumns: true,
  rowLimit: 4,
};

const payloadJson = JSON.stringify(payload);

const getData = () =>{
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: payloadJson,
    rejectUnauthorized: false,
  })
    .then((response) => response.json())
    .then((data) => {
      const numRows = data.results[0].rowCount;
      console.log('NUMBER of ROWS', numRows);
      console.log('==========================================================');
      console.log(data);
      document.getElementById('data').textContent = JSON.stringify(data)

    })
    .catch((error) => {
      console.error(error);
      document.getElementById('data').textContent = error + ", see console"
    });
}
