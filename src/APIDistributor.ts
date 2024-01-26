import axios from "axios";
import type { Question } from "@/types";

export default class APIDistributor {
  static default= new APIDistributor();

  async updateQuestion(data: Question) {
    return axios.post("/question", data);  // change to put
  }

  async getQuestions() {
    return axios.get<Question[]>("/questions");
  }

  async removeQuestion(id: number) {
    return axios.delete(`/question/${id}`);
  }
}

