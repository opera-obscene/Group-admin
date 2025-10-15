function renderCurrentEvent() {
  currentContainer.innerHTML = '';
  const currentEvent = events.find(ev => ev.active);

  if(currentEvent){
    const div = document.createElement('div');
    div.className = 'event active';

    // Generate URL-friendly event name
    const eventQuery = encodeURIComponent(currentEvent.name);
    const inviteLink = `https://opera-obscene.github.io/invitation.html?event=${eventQuery}`;

    div.innerHTML = `
      <h3>${currentEvent.name}</h3>
      <button onclick="closeEvent('${currentEvent.name}')">Close Event</button>
      <div class="add-invitee">
        <input type="text" placeholder="New invitee full name" id="new-${currentEvent.name}">
        <button onclick="addInvitee('${currentEvent.name}')">Add Invitee</button>
      </div>
      <div>
        <strong>Invite Link:</strong>
        <a href="${inviteLink}" target="_blank">${inviteLink}</a>
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
