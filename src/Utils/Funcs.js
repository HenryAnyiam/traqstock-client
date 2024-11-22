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
