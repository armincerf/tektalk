import { createUseQueryParams } from "svelte-query-params";
import { z } from "zod";

export const useQueryParams = createUseQueryParams({
	userId: z.string().optional(),
});
