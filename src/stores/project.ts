import { defineStore } from "pinia";

export interface ProjectGet{
    projectName: String,
    description: String,
}

export interface ProjectPull{
    projectName: String,
    description: String,
    createdAt: Date,
    createdBy: String,
    updatedAt: Date,
    updatedBy: String
}

export interface State{}

export const ProjectStore = defineStore("project", {
    state: (): State => {}
})