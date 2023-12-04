import axios from "axios";

export const card = {
  state: {
    cardData: [],
  
  },
  reducers: {
    setCard: (state, payload) => {
      return {
        ...state,
        cardData: payload,
      };
    },
   
  },
  effects: (dispatch) => ({
  
  
    getCardAsync: async ({cardId}) => {
      try {
     
        const url =`http://localhost:9090/card/id?cardid=${cardId}`;
          console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;
        console.log("cardres",response);
        if (data) {
          dispatch.card.setCard(data);
          console.log("card",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
   
  
  }),
  
};