import { z } from "zod";

// import { QuestionTypeSchema } from './QuestionSchema';

const SourceTypeSchema = z.object({
	id: z.number(),
	link: z.string(),
});
// Схема для EditorType
const EditorTypeSchema = z.object({
	name: z.string(),
	id: z.number(),
});

export const TournamentShortTypeSchema = z.object({
	id: z.number(),
	title: z.string().min(1, { message: "Нет названия турнира" }),
	date: z.number(),
	tours: z.number(),
	questionsQuantity: z.number().min(10, { message: "Минимум 10 вопросов" }),
	uploader: z.string(),
	dateUpload: z.number(),
	difficulty: z.number(),
	status: z.enum(["published", "draft", "moderation"]),
	uploaderUuid: z.string().optional(),
	link: z.url(),
});

export const QuestionTypeSchema = z.object({
	id: z.number(),
	type: z.enum(["regular", "double", "triple", "other", "outside"]),
	qNumber: z.number(),
	tourNumber: z.number(),
	add: z.string().optional(),
	text: z.string().min(1, { message: "Нет текста вопроса" }),
	answer: z.string().min(1, { message: "Нет правильного ответа" }),
	alterAnswer: z.string().optional(),
	comment: z.string().optional(),
	source: z.array(SourceTypeSchema),
	author: z.string().min(1, { message: "Нет автора" }),
	tournament: TournamentShortTypeSchema.optional(),
});

export const TournamentTypeSchema = TournamentShortTypeSchema.extend({
	questions: z.array(QuestionTypeSchema).min(10, { message: "Минимум 10 вопросов" }),
	editors: z
		.array(EditorTypeSchema)
		.refine((editors) => editors.every((editor) => editor.name && editor.name.length >= 3), {
			message: "Имя каждого редактора должно содержать минимум 4 символа",
		}),
});

export const TournamentsLastShortSchema = z.object({
	count: z.number(),
	pageCount: z.number(),
	hasMorePage: z.boolean(),
	tournaments: z.array(TournamentShortTypeSchema),
});

export type TournamentShortType = z.infer<typeof TournamentShortTypeSchema>;
export type TournamentType = z.infer<typeof TournamentTypeSchema>;
export type QuestionType = z.infer<typeof QuestionTypeSchema>;
export type TournamentsLastShortType = z.infer<typeof TournamentsLastShortSchema>;
