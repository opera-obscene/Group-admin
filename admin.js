// Fake events data
let events = [
  {
    name: "Clinik Angus 2017",
    active: false,
    invitees: ["Alice Smith", "Bob Jones", "Clara Doe", "David Lee", "Eva White"]
  },
  {
    name: "Zone 4 2018",
    active: true,
    invitees: ["Frank Hall", "Grace Kim", "Henry Adams"]
  },
  {
    name: "Verset 5 2019",
    active: false,
    invitees: ["Isabel Fox", "Jack Ryan", "Kelly Green", "Leo Black"]
  }
];

// Containers
const currentContainer = document.getElementById('current-event-container');
const pastContainer = document.getElementById('past-events-container');

// Render current event
function renderCurrentEvent() {
  currentContainer.innerHTML = '';
  const currentEvent = events.find(ev => ev.active);

  if(currentEvent){
    const div = document.createElement('div');
    div.className = 'event active';
    div.innerHTML = `
      <h3>${currentEvent.name}</h3>
      <button onclick="closeEvent('${currentEvent.name}')">Close Event</button>
      <div class="add-invitee">
        <input type="text" placeholder="New invitee full name" id="new-${currentEvent.name}">
        <button onclick="addInvitee('${currentEvent.name}')">Add Invitee</button>
      </div>
      <button onclick="toggleInvitees(this)">Show Invitees</button>
      <div class="invitees hidden">
        ${currentEvent.invitees.map(i => `<div>${i}</div>`).join('')}
      </div>
    `;
    currentContainer.appendChild(div);
  } else {
    const div = document.createElement('div');
    div.className = 'event';
    div.innerHTML = `
      No current event.
      <button onclick="createEvent()">Create New Event</button>
    `;
    currentContainer.appendChild(div);
  }
}

// Render past events
function renderPastEvents() {
  pastContainer.innerHTML = '';
  events.filter(ev => !ev.active).forEach(ev => {
    const div = document.createElement('div');
    div.className = 'event';
    div.innerHTML = `
      <h3>${ev.name}</h3>
      <button onclick="toggleInvitees(this)">Show Invitees</button>
      <div class="invitees hidden">
        ${ev.invitees.map(i => `<div>${i}</div>`).join('')}
      </div>
    `;
    pastContainer.appendChild(div);
  });
}

// Close event
function closeEvent(name){
  const event = events.find(ev => ev.name === name);
  if(event) event.active = false;
  renderCurrentEvent();
  renderPastEvents();
}

// Create new event
function createEvent(){
  const newName = prompt("Enter new event name:");
  if(newName){
    events.push({name: newName, active: true, invitees: []});
    renderCurrentEvent();
    renderPastEvents();
  }
}

// Add invitee to current event
function addInvitee(eventName){
  const input = document.getElementById(`new-${eventName}`);
  const value = input.value.trim();
  if(value){
    const event = events.find(ev => ev.name === eventName);
    event.invitees.push(value);
    input.value = '';
    renderCurrentEvent();
  }
}

// Show/hide invitees
function toggleInvitees(button){
  const inviteesDiv = button.nextElementSibling;
  inviteesDiv.classList.toggle('hidden');
}

// Initialize
renderCurrentEvent();
renderPastEvents();
