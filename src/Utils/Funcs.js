const BaseURL = "https://farm-management.onrender.com";

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

export const addFeeding = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/poultry/feeding/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const getFeeding = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/poultry/feeding`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getEggSales = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/poultry/egg-sales`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

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

export const addFlockSource = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-sources/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const addEggSales = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = fetch(`${BaseURL}/poultry/egg-sales/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const addFeedPurchase = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/feed-purchase/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const addTreatment = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/treatment/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const deleteFlockSource = async (id) => {
  const token = localStorage.getItem("accessToken");
  const response = fetch(`${BaseURL}/poultry/flock-sources/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response;
};

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

export const addFlockBreed = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-breeds/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const deleteFlockBreed = async (id) => {
  const token = localStorage.getItem("accessToken");
  const response = fetch(`${BaseURL}/poultry/flock-breeds/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response;
};

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

export const deleteHousingStructures = async (id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/housing-structures/${id}/`, {
    method: 'DELETE',
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

export const getFeedPurchase = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/feed-purchase`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const getFinance = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/finance`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const getTreatment = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/treatment`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const updateFlock = async (data, id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flocks/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const deleteFlock = async (id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flocks/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
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

export const updateFlockMovement = async (data, id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-movements/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const deleteFlockMovement = async (id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-movements/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
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

export const updateHousingStructure = async (data, id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/housing-structures/${id}/`, {
    method: 'PATCH',
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

export const updateFlockBreedInformation = async (data, id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-breed-information/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const deleteFlockBreedInformation = async (id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-breed-information/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
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

export const deleteEggCollection = async (id) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/egg-collection/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response;
}

export const getStaffs = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/users/staff`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const addStaff = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/users/staff/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const updateStaff = async (data, id) => {
  const token = localStorage.getItem("accessToken");
  const response = fetch(`${BaseURL}/users/staff/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const deleteStaff = async (id) => {
  const token = localStorage.getItem("accessToken");
  const response = fetch(`${BaseURL}/users/staff/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response;
};

export const getFlockHistory = async () => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-histories`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response;
}

export const deleteFlockHistory = async (id) => {
  const token = localStorage.getItem("accessToken");
  const response = fetch(`${BaseURL}/poultry/flock-histories/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const addFlockHistory = async (data) => {
  const token = localStorage.getItem('accessToken');
  const response = fetch(`${BaseURL}/poultry/flock-histories/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

export const updateFlockHistory = async (data, id) => {
  const token = localStorage.getItem("accessToken");
  const response = fetch(`${BaseURL}/poultry/flock-histories/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

const displayData = (data, toast) => {
  if (typeof data === "string") {
    toast.warning(data);
  } else if (typeof data === "object") {
    for (let i in data) {
      const retrieved = data[i];
      if (Array.isArray(retrieved)) {
        retrieved.forEach((data) => {
          toast.warning(`${i} - ${data}`);
        })
      } else {
        toast.warning(data[i]);
      }
    }
  } else {
    console.log(data);
  }
}

export const handleData = async (res, loader, text, toast, reset, msg="Data added successfully") => {
  try {
    loader.style.display = 'none';
    text.style.display = 'inline';
    if (res.status === 201 || res.status === 200) {
      const responseData = await res.json();
      console.log(responseData);
      toast.success(msg);
      reset();
    } else {
      console.log(res.status)
      const resText = await res.text();
      toast.warning("Data saving not successful");
      try {
        let responseData = JSON.parse(resText);
        console.log('Object Data', responseData)
        if (responseData.detail) {
          const detail = responseData.detail;
          if (typeof detail === String) {
            console.log(detail);
            toast.warning(detail);
          } else {
            displayData(detail, toast);
          }
        } else {
          displayData(responseData, toast);
        }
      } catch (error) {
        console.error("Parsing error:", error.message);
        console.log(resText);
      }
    }
  } catch (err) {
    console.error(err);
    toast.error("An Unexpected Error Occurred");
  }
}

export const handleDelete = async (res, toast, msg="Data deleted successfully") => {
  try {
    if (res.status === 204) {
      toast.success(msg);
    } else {
      console.log(res.status)
      const resText = await res.text();
      toast.warning("Delete Unsuccessful");
      try {
        let responseData = JSON.parse(resText);
        console.log('Object Data', responseData)
        if (responseData.detail) {
          const detail = responseData.detail;
          if (typeof detail === String) {
            console.log(detail);
            toast.warning(detail);
          } else {
            displayData(detail, toast);
          }
        } else {
          displayData(responseData, toast);
        }
      } catch (error) {
        console.error("Parsing error:", error.message);
        console.log(resText);
      }
    }
  } catch (err) {
    console.error(err);
    toast.error("An Unexpected Error Occurred");
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
