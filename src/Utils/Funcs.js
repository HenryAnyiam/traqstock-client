const BaseURL = "https://farm-management-production.up.railway.app/users";
export const getUser = async (accessToken) => {
  try {
    const response = await fetch(`${BaseURL}/profile/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (response.status === 200) {
      const data = await response.json();
      console.log(data)
    } else {
      console.log(response.status, response.statusText)
    } 
  } catch (err) {
    console.error(err)
  }
}