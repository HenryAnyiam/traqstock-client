const BaseURL = "http://127.0.0.1:8000";

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
  const response = fetch(`${BaseURL}/poultry/flock-movements/`, {
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

export const getFlockInspection = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-inspection-records`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const addFlockInspection = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-inspection-records/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const getFlockBreedInformation = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-breed-information`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const addFlockBreedInformation = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-breed-information/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const getEggCollection = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/egg-collection`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const addEggCollection = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/egg-collection/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const handleData = async (res, loader, text, toast, reset) => {
  loader.style.display = 'none';
  text.style.display = 'inline';
  if (res.status === 201) {
    const responseData = await res.json();
    console.log(responseData);
    toast.success("Data added successfully");
    reset();
  } else if (res.status === 500) {
    console.log(`Error: ${await res.text()}`);
    toast.error("An Unexpected Error Occurred")
  } else {
    console.log(res.status)
    const responseData = await res.json();
    console.log(responseData.detail);
    toast.warning("Data saving not successful");
    toast.warning(responseData.detail);
    
  }
}

export const convertDate = (timestamp) => {
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);

  return formattedDate;
}

export const convertTime = (timestamp) => {
  const date = new Date(`1970-01-01T${timestamp}Z`);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return formattedTime;
}

export const convertDateTime = (timestamp) => {
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return formattedDate;
}
