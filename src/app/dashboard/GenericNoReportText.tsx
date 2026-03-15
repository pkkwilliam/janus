import React from 'react'
import {Calendar} from "lucide-react";

type GenericNoReportTextProps = {
    reportFilter: "ALL" | "YEARLY" | "MONTHLY" | "WEEKLY";
    reportLength: number;
}

function GenericNoReportText({reportFilter, reportLength}: GenericNoReportTextProps) {
    return <div>
        <div className="p-4 rounded-2xl bg-gray-100 w-fit mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400"/>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Reports Found
        </h3>
        <p className="text-gray-600 mb-6">
            {reportFilter === "ALL"
                ? reportLength === 0
                    ? "You don't have any reports yet. Generate your first reading!"
                    : "No reports match your filter."
                : `No ${reportFilter.toLowerCase()} reports found. Try a different filter.`}
        </p></div>
}

export default GenericNoReportText;