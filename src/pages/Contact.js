export function Contact() {
  return `
    <section class="mx-auto max-w-md">
      <h2 class="text-2xl font-bold mb-4">Contact</h2>
      <form id="contactForm" class="space-y-4">
        <div>
          <label class="block mb-1">Name</label>
          <input type="text" id="contactName" class="w-full p-2 border rounded" />
        </div>
        <div>
          <label class="block mb-1">Email</label>
          <input type="email" id="contactEmail" class="w-full p-2 border rounded" />
        </div>
        <div>
          <label class="block mb-1">Message</label>
          <textarea id="contactMessage" rows="4" class="w-full p-2 border rounded"></textarea>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </form>
      <div id="contactResult" class="mt-4"></div>
    </section>
  `;
}
