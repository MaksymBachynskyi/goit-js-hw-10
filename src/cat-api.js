import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_YAiEVTWxDeqDmYEevWU4sFU2AbCLzdUT9RN4EH3P4fHyVFgAM82LCXaXWQy5G03w';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
const getSelectOption = axios.get('/breeds/').then(r => {
  return r.data
    .map(item => {
      return `<option value="${item.id}">${item.name}</option>`;
    })
    .join('');
});
function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?limit=1&breed_ids=${breedId}`).then(item => {
    return item.data;
  });
}
export { getSelectOption, fetchCatByBreed };
