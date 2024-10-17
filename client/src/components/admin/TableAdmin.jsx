import useUserStore from "@/src/stores/userStore";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TableAdmin = () => {
  const [member, setMember] = useState([]);
  const token = useUserStore((state) => state.token);
  useEffect(() => {
    getData(token);
  }, []);

  const getData = async (token) => {
    try {
      const resp = await axios.get("http://localhost:8080/admin/member", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMember(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlRemoveMember = async (id) => {
    try {
      const resp = await axios.delete(
        `http://localhost:8080/admin/member/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getData(token);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlUpdateMember = async (e, id) => {
    // console.log(e.target.value, id);
    const role = e.target.value;
    console.log({ role });
    try {
      const resp = await axios.patch(
        `http://localhost:8080/admin/member/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            id
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            User
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            role
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {member.map((el) => (
          <tr key={el.id} className="hover:bg-gray-100">
            <th scope="row" className="px-4 py-2">
              {el.id}
            </th>
            <td className="px-4 py-2">{el.email}</td>

            <td className="px-4 py-2">
              {/* {el.role} */}
              <select
                defaultValue={el.role}
                onChange={(e) => hdlUpdateMember(e, el.id)}
                className="rounded-md"
              >
                <option>ADMIN</option>
                <option>USER</option>
              </select>
            </td>

            <td className="px-4 py-2">
              <button
                className="bg-red-400 text-white p-2 rounded-md"
                onClick={() => hdlRemoveMember(el.id)}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableAdmin;
