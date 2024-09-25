const butInstall = document.getElementById('buttonInstall');

// Add an event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();

  // Store the event so it can be triggered later
  window.deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';

  console.log('beforeinstallprompt event triggered');
});

// Add an event listener to the install button
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    console.log('No deferred prompt available');
    return;
  }

  // Show the install prompt
  promptEvent.prompt();

  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;
  console.log(`User choice: ${result.outcome}`);

  // Reset the deferred prompt variable
  window.deferredPrompt = null;

  // Hide the install button after the prompt is shown
  butInstall.style.display = 'none';
});

// Add an event listener for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed');
  window.deferredPrompt = null;
});
