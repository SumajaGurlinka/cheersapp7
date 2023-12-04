import axios from "axios";

export const receivedcards = {
  state: {
    receivedcardsData: [],
    receivedcardIdData: [],
    receivedDownloadcardIdData: [],

    receivedAppreciationData: [],
    receivedThankingData: [],
    receivedCountData: []
  },
  reducers: {
    setReceivedcards: (state, payload) => {
      return {
        ...state,
        receivedcardsData: payload,
      };
    },
    setreceivedAppreciation: (state, payload) => {
      return {
        ...state,
        receivedAppreciationData: payload,
      };
    },
    setreceivedCount: (state, payload) => {
      return {
        ...state,
        receivedCountData: payload,
      };
    },
    setreceivedThanking: (state, payload) => {
      return {
        ...state,
        receivedThankingData: payload,
      };
    },
    setReceivedcardId: (state, payload) => {
      return {
        ...state,
        receivedcardIdData: payload,
      };
    },

    setReceivedDownloadcardId: (state, payload) => {
      return {
        ...state,
        receivedDownloadcardIdData: payload,
      };
    },

  },
  effects: (dispatch) => ({


    getReceivedCardsAsync: async ({ receiverName, searchText, pageNumber, pageSize, sortDirection, sortBy }) => {
      try {

        const url = ` http://localhost:9090/card?receiverName=${receiverName}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortBy=${sortBy}`;

        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.receivedcards.setReceivedcards(data);
          console.log("received", data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getReceivedAppreciationAsync: async ({ receiverName, category, searchText, pageNumber, pageSize, sortDirection, sortBy }) => {
      try {
        const url = ` http://localhost:9090/card/category/received?receiverName=${receiverName}&searchText=${searchText}&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortValue=${sortBy}`;

        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.receivedcards.setreceivedAppreciation(data);
          console.log("appreciationreceived", data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getReceivedThankingAsync: async ({ receiverName, category, searchText, pageNumber, pageSize, sortDirection, sortBy }) => {
      try {

        const url = ` http://localhost:9090/card/category/received?receiverName=${receiverName}&searchText=${searchText}&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortValue=${sortBy}`;

        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.receivedcards.setreceivedThanking(data);
          console.log("thankingreceived", data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getReceivedCardIdAsync: async ({ cardId }) => {
      try {

        const url = `http://localhost:9090/card/id?cardid=${cardId}`;

        console.log(url);
        const config = {
          headers: {
            "Content-Type": "blob",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.receivedcards.setReceivedcardId(data);

          console.log("receivedId data", data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },

    getReceivedDownloadCardIdAsync: async ({ cardId }) => {
      try {
        const url = `http://localhost:9090/card/download?cardid=${cardId}`;
        console.log(url);
        window.open(url, "_blank");
       
      } catch (error) {
        console.log("Api > Error > Login > ", error.response);
        throw error;
      }
    },

    getReceivedCardCountAsync: async ({ receiverName }) => {
      try {
        const url = `http://localhost:9090/card/count?receiverName=${receiverName}`;

        console.log(url);
        const config = {
          headers: {
            "Content-Type": "blob",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.receivedcards.setreceivedCount(data);

          console.log("receivedId countdata", data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },

  }),

};
