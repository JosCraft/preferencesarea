import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function getRadioTvType(): string | null {
    const RADIO_TV_TYPE = sessionStorage.getItem("radio_tv_type");
    if (RADIO_TV_TYPE == null) {
        sessionStorage.setItem("radio_tv_type", "tv");
        return "tv";
    }
    return sessionStorage.getItem("radio_tv_type");
}

async function fetchAPI(endpoint : any, { method = 'GET', body = null, params = {} } = {}) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer token`
    };

    const RADIO_TV_TYPE = getRadioTvType()
    try {
        const options = {
            method: method,
            headers: headers,
            url: `${BASE_URL}/${endpoint}`,
            data: body ? body : undefined,
            params: params
        };
        
        let response = await axios(options);
        return response.data;
    } catch (error) {
        console.error("Error en la llamada a la API:", error);
        throw error;
    }
}

async function postFile(endpoint, { method = 'GET', body = null, params = {} } = {}) {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer token`,
        "Content-Type": "multipart/form-data",
    };

    const RADIO_TV_TYPE = getRadioTvType()

    try {
        const options = {
            method: method,
            headers: headers,
            url: `${BASE_URL}/${RADIO_TV_TYPE}/${endpoint}`,
            data: body ? body : undefined,
            params: params
        };
        
        let response = await axios(options);
        return response.data;
    } catch (error) {
        console.error("Error en la llamada a la API:", error);
        throw error;
    }
}

export const apiService = {
    create: (endpoint, body) => fetchAPI(endpoint, { method: 'POST', body: body }),
    update: (endpoint, id, body) => fetchAPI(`${endpoint}/${id}`, { method: 'PUT', body: body }),
    get: (endpoint) => fetchAPI(`${endpoint}`, { method: 'GET' }),
    delete: (endpoint) => fetchAPI(`${endpoint}`, { method: 'DELETE' }),
    postFile: (endpoint, formData) => postFile(`${endpoint}`, { method: 'POST', body: formData }),
};
