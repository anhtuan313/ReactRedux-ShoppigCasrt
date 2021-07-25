let initialState = {
  userList: [
    {
      id: 1,
      fullname: "Pham Duc Anh Tuan",
      username: "Tuan",
      email: "Tuan313@gmail.com",
      phoneNumber: "123456789",
      type: "VIP",
    },
    {
      id: 2,
      fullname: "Pham Duc Anh Tu",
      username: "Tu",
      email: "Tu313@gmail.com",
      phoneNumber: "123456789",
      type: "USER",
    },
  ],
  keyword: "",
  userEdit: null,
};

const userReducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case "DELETE": {
      let userList = [...state.userList];
      const index = userList.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        userList.splice(index, 1);
      }
      state.userList = userList;

      return { ...state };
    }
    case "GET_KEYWORD": {
      state.keyword = action.payload;

      return { ...state };
    }

    case "EDIT": {
      state.userEdit = action.payload;
      return { ...state };
    }

    case "SUBMIT": {
      let userList = [...state.userList];
      if (action.payload.if) {
        const index = userList.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index != -1) {
          userList[index] = action.payload;
        }
      } else {
        const userClone = { ...action.payload,id: new Date().getTime() };
        userList = [...state.userList,userClone];
      };
      
      state.userList = userList;

      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default userReducer;
