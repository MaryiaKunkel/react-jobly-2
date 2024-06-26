import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /** Get a list of companies. */

  static async getListOfCompanies(handle) {
    let res = await this.request(`companies`, { handle });
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of jobs. */

  static async getListOfJobs(id) {
    let res = await this.request(`jobs`, { id });
    return res.jobs;
  }

  /** Get details on a job by id. */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get details on a user by username. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** Sign up a new user. */
  static async signUp(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    JoblyApi.token = res.token;
    return JoblyApi.token;
  }

  /** Log in a user. */
  static async logIn(userData) {
    let res = await this.request(`auth/token`, userData, "post");
    JoblyApi.token = res.token;
    return JoblyApi.token;
  }

  /** Apply for job. */
  static async applyForJob(username, id) {
    console.log("username:", username);
    console.log("id:", id);

    let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    console.log("res:", res);
    return res;
  }
}

export default JoblyApi;
