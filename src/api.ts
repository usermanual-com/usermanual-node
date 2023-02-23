import axios from 'axios';
import { IUsermanualOptions } from './usermanual';
import * as fs from 'fs';

export default class Api {
  options: IUsermanualOptions;
  baseUrl: string;

  constructor(options: IUsermanualOptions, url: string) {
    this.options = options;
    this.baseUrl = url;
  }

  get headers() {
    return {
      'Content-Type': 'application/json',
      'api-key': this.options.apiKey
    }
  }

  public async get<ResponseType, RequestParams = {}>(url: string, params: RequestParams | {} = {}): Promise<ResponseType> {
    return axios.get(`${this.baseUrl}${url}`, {
      params,
      headers: this.headers
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error);
      throw new Error("HTTP error: " + error.response.data.message)
    })
  }

  public async delete<ResponseType, RequestParams = {}>(url: string, _params: RequestParams | {} = {}): Promise<ResponseType> {
    return axios.delete(`${this.baseUrl}${url}`, {
      headers: this.headers
    }).then(response => {
      return response.data
    }).catch(error => {
      throw new Error("HTTP error: " + error.response.data.message)
    })
  }

  public async put<ResponseType, RequestParams = {}>(url: string, params: RequestParams | {} = {}): Promise<ResponseType> {
    return axios.put(`${this.baseUrl}${url}`, params, {
      headers: this.headers
    }).then(response => {
      return response.data
    }).catch(error => {
      throw new Error("HTTP error: " + error.response.data.message)
    })
  }

  public async patch<ResponseType, RequestParams = {}>(url: string, params: RequestParams | {} = {}): Promise<ResponseType> {
    return axios.patch(`${this.baseUrl}${url}`, params, {
      headers: this.headers
    }).then(response => {
      return response.data
    }).catch(error => {
      throw new Error("HTTP error: " + error.response.data.message)
    })
  }

  public async post<ResponseType, RequestParams = {}>(url: string, params: RequestParams | {} = {}): Promise<ResponseType> {
    return axios.post(`${this.baseUrl}${url}`, params, {
      headers: this.headers
    }).then(response => {
      return response.data
    }).catch(error => {
      throw new Error("HTTP error: " + error.response.data.message)
    })
  }

  public async uploadBufferOrPath(preSignedURL:string, bufferOrString: Buffer | string) {
    let buffer: Buffer;
    if(typeof bufferOrString === 'string') {
      buffer = fs.readFileSync(bufferOrString)
    } else {
      buffer = bufferOrString;
    }

    return axios.put(preSignedURL, buffer, {
      headers: {
        'Content-Type': 'application/pdf'
      }
    }).then(response => {
      return response;
    }).catch(_error => {
      throw new Error("Upload error")
    });
  }
}