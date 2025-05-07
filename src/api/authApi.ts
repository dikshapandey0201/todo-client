const baseurl = "https://todo-list-server-6rzb.onrender.com"



export async function signup(name: string, email: string, password: string) {
  const response = await fetch(`${baseurl}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

export async function signin(email: string, password: string) {
  const response = await fetch(`${baseurl}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  return response.json();
}

export async function currentUser() {
    const response = await fetch(`${baseurl}/api/auth/current-user`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return response.json();
}

export async function logout() {
    const response = await fetch(`${baseurl}/api/auth/logout`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        
    });
    return response.json();
}

export async function updateUser(name: string, email: string) {
    const response = await fetch(`${baseurl}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    });
    return response.json();
}

export async function deleteUser() {
    const response = await fetch(`${baseurl}/api/auth/delete-user`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    return response.json();
}
