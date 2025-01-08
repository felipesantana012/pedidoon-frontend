export const BASE_URL = "http://localhost:3000";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchData = async (endpoint, method = "GET", data = null) => {
  try {
    const options = {
      method,
      headers: getHeaders(),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}/api/${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Previne falhas no JSON
      const errorMessage =
        errorData.error || response.statusText || "Erro desconhecido";
      throw { status: response.status, message: errorMessage, data: errorData };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiService = {
  get: (endpoint) => fetchData(endpoint, "GET"),
  post: (endpoint, data) => fetchData(endpoint, "POST", data),
  put: (endpoint, data) => fetchData(endpoint, "PUT", data),
  delete: (endpoint) => fetchData(endpoint, "DELETE"),
};
