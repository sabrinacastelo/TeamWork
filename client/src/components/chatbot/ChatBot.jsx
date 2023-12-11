import api from "../../service/api";

async function getChatBotData() {
    try {
        const response = await api.get('/FjfCIc54i7oxaFyWWVvZrTiHj/R9STDdPURe1mxHdI=');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

getChatBotData();