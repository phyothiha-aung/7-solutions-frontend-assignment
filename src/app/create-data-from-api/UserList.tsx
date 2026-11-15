import { UsersApiResponse } from "@/interface/user-interfaces";

const UserList = async () => {
  const response = await fetch("https://dummyjson.com/users");

  if (!response.ok) return <div>Error: fetching data</div>;

  const data: UsersApiResponse = await response.json();

  if (!data.users) return <div>Error: fetching data</div>;

  return (
    <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
      {JSON.stringify(data.users, null, 2)}
    </pre>
  );
};

export default UserList;
