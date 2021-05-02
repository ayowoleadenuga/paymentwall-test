import axios from "axios";

const api_key = "107a0f35ab8658b632c32e7243e37685";
const base_url = "https://api.paymentwall.com/api/";
const base_url_for_countries = "https://countriesnow.space/api/v0.1/countries";
const ip_lookup = "https://api.ipify.org/?format=json";
const test_uid = "testapp123"

export const getPaymentMethods = async(country) => {
    // let url = `${base_url_for_countries}/iso`;
    const country_code = 
    await axios.post(`${base_url_for_countries}/iso`, { country: country})
                        // await axios({
                        //     method: 'get',
                        //     url: url + '?nocache=' + new Date().getTime(), // Safari fix
                        //     withCredentials: true
                        // })
                        .then(res => {
                            return res.data
                        })
                        .catch(({data, status})=> {
                            console.log(data)
                        });
  return axios.get(`${base_url}payment-systems/?key=${api_key}&country_code=${country_code && country_code.data ? country_code.data.Iso2 : country}`)
        
}
export const getCountriesWithCurrencies = () => {
    return axios.get(`${base_url_for_countries}/currency`);
}
export const findCurrentLocation = async() => {
    const ip = await axios.get(ip_lookup)
                .then(res => res.data)
                .catch(({data, status})=> {
                    console.log(data)
                });
    return axios.get(`${base_url}rest/country/?key=${api_key}&uid=${test_uid}&user_ip=${ip.ip}`)       
}
export const getIsoCountryCode = country => {
    return axios.post(`${base_url_for_countries}/iso`, { country: country});
}