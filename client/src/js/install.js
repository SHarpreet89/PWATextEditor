const butInstall = document.getElementById('buttonInstall');

// Check if the button exists
if (butInstall) {
  // Logic for installing the PWA
  // Event handler for the `beforeinstallprompt` event
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the hidden class from the button.
    butInstall.style.display = 'block';
  });

  // Implementing a click event handler on the `butInstall` element
  butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    // Show the install prompt
    promptEvent.prompt();
    // Wait for the user to respond to the prompt
    const result = await promptEvent.userChoice;
    console.log('User choice:', result);
    // Clear the deferred prompt variable; it can only be used once.
    window.deferredPrompt = null;
    // Hide the install button
    butInstall.style.display = 'none';
  });

  // Adding a handler for the `appinstalled` event
  window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferred prompt
    window.deferredPrompt = null;
  });
} else {
  console.warn('Install button not found');
}
