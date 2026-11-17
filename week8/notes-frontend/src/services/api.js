// Centralized API Service for AuraNotes
// Communicates with existing backend at http://localhost:8080

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const TOKEN_KEY = 'auranotes_auth_token';
const USER_KEY = 'auranotes_user_profile';
const TRASH_KEY_PREFIX = 'auranotes_trash_';

// Token and Session helpers
export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY) || null;
};

export const setStoredToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Common request headers
const getAuthHeaders = () => {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// 1. Backend Health Check
export const checkBackendHealth = async () => {
  try {
    // Check root or /user endpoint
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });
    if (response.ok) {
      return { online: true, message: 'Server online on port 8080' };
    }
    // Also try /home
    const homeRes = await fetch(`${API_BASE_URL}/home`);
    if (homeRes.ok) {
      return { online: true, message: await homeRes.text() };
    }
    return { online: true, message: 'Backend active' };
  } catch (err) {
    return { online: false, message: err.message };
  }
};

// 2. Authentication: Register
// Backend: POST /user/register
// Body: { name, email, password }
// Responses: { msg: "User registered successfully" } | { msg: "Something went wrong" }
export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.msg === 'User registered successfully') {
      return { success: true, message: data.msg };
    } else {
      return { success: false, message: data.msg || 'Registration failed' };
    }
  } catch (error) {
    console.error('Registration API error:', error);
    return {
      success: false,
      message: 'Could not connect to backend server on http://localhost:8080.',
    };
  }
};

// 3. Authentication: Login
// Backend supports:
//   - POST /user/signin: returns { msg, token, name } with userId embedded for notes linkage
//   - POST /user/login: returns { msg, token }
export const loginUser = async ({ email, password }) => {
  try {
    // Attempt /user/signin first (provides linked userId for notes)
    let response = await fetch(`${API_BASE_URL}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // If /user/signin is not found (404), fall back to /user/login
    if (response.status === 404) {
      response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    }

    const data = await response.json();

    if (data.token) {
      setStoredToken(data.token);
      const userProfile = {
        email,
        name: data.name || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      };
      setStoredUser(userProfile);

      return {
        success: true,
        token: data.token,
        user: userProfile,
        message: data.msg || 'Logged in successfully',
      };
    } else {
      let errorMsg = data.msg || 'Login failed';
      if (errorMsg === 'wrong credientials' || errorMsg === 'Wrong email or password') {
        errorMsg = 'Incorrect email or password. Please try again.';
      } else if (errorMsg === 'Signup first' || errorMsg.includes('sign up first')) {
        errorMsg = 'No account found with this email. Please create an account first.';
      }
      return {
        success: false,
        message: errorMsg,
      };
    }
  } catch (error) {
    console.error('Login API error:', error);
    return {
      success: false,
      message: 'Unable to reach backend server on http://localhost:8080.',
    };
  }
};

// 4. Notes Service (Direct MongoDB Backend Integration)

// Trash tracking in user-scoped local storage
const getUserTrashKey = () => {
  const user = getStoredUser();
  const email = user?.email || 'guest';
  return `${TRASH_KEY_PREFIX}${email}`;
};

const getTrashIds = () => {
  try {
    const raw = localStorage.getItem(getUserTrashKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const setTrashIds = (ids) => {
  localStorage.setItem(getUserTrashKey(), JSON.stringify(ids));
};

// Fetch all notes from backend
export const getNotes = async () => {
  const token = getStoredToken();
  if (!token) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      const serverNotes = await response.json();
      if (Array.isArray(serverNotes)) {
        const trashIds = new Set(getTrashIds());
        return serverNotes.map((n) => ({
          ...n,
          isFavorite: !!n.pinned,
          isTrash: trashIds.has(n._id),
          category: n.category || 'General',
        }));
      }
    }
  } catch (err) {
    console.error('Error fetching notes from backend:', err);
  }

  return [];
};

// Create a new note in backend
export const createNote = async ({ title, content, category = 'General', color = '#8B5CF6' }) => {
  const payload = {
    title: title.trim(),
    content: content.trim(),
    color: color || '#8B5CF6',
    category,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const note = await response.json();
      return {
        ...note,
        isFavorite: !!note.pinned,
        isTrash: false,
        category: category || 'General',
      };
    }
  } catch (err) {
    console.error('Error creating note:', err);
  }

  throw new Error('Failed to create note on server');
};

// Update an existing note in backend
export const updateNote = async (id, updateFields) => {
  const payload = {};
  if (updateFields.title !== undefined) payload.title = updateFields.title;
  if (updateFields.content !== undefined) payload.content = updateFields.content;
  if (updateFields.color !== undefined) payload.color = updateFields.color;
  if (updateFields.isFavorite !== undefined) payload.pinned = updateFields.isFavorite;
  if (updateFields.pinned !== undefined) payload.pinned = updateFields.pinned;

  try {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const note = await response.json();
      const trashIds = new Set(getTrashIds());
      return {
        ...note,
        isFavorite: !!note.pinned,
        isTrash: trashIds.has(note._id),
        category: updateFields.category || note.category || 'General',
      };
    }
  } catch (err) {
    console.error('Error updating note:', err);
  }

  throw new Error('Failed to update note on server');
};

// Move Note to Trash (Soft Delete)
export const deleteNote = async (id) => {
  const trashIds = getTrashIds();
  if (!trashIds.includes(id)) {
    trashIds.push(id);
    setTrashIds(trashIds);
  }
  return { success: true, id };
};

// Restore Note from Trash
export const restoreNote = async (id) => {
  const trashIds = getTrashIds().filter((trashId) => trashId !== id);
  setTrashIds(trashIds);
  return { success: true, id };
};

// Permanently Delete Note from Backend MongoDB
export const permanentDeleteNote = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    // Remove from trash list as well
    const trashIds = getTrashIds().filter((trashId) => trashId !== id);
    setTrashIds(trashIds);

    if (response.ok) {
      return { success: true, id };
    }
  } catch (err) {
    console.error('Error deleting note permanently:', err);
  }

  // Still clean up local trash state
  const trashIds = getTrashIds().filter((trashId) => trashId !== id);
  setTrashIds(trashIds);
  return { success: true, id };
};

// Toggle Favorite / Pin
export const toggleFavorite = async (id) => {
  const notes = await getNotes();
  const current = notes.find((n) => n._id === id);
  const nextPinned = current ? !current.isFavorite : true;
  return await updateNote(id, { isFavorite: nextPinned, pinned: nextPinned });
};
