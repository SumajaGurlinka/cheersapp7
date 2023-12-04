import axios from "axios";

export const login = {
  state: {
    loginData: [],
    downloadallData: [],
    submitData: [],
    saveData: [],
    draftsData: [],
    textData: []
  },
  reducers: {
    setLogin: (state, payload) => {
      return {
        ...state,
        loginData: payload,
      };
    },
    setText: (state, payload) => {
      return {
        ...state,
        textData: payload,
      };
    },
    setSubmit: (state, payload) => {
      return {
        ...state,
        submitData: payload,
      };
    },
    setDrafts: (state, payload) => {
      return {
        ...state,
        draftsData: payload,
      };
    },
    setSave: (state, payload) => {
      return {
        ...state,
        saveData: payload,
      };
    },
    setDownloadAll: (state, payload) => {
      return {
        ...state,
        downloadallData: payload,
      };
    },
  },
  effects: (dispatch) => ({
    getLoginAsync: async (payload1, rootState) => {
      try {
        console.log("login entered");
        let body = payload1;
        console.log("2", payload1);
        const url = "https://dev-auth.senecaglobal.in/get_access_token";

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(url, body, config);
        console.log("2", response);

        const { data = undefined } = response;

        if (data) {
          localStorage.setItem("token", data.data.access_token);

          console.log("authdata", data.data.access_token);

          dispatch.login.setLogin(data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getDownloadAllAsync: async ({ receiverName }) => {
      try {
        const url = `http://localhost:9090/card/zip?receiverName=${receiverName}`;
        window.open(url,"_blank");
      } catch (error) {
        console.error("Api > Error > Login > ", error.response);
        throw error;
      }
    },
    getSubmitAsync: async (payload1) => {
      try {
        console.log("1");

        let body = payload1;
        const url =

          `http://localhost:9090/card`;
        // ?senderName=${senderName}&receiverName=${receiverName}&category=${category}&cardMessage=${cardMessage}&cardImage=${cardImage}`;
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log("cardimage", body);
        const response = await axios.post(url, body, config);
        console.log("response: ", response);
        const { data = undefined } = response;

        if (data) {
          dispatch.login.setSubmit(data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },

    getSaveAsync: async (payload1) => {
      try {
        const { cardId, ...bodyData } = payload1; // Destructuring cardId and separating it from the body data
        console.log("body", bodyData);
        const url = `http://localhost:9090/card/savecard?cardId=${cardId}`; // Constructing URL with cardId as a parameter
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.put(url, bodyData, config); // Sending bodyData as the request body

        const { data = undefined } = response;

        if (data) {
          dispatch.login.setSave(data);
        }
      } catch (error) {
        console.log("Api > Error >save >  ", error.response);
        throw error;
      }
    },

    getDraftsAsync: async ({ senderName, searchText, pageNumber, pageSize, sortDirection, sortBy }) => {
      try {
        console.log("searchText");
        const url = `http://localhost:9090/card/draftcards?senderName=${senderName}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortBy=${sortBy}`;
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);
        console.log("dss");
        const { data = undefined } = response;

        if (data) {
          console.log("drafts", data);
          dispatch.login.setDrafts(data);
        }
      } catch (error) {
        console.log("Api > Error >drafts >  ", error.response);
        throw error;
      }
    },
    getTextAsync: async ({ text }) => {
      try {
        console.log("searchText");
        const url =

          ` http://localhost:9090/card?text=${text}`;

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);
        console.log("dss");
        const { data = undefined } = response;

        if (data) {
          console.log("data", data);
          dispatch.login.setText(data);
        }
      } catch (error) {
        console.log("Api > Error >text >  ", error.response);
        throw error;
      }
    },
  }),

};
