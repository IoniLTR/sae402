const API = "http://rsantacruz.fr/backForum/api/users";

export const checkUser = async (name, password) => {
  const res = await fetch(`${API}/checkUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });
  return res.json(); // boolean
};

export const checkName = async (name) => {
  const res = await fetch(`${API}/checkName`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json(); // boolean
};

export const addUser = async (name, password, role = "user") => {
  const res = await fetch(`${API}/addUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password, role }),
  });
  return res.json();
};
