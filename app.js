function populateDocument(name, org, gender, conditions) {

  document.getElementById('name').value = name;
  document.getElementById('org').value = org;

  const genderElement = document.getElementById('gender');
  switch (gender) {
    case 'Prefer Not to Answer':
      genderElement.selectedIndex = 0;
      break;
    case 'male':
      genderElement.selectedIndex = 1;
      break;
    case 'female':
      genderElement.selectedIndex = 2;
      break;
    default:
      break;
  }

  document.getElementById('conditionNumber').value = conditions.length;
  const conditionsElement = document.getElementById('conditions');

  conditions.forEach(codition => {
    conditionsElement.textContent += `- ${codition} \r\n`;
  });
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
