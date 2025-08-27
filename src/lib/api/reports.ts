import { apiClient, ApiResponse } from "./client";
import { API_ENDPOINTS } from "./config";

// Report content structure
export interface ReportContent {
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
  readings: string[];
  spiritualGuidance: string;
}

// Period structure for detailed report
export interface ReportPeriod {
  year: number;
  month?: number;
  week?: number;
  weekEnd?: string;
  weekStart?: string;
}

// Report structure
export interface Report {
  id: string;
  accessToken: string | null;
  displayType: string | null;
  jobId: string | null;
  reportContent: ReportContent;
  endTime: string;
  generationType: string;
  reportParseResult: string;
  startTime: string;
  userId: string;
  type: "YEARLY" | "MONTHLY" | "WEEKLY";
  period: ReportPeriod | null;
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
  content: Report[];
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
    params: ReportsPaginationParams = {}
  ): Promise<ApiResponse<PaginatedReportsResponse>> {
    const { pageRequest = 0, pageSize = 8 } = params;

    const queryParams = new URLSearchParams({
      pageRequest: pageRequest.toString(),
      pageSize: pageSize.toString(),
    });

    return apiClient.get<PaginatedReportsResponse>(
      `${API_ENDPOINTS.USER.REPORTS_PAGINATION}?${queryParams}`
    );
  },

  async getReportById(id: string): Promise<ApiResponse<Report>> {
    const endpoint = API_ENDPOINTS.USER.REPORT_DETAIL.replace(":id", id);
    return apiClient.get<Report>(endpoint);
  },

  async generateReport(
    type: "YEARLY" | "MONTHLY"
  ): Promise<ApiResponse<Report>> {
    const endpoint = API_ENDPOINTS.USER.REPORT_GENERATE.replace(":type", type);
    return apiClient.post<Report>(endpoint, {});
  },
};
