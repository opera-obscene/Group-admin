// Fake events data
let events = [
  {
    name: "Clinik Angus 2017",
    active: false,
    invitees: ["Alice Smith", "Bob Jones", "Clara Doe", "David Lee", "Eva White"]
  },
  {
    name: "Zone 4 2018",
    active: false,
    invitees: ["Frank Hall", "Grace Kim", "Henry Adams"]
  },
  {
    name: "Verset 5 2019",
    active: false,
    invitees: ["Isabel Fox", "Jack Ryan", "Kelly Green", "Leo Black"]
  }
];

// Current event container
const currentContainer = document.getElementById('current-event-container');
const pastContainer = document.getElementById('past-events-container');

// Function to render current event
function renderCurrentEvent() {
  const currentEvent = events.find(ev => ev.active);
  currentContainer.innerHTML = '';

  if(currentEvent){
    const div = document.createElement('div');
    div.className = 'event';
    div.innerHTML = `
      <strong>${currentEvent.name}</strong>
      <button onclick="closeEvent('${currentEvent.name}')">Close Event</button>
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

// Function to render past events
function renderPastEvents() {
  pastContainer.innerHTML = '';
  events.forEach(ev => {
    const div = document.createElement('div');
    div.className = 'event';
    div.innerHTML = `
      <strong>${ev.name}</strong>
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

// Create new event (for demo purposes, creates a placeholder)
function createEvent(){
  const newName = prompt("Enter new event name:");
  if(newName){
    events.push({name: newName, active: true, invitees: []});
    renderCurrentEvent();
    renderPastEvents();
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
