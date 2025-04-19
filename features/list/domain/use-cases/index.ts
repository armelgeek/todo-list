import { Filter } from "@/shared/lib/types/filter";
import { ListPayload } from "../../config/list.type";
import { listUseCase } from "./list.use-case";

export async function createList(payload: ListPayload) {
    return listUseCase.create(payload);
}

export async function getList(slug: string) {
    return listUseCase.getById(slug);
}

export async function updateList(slug: string, payload: ListPayload) {
    return listUseCase.update(slug, payload);
}

export async function deleteList(slug: string) {
    return listUseCase.delete(slug);
}

export async function getLists(filter: Filter) {
    return listUseCase.list(filter);
}