function populateDocument(name, org, gender, conditions) {
  const rootElement = document.getElementById('root');
  const div = document.createElement('div');

  let combinedElements = `
    <p>Name Of Patient: ${name}</p>
    <p>Organization Name: ${org}</p>
    <p>Gender: ${gender}</p>
    <p>Number of conditions they have: ${conditions.length}</p>
    <p>List of all conditions:</p>
  `;

  conditions.forEach(codition => {
    combinedElements += `<li>${codition}</li>`;
  });

  div.innerHTML = combinedElements;
  rootElement.appendChild(div);

}

fetch('./patient.json')
  .then(data => {
    return data.json();
  })
  .then(jsonData => {

    const identifier = jsonData.identifier[0];
    const patientFullName = `${identifier.name[0].given} ${identifier.name[0].family}`;
    const org = identifier.managingOrganization.display;
    const gender = identifier.gender;
    const conditions = identifier.conditions;
    populateDocument(patientFullName, org, gender, conditions);
  })
  .catch(err => console.log(err));
