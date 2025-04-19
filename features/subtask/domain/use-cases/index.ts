import { Filter } from "@/shared/lib/types/filter";
import { SubtaskPayload } from "../../config/subtask.type";
import { subtaskUseCase } from "./subtask.use-case";

export async function createSubtask(payload: SubtaskPayload) {
    return subtaskUseCase.create(payload);
}

export async function getSubtask(slug: string) {
    return subtaskUseCase.getById(slug);
}

export async function updateSubtask(slug: string, payload: SubtaskPayload) {
    return subtaskUseCase.update(slug, payload);
}

export async function deleteSubtask(slug: string) {
    return subtaskUseCase.delete(slug);
}

export async function getSubtasks(filter: Filter) {
    return subtaskUseCase.list(filter);
}