import http from "../http-common";

class FundraiserDataService {
  getAll() {
    return http.get("/fundraisers");
  }

  get(id) {
    return http.get(`/fundraisers/${id}`);
  }

  create(data) {
    return http.post("/fundraisers", data);
  }

  update(id, data) {
    return http.put(`/fundraisers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/fundraisers/${id}`);
  }

  deleteAll() {
    return http.delete(`/fundraisers`);
  }

  findByLabel(label) {
    return http.get(`/fundraisers?label=${label}`);
  }
}

export default new FundraiserDataService();