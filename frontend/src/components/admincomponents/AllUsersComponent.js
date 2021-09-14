import axios from "axios";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";

function Users() {
  const [users, setUsers] = useState([]);

  async function getWorks() {
    const usersRes = await axios.get("/auth/allusers");

    setUsers(usersRes.data);
  }
  
  useEffect(() => {
    getWorks();
  }, []);

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}

export default Users;