import { apiClient, ApiResponse } from "./client";
import { API_ENDPOINTS } from "./config";

// Report content structure
export interface ReportContentV2 {
  fortuneScore: string;
  glossary: Array<{
    meaning: string;
    pinyin: string;
    term: string;
  }>;
  keyThemes: string[];
  luckyColors: string[];
  luckyEnhancer: string[];
  luckyGemstones: string[];
  luckyNumbers: string[];
  bornYear: string;
  career: string;
  financial: string;
  general: string;
  health: string;
  relationship: string;
  monthly: FortuneByMonth[];
  spiritualGuidance: string;
  title: string;
  zodiac: string;
}

export interface FortuneByMonth {
  dateEnd: string;
  dateStart: string;
  reading: string;
}

// Report structure
export interface ReportV2 {
  id: string;
  endTime: string;
  forYear: string;
  reportContent: ReportContentV2;
  type: "YEARLY";
  reportVersion: string;
  startTime: string;
  userId: string;
}

// Pagination info
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// Paginated response
export interface PaginatedReportsResponse {
  content: ReportV2[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

// API request parameters
export interface ReportsPaginationParams {
  pageRequest?: number;
  pageSize?: number;
}

export const reportsApi = {
  async getUserReportsPagination(
    params: ReportsPaginationParams = {},
  ): Promise<ApiResponse<PaginatedReportsResponse>> {
    const { pageRequest = 0, pageSize = 8 } = params;

    const queryParams = new URLSearchParams({
      pageRequest: pageRequest.toString(),
      pageSize: pageSize.toString(),
    });

    return apiClient.get<PaginatedReportsResponse>(
      `${API_ENDPOINTS.REPORT_V2.LIST}?${queryParams}`,
    );
  },

  async getReportById(id: string): Promise<ApiResponse<ReportV2>> {
    const endpoint = API_ENDPOINTS.REPORT_V2.DETAIL.replace(":id", id);
    return apiClient.get<ReportV2>(endpoint);
  },

  async generateReport(): Promise<ApiResponse<ReportV2>> {
    const endpoint = API_ENDPOINTS.REPORT_V2.REQUEST;
    return apiClient.post<ReportV2>(endpoint, {});
  },
};
