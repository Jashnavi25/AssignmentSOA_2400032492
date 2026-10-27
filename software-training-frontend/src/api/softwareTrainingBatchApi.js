const baseUrl = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  'http://localhost:8081'
).replace(/\/+$/, '');

const endpoint = `${baseUrl}/SoftwareTrainingBatch`;

/**
 * Read JSON, plain-text, or empty responses safely.
 */
async function readResponse(response) {
  const text = await response.text();

  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Return short, user-friendly error messages.
 */
function getErrorMessage(body, status) {
  if (status === 400 || status === 422) {
    return 'Please check the entered batch details.';
  }

  if (status === 404) {
    return 'The requested batch was not found.';
  }

  if (status === 409) {
    return 'This operation conflicts with existing data.';
  }

  if (status >= 500) {
    return 'A server error occurred. Please try again later.';
  }

  if (body && typeof body === 'object') {
    const message = body.message || body.detail;

    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return 'The request could not be completed. Please try again.';
}

/**
 * Send a request to the Spring Boot backend.
 */
async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${endpoint}${path}`, {
      ...options,
      headers: {
        ...(options.body !== undefined
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(options.headers || {})
      }
    });
  } catch {
    throw new Error(
      'Unable to connect to the backend. Please check that the server is running.'
    );
  }

  const body = await readResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(body, response.status));
  }

  return body;
}

/**
 * API operations for Software Training Batch Management.
 */
export const api = {
  // Get all training batches.
  all: async () => {
    const result = await request('/displayall');

    if (!Array.isArray(result)) {
      throw new Error(
        'Could not load training batches. Please refresh and try again.'
      );
    }

    return result;
  },

  // Add a new batch. The backend generates its ID.
  add: (batch) =>
    request('/add', {
      method: 'POST',
      body: JSON.stringify(batch)
    }),

  // Update an existing batch.
  update: (id, batch) =>
    request(`/update/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(batch)
    }),

  // Delete a batch.
    del: async (id) => {
                await request(`/delete/${encodeURIComponent(id)}`, {
                method: 'DELETE'
            });
        return true;
    }
};