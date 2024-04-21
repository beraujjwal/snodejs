const users = [];

const addUser = ({ id, user, room }) => {
  const existingUser = users.find(
    (user) => user.id === id && room.includes(user.room)
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }
  const socketUser = { id, user, room };

  users.push(socketUser);
  return { socketUser };
};

const removeUser = (id) => {
  const usersList = users.filter((user) => user.id === id);
  const removedUsers = [];
  usersList.forEach((eachUser) => {
    const index = users.findIndex((user) => user.id === eachUser.id);

    if (index !== -1) {
      const removedUser = users.splice(index, 1)[0];
      if (removedUser) removedUsers.push(removedUser);
    }
  });
  return removedUsers;
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
