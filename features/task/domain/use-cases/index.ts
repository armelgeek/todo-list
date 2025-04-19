import { Filter } from "@/shared/lib/types/filter";
import { TaskPayload } from "../../config/task.type";
import { taskUseCase } from "./task.use-case";

export async function createTask(payload: TaskPayload) {
    return taskUseCase.create(payload);
}

export async function getTask(slug: string) {
    return taskUseCase.getById(slug);
}

export async function updateTask(slug: string, payload: TaskPayload) {
    return taskUseCase.update(slug, payload);
}

export async function deleteTask(slug: string) {
    return taskUseCase.delete(slug);
}

export async function getTasks(filter: Filter) {
    return taskUseCase.list(filter);
}