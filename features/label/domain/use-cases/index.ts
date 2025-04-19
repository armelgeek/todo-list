import { Filter } from "@/shared/lib/types/filter";
import { LabelPayload } from "../../config/label.type";
import { labelUseCase } from "./label.use-case";

export async function createLabel(payload: LabelPayload) {
    return labelUseCase.create(payload);
}

export async function getLabel(slug: string) {
    return labelUseCase.getById(slug);
}

export async function updateLabel(slug: string, payload: LabelPayload) {
    return labelUseCase.update(slug, payload);
}

export async function deleteLabel(slug: string) {
    return labelUseCase.delete(slug);
}

export async function getLabels(filter: Filter) {
    return labelUseCase.list(filter);
}