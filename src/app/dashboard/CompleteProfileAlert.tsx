import React from 'react';
import {motion} from "framer-motion";
import {User} from "lucide-react";

type CompleteProfileAlertProps = {
    setShowBirthInfoForm: (show: boolean) => void;
}

function CompleteProfileAlert({setShowBirthInfoForm}: CompleteProfileAlertProps) {
    return <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-orange-600 bg-orange-50 px-4 py-3 rounded-lg">
        <p className="flex-1">
            Please complete your profile first to generate
            accurate reports
        </p>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBirthInfoForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all text-xs flex items-center gap-2 whitespace-nowrap"
        >
            <User className="w-4 h-4" />
            Complete Profile
        </motion.button>
    </div>
}

export default CompleteProfileAlert;