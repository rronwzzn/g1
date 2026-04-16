async function searchData() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const response = await fetch("data.csv");
  const data = await response.text();

  const rows = data.split("\n").slice(1);
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  let found = false;

  for (let row of rows) {
    const [id, name, course] = row.split(",");

    if (
      id.includes(query) ||
      name.toLowerCase().includes(query)
    ) {
      found = true;
      resultsDiv.innerHTML += `
        <div class="result-item">
          <strong>${name}</strong><br>
          ID: ${id}<br>
          Course: ${course}
        </div>
      `;
    }
  }

  if (!found) {
    resultsDiv.innerHTML = "No results found.";
  }
}
