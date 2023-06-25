{
  /* <h1 className="p-8">
        <Typography variant="h5" className="mb-6">
          User's Giving History
        </Typography>
        <p>
          Total Givings: <span className="text-green-500">Ghc 1000</span>
        </p>
      </h1> */
}

{
  /* <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ giving_type, amount, date_paid }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={giving_type}>
                  
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {giving_type}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date_paid}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card> */
}

  

     
          
        {
          /* <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit User</DialogHeader>
        <DialogBody divider>
          <form onSubmit={editHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">Full Name</span>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={user ? user.fullName : ""}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  className="block w-full mt-1 form-input py-3 border-2 rounded "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email</span>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={user ? user.email : ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full mt-1 form-input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Phone Number</span>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  value={user ? user.phoneNumber : ""}
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Role</span>

                <Select
                  value={user ? user.profileType : ""}
                  onChange={(e) =>
                    setUser({ ...user, profileType: e.target.value })
                  }
                  className="block w-full mt-1 form-select"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Select>
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleOpen}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 ml-4 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog> */
        }

           {
             /* <form onSubmit={editHandler}>
                      <div className="grid grid-cols-1 gap-6 mt-4">
                        <label className="block">
                          <span className="text-gray-700">Full Name</span>
                          <Input
                            type="text"
                            name="fullName"
                            id="fullName"
                            required
                            value={user ? user.fullName : ""}
                            onChange={(e) =>
                              setUser({ ...user, fullName: e.target.value })
                            }
                            className="block w-full mt-1 form-input py-3 border-2 rounded "
                          />
                        </label>
                        <label className="block">
                          <span className="text-gray-700">Email</span>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={user ? user.email : ""}
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                            className="block w-full mt-1 form-input"
                          />
                        </label>

                        <label className="block">
                          <span className="text-gray-700">Phone Number</span>
                          <Input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            required
                            value={user ? user.phoneNumber : ""}
                            onChange={(e) =>
                              setUser({ ...user, phoneNumber: e.target.value })
                            }
                            className="block w-full mt-1 form-input"
                          />
                        </label>
                        <label className="block">
                          <span className="text-gray-700">Role</span>

                          <Select
                            value={user ? user.profileType : ""}
                            onChange={(e) =>
                              setUser({ ...user, profileType: e.target.value })
                            }
                            className="block w-full mt-1 form-select"
                          >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </Select>
                        </label>
                      </div>

                      <div className="flex justify-end mt-6">
                        <button
                          type="button"
                          onClick={handleOpen}
                          className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 ml-4 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form> */
           }
      




