import { Suspense } from "react";
import DepartmentList from "./DepartmentList";

const CreateDataFromApi = () => {
  return (
    <main className="container mx-auto py-10 min-h-dvh">
      <h1 className="text-xl font-bold mb-4">API Data</h1>
      <Suspense fallback={<div className="text-gray-500">Loading data...</div>}>
        <DepartmentList />
      </Suspense>
    </main>
  );
};

export default CreateDataFromApi;
