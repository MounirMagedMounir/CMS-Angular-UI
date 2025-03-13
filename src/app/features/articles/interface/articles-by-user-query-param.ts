import { RequestQueryParams } from "../../../core/interface/request-query-params";

export interface ArticlesByUserQueryParam extends RequestQueryParams {
    userId: string;
}
