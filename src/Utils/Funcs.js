const BaseURL = "https://farm-management-production.up.railway.app";

export const getUser = async (accessToken) => {
  const response = await fetch(`${BaseURL}/users/profile/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response
}

export const authUser = async (authData) => {
  const response = await fetch(`${BaseURL}/users/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData)
  })
  return response
}

export const addFarmData = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/poultry_inventory/farm-data/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return response;
}

export const fetchFarmData = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/poultry_inventory/farm-data/list/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const getFlockSource = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-sources`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const getFlockBreed = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-breeds`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const getHousingStructures = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/housing-structures`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const getFlocks = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flocks`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const addFlockData = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flocks/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const getFlockMovement = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-movements`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const addFlockMovement = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-movements`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const addHousingStructure = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/housing-structures/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}
