import React, { useState } from "react";

function App() {
  const [servers, setServers] = useState([]);
  const [newServerName, setNewServerName] = useState("");

  const addServer = (e) => {
    e.preventDefault();
    if (newServerName.trim() === "") return;

    const newServer = {
      id: Date.now(),
      name: newServerName,
      tables: 0,
    };

    setServers([...servers, newServer]);
    setNewServerName("");
  };

  const incrementTable = (serverId) => {
    setServers(
      servers.map((server) =>
        server.id === serverId
          ? { ...server, tables: server.tables + 1 }
          : server
      )
    );
  };

  const decrementTable = (serverId) => {
    setServers(
      servers.map((server) =>
        server.id === serverId && server.tables > 0
          ? { ...server, tables: server.tables - 1 }
          : server
      )
    );
  };

  const removeServer = (serverId) => {
    setServers(servers.filter((server) => server.id !== serverId));
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>
          Restaurant Table Tracking System
        </h1>

        <form onSubmit={addServer} className='mb-8 flex justify-center gap-4'>
          <input
            type='text'
            value={newServerName}
            onChange={(e) => setNewServerName(e.target.value)}
            placeholder='Enter server name'
            className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors'>
            Add Server
          </button>
        </form>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {servers.map((server) => (
            <div
              key={server.id}
              className={`relative rounded-lg shadow-md p-6 
                ${server.tables >= 4 ? "bg-red-100" : "bg-white"}
                transition-all duration-300`}>
              <button
                onClick={() => removeServer(server.id)}
                className='absolute top-2 right-2 text-gray-400 hover:text-red-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>

              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                {server.name}
              </h2>
              <p className='text-gray-600 mb-4'>
                Active Tables:
                <span
                  className={`font-bold ml-2 ${
                    server.tables >= 4 ? "text-red-600" : "text-gray-800"
                  }`}>
                  {server.tables}
                </span>
              </p>

              <div className='flex gap-3'>
                <button
                  onClick={() => incrementTable(server.id)}
                  className='flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors'>
                  Add Table
                </button>
                <button
                  onClick={() => decrementTable(server.id)}
                  className='flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors'>
                  Remove Table
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
