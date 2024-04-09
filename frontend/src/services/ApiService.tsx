import axios, { AxiosResponse } from "axios";

class ApiService {
	private static baseUrl = process.env.REACT_APP_API_URL;

	protected async get(path: string = "/"): Promise<AxiosResponse> {
		return await axios.get(`${ApiService.baseUrl}${path}`);
	}

	protected async post(path: string = "/", data: any): Promise<AxiosResponse> {
		return await axios.post(`${ApiService.baseUrl}${path}`, data);
	}
}

export default ApiService;