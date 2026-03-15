import React from 'react';
import {Loader2, Sparkles} from "lucide-react";
import {motion} from "framer-motion";

type GenericReportButtonProps = {
    disabled: boolean;
    generateDailyReport: () => void;
    loading: boolean;
}

function GenericReportButton({disabled, generateDailyReport, loading}: GenericReportButtonProps) {
    return <motion.button
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        onClick={generateDailyReport}
        disabled={disabled}
        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-medium hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto shadow-lg"
    >
        {loading ? (
            <>
                <Loader2 className="w-5 h-5 animate-spin"/>
                <div className="text-left">
                    <div className="font-medium">
                        Generating Your Daily Report...
                    </div>
                    <div className="text-xs opacity-90">
                        This may take up to 1 minute
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className="p-2 rounded-lg bg-white/20">
                    <Sparkles className="w-5 h-5"/>
                </div>
                <div className="text-left">
                    <div className="font-medium">
                        Reveal Your Fortune
                    </div>
                    <div className="text-xs opacity-90">
                        Get your comprehensive fortune analysis
                    </div>
                </div>
            </>
        )}
    </motion.button>
}

export default GenericReportButton;