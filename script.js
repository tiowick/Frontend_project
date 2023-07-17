const transfersEndpoint = "http://localhost:8080/transfers";

function fetchTransfers() {
  const accountNumber = document.getElementById('accountNumber').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const operatorName = document.getElementById('operatorName').value;

  let apiUrl = transfersEndpoint;

  if (accountNumber) {
    apiUrl += `?accountNumber=${accountNumber}`;
  } else {
    if (startDate && endDate) {
      apiUrl += `?startDate=${startDate}&endDate=${endDate}`;
    }

    if (operatorName) {
      apiUrl += `?operatorName=${operatorName}`;
    }
  }

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayTransfers(data))
    .catch(error => console.error(error));
}

function displayTransfers(transfers) {
  const transfersContainer = document.getElementById('transfersContainer');
  transfersContainer.innerHTML = '';

  if (transfers.length === 0) {
    transfersContainer.innerHTML = '<p>Nenhuma transferência encontrada.</p>';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Data de Transferência</th>
      <th>Valor</th>
      <th>Tipo</th>
      <th>Operador</th>
      <th>Conta</th>
    </tr>
  `;

  transfers.forEach(transfer => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transfer.id}</td>
      <td>${transfer.dataTransferencia}</td>
      <td>${transfer.valor.toFixed(2)}</td>
      <td>${transfer.tipo}</td>
      <td>${transfer.nomeOperadorTransacao}</td>
      <td>${transfer.contaId}</td>
    `;
    table.appendChild(row);
  });

  transfersContainer.appendChild(table);
}
